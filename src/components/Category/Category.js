import { client, Query } from "@tilework/opus";
import { Component } from "react";
import { fetchProducts } from "../../services/products-service";

import './Category.css'
import ProductCard from "./ProductCard/ProductCard";

class Category extends Component {


  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      products: []
    };
  }

  async componentDidMount() {
    // fetches products initially
    await this.fetchProducts();
  }

  async componentDidUpdate(nextProps) {
    // fetches products in case of a category change
    if (nextProps.categoryName !== this.props.categoryName) {
      await this.fetchProducts();
    }
  }

  async fetchProducts() {
    const products = await fetchProducts(this.props.categoryName);
    this.setState({ ...this.state, products, currentCategory: this.props.categoryName });
  }

  renderProductCards() {
    return this.state.products.map(p => {
      return <ProductCard key={p.id} product={p} />
    });
  }

  render() {

    return (
      <div>
        <h1 className="category-name">{this.props.categoryName}</h1>
        <div className="products">
          {this.renderProductCards()}
        </div>
      </div>
    );
  }

}

export default Category