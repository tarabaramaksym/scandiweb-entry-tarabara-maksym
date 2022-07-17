import { Component } from "react";
import { connect } from 'react-redux';

import Modal from "../../../../Helpers/Modal/Modal";
import ShoppingCart from "../../../../ShoppingCart/ShoppingCart";
import { toggleShoppingCartModal } from "../../../../../redux/actions";

import cartIcon from '../../../../../icons/empty-cart-icon-black.svg';

class ShoppingCartModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showShoppingCartModal: null
    };

    this.toggleShoppingCartModal = this.toggleShoppingCartModal.bind(this);
  }

  toggleShoppingCartModal() {
    if (this.props.shoppingCart.length > 0) {
      this.props.toggleShoppingCartStore();
    }
  }

  render() {

    let quantity = 0;
    this.props.shoppingCart.forEach(element => {
      quantity += element.count;
    });

    const shoppingModalBtn = (
      <div>
        {quantity > 0 ? <p className="quantity">{quantity}</p> : null}
        <img className="shopping-cart-icon" src={cartIcon} alt="Empty cart icon"></img>
      </div>
    );

    return (
      <div>
        <Modal button={shoppingModalBtn} show={this.props.isShoppingCartOpen} toggle={this.toggleShoppingCartModal}>
          <ShoppingCart mini={true} />
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart,
    isShoppingCartOpen: state.isShoppingCartOpen
  };
}

const mapDispatchToProps = {
  toggleShoppingCartStore: toggleShoppingCartModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartModal); 