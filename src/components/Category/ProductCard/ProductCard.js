import { Component } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";

import { withRouter } from "../../../navigation/withRouter";
import { addToShoppingCart } from "../../../redux/actions";

import './ProductCard.css';
import cartIcon from '../../../icons/empty-cart-icon-white.svg';

class ProductCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showCart: false
    };

    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.shoppingCartClickHandler = this.shoppingCartClickHandler.bind(this);
  }


  mouseEnterHandler() {
    if (this.props.product.inStock) {
      this.setState({ ...this.state, showCart: true });
    }
  }

  mouseLeaveHandler() {
    if (this.props.product.inStock) {
      this.setState({ ...this.state, showCart: false });
    }
  }

  clickHandler() {
    if (this.props.product.inStock) {
      this.props.navigate(this.props.product.id);
    }
  }

  shoppingCartClickHandler(event) {
    event.preventDefault();
    this.props.addToShoppingCart({ ...this.props.product, selectedAttributes: this.props.product.attributes.map(a => (0)) })
  }

  render() {

    // variables to increase readabiliy 
    const product = this.props.product;
    const currencySymbol = product.prices[this.props.selectedCurrency].currency.symbol;
    const price = product.prices[this.props.selectedCurrency].amount;

    return (
      <Link className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`} onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} to={product.id}>
        <div className="image-container">
          {!product.inStock ? <h4 className="out-of-stock-image-label">OUT OF STOCK</h4> : null}
          <img className="product-image" src={product.gallery[0]} alt={product.name} />
        </div>
        {
          this.state.showCart ?
            <div className="shopping-cart-container">
              <button onClick={this.shoppingCartClickHandler} className="btn-icon"><img src={cartIcon}></img></button>
            </div>
            : null
        }

        <h5 className="product-name">{product.brand} {product.name}</h5>
        <p className="product-price">{currencySymbol} {price}</p>
      </Link>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.selectedCurrency
  };
}

const mapDispatchToProps = {
  addToShoppingCart: addToShoppingCart
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCard));