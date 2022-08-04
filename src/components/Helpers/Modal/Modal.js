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
    let parent = e.target.parentElement
    if (!this.node.contains(e.target) && this.props.show
      && (parent.parentElement && parent.className.indexOf("btn-count") === -1)) {
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