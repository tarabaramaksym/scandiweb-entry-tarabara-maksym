import { Component } from "react";


// Simple modal, receives button through props and modal window content through chilren
class Modal extends Component {

  handleClick = () => {
    if (!this.props.show) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.props.toggle();
  };

  handleOutsideClick = e => {

    // entire e.target.parentElement... thing is a bad fix, but I wasn't able to come up with a proper solution
    //  
    // when we lower the count in the mini cart to 0 it deletes that element and shopping cart is getting re-rendered
    // after that we get here and because the element is deleted the node doesn't contains it, so it closes the shopping cart
    // but we don't want it to do that, and this "solution" fixes it

    let parent = e.target.parentElement.parentElement.parentElement;
    if (!parent) {
      parent = e.target.parentElement.parentElement;
    }
    if (!this.node.contains(e.target) && this.props.show
      && parent.className.indexOf("shopping-cart-product") === -1
      && parent.className.indexOf("product-attribute") === -1) {
      this.handleClick();
    }
  };

  render() {
    return (<div ref={node => {
      this.node = node;
    }}>
      <button className="btn-icon" onClick={this.handleClick}>
        {this.props.button}
      </button>

      {this.props.show ? this.props.children : null}
    </div>
    )
  }

}

export default Modal;