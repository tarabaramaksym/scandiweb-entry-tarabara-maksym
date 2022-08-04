import { Component } from "react";
import ProductAttributes from "../../Product/ProductAttributes/ProductAttributes";
import { connect } from 'react-redux';

import './ShoppingCartProduct.css';
import plusSign from '../../../icons/plus-square.svg'
import minusSign from '../../../icons/minus-square.svg'
import { decrementCount, incrementCount, setSelectedAttribute } from "../../../redux/actions";
import ImageSlider from "../../Helpers/ImageSlider/ImageSlider";

class ShoppingCartProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedImage: 0
    }

    this.attributeClickHandler = this.attributeClickHandler.bind(this);
  }

  attributeClickHandler(attributeIndex, attributeValueIndex) {
    const selectedAttributes = this.state.selectedAttributes;
    selectedAttributes[attributeIndex] = attributeValueIndex;
    this.setState({ ...this.state, selectedAttributes });
  }

  render() {

    const product = this.props.product;
    const currencySymbol = product.prices[this.props.selectedCurrency].currency.symbol;
    const price = product.prices[this.props.selectedCurrency].amount;

    return (

      <div className="product-container shopping-cart-product">

        <div className="product-info">
          <h5 className="product-brand">{product.brand}</h5>
          <h5 className="product-name">{product.name}</h5>
          <div className="product-price-container">
            <h6 className="product-label uppercase-title">Price:</h6>
            <p className="product-price">{currencySymbol}{price}</p>
          </div>
          <ProductAttributes static={true} product={product} selectedAttributes={product.selectedAttributes}
            attributeClickHandler={(attributeIndex, attributeValueIndex) => { this.props.setSelectedAttribute(this.props.index, attributeIndex, attributeValueIndex) }} />

        </div>

        <div className="count-buttons">
          <button className="btn-count" onClick={() => { this.props.incrementCount(this.props.index) }}><img src={plusSign} alt='Plus sign'></img></button>
          <p>{product.count}</p>
          <button className="btn-count" onClick={() => { this.props.decrementCount(this.props.index) }}><img src={minusSign} alt='Minus sign'></img></button>
        </div>
        <div className="image-container">
          <ImageSlider className="product-image" alt={product.name} images={this.props.mini ? [product.gallery[0]] : product.gallery} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    selectedCurrency: state.selectedCurrency
  }
}

const mapDispatchToProps = {
  incrementCount: incrementCount,
  decrementCount: decrementCount,
  setSelectedAttribute: setSelectedAttribute
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartProduct);