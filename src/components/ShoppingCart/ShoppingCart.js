import { Component } from "react";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ShoppingCartProduct from "./ShoppingCartProduct/ShoppingCartProduct";
import { withRouter } from "../../navigation/withRouter";
import { toggleShoppingCartModal } from "../../redux/actions";

import './ShoppingCart.css';

class ShoppingCart extends Component {

  // Shopping cart and shopping cart is used for both the small modal window and the full page
  // it recieves {mini} property, and generates page based on it, mainly through the use of CSS but also some small react code
  constructor(props) {
    super(props);
    this.viewBagClickHandler = this.viewBagClickHandler.bind(this);
  }

  viewBagClickHandler() {
    this.props.toggleShoppingCartModal();
    this.props.navigate('/cart');
  }

  renderProducts() {
    return this.props.shoppingCart.map((product, index) => (<ShoppingCartProduct key={index} mini={this.props.mini} index={index} product={product} />));
  }

  render() {
    if (!this.props.shoppingCart || (this.props.shoppingCart.length === 0 && this.props.mini)) {
      return null;
    }
    if (this.props.shoppingCart.length === 0) {
      // if bag is empty readdress user back to the main page
      return <Navigate to='/' />
    }

    let totalCost = 0, quantity = 0;
    const symbol = this.props.shoppingCart[0].prices[this.props.selectedCurrency].currency.symbol;
    this.props.shoppingCart.map(p => {
      totalCost += p.prices[this.props.selectedCurrency].amount * p.count;
      quantity += p.count;
    })

    return <div className={this.props.mini ? 'mini-shopping-cart' : 'shopping-cart'}>

      {this.props.mini ?
        <p className="cart-title"><b>My Bag. </b>{quantity} item{quantity > 1 ? 's' : ''}</p>
        :
        <h1 className="cart-title">Cart</h1>
      }

      <div className="shopping-cart-products custom-scrollbar">
        {this.renderProducts()}
      </div>

      <table className="total-table ">
        <tbody>
          <tr>
            <td>Tax 21%: </td>
            <td>{symbol}{(totalCost * 0.21).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Quantity: </td>
            <td>{quantity}</td>
          </tr>
          <tr>
            <td>Total: </td>
            <td>{symbol}{totalCost.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="shopping-cart-buttons">
        {this.props.mini ? <button className="btn-secondary" to="/cart" onClick={this.viewBagClickHandler}>View Bag</button> : null}
        <button className="btn-primary" style={this.props.mini ? { width: '50%' } : null}>Checkout</button>
      </div>


      <div className="bottom-space"></div>

    </div >
  }

}

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    selectedCurrency: state.selectedCurrency
  }
}

const mapDispatchToProps = {
  toggleShoppingCartModal: toggleShoppingCartModal
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShoppingCart));