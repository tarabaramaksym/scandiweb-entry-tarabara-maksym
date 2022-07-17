import { Component } from "react";
import { withRouter } from "../../navigation/withRouter";
import { connect } from "react-redux"
import { fetchProduct } from "../../services/products-service";

import './Product.css';
import { addToShoppingCart } from "../../redux/actions";
import ProductAttributes from "./ProductAttributes/ProductAttributes";

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: null,
      selectedImage: 0,
      selectedAttributes: []
    }

    this.attributeClickHandler = this.attributeClickHandler.bind(this);
  }

  async componentDidMount() {
    if (this.state.product == null) {
      const result = await fetchProduct(this.props.params.product);
      this.setState({ ...this.state, product: result, selectedAttributes: result.attributes.map(() => (0)) });
    }
  }

  attributeClickHandler(attributeIndex, attributeValueIndex) {
    const selectedAttributes = this.state.selectedAttributes;
    selectedAttributes[attributeIndex] = attributeValueIndex;
    this.setState({ ...this.state, selectedAttributes });
  }

  renderCarousel() {
    return (
      <div className="carousel-images custom-scrollbar">
        {this.state.product.gallery.map((img, index) => {
          if (index != this.state.selectedImage) {
            return <img key={index} onClick={() => { this.setState({ ...this.state, selectedImage: index }) }} src={img} alt={`${this.state.product.name} image #${index + 1}`}></img>
          }
        })}
      </div>
    )
  }

  render() {

    if (this.state.product) {
      const product = this.state.product;
      const currencySymbol = product.prices[this.props.selectedCurrency].currency.symbol;
      const price = product.prices[this.props.selectedCurrency].amount;
      return (
        <div className="product-container">
          {this.renderCarousel()}

          <img className="product-image" src={product.gallery[this.state.selectedImage]}></img>

          <div className="product-info">
            <h5 className="product-brand">{product.brand}</h5>
            <h5 className="product-name">{product.name}</h5>

            <ProductAttributes product={product} selectedAttributes={this.state.selectedAttributes} attributeClickHandler={this.attributeClickHandler} />

            <div className="product-price-container">
              <h6 className="product-label uppercase-title">Price:</h6>
              <p className="product-price">{currencySymbol}{price}</p>
            </div>
            <button onClick={() => { this.props.addToShoppingCart({ ...product, selectedAttributes: [...this.state.selectedAttributes] }) }} className="btn-primary ">Add to cart</button>
            <p className="product-description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
          </div>
        </div>
      )
    }

    return null;
  }

}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.selectedCurrency
  };
}

const mapDispatchToProps = {
  addToShoppingCart: addToShoppingCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));