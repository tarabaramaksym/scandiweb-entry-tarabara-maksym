import { Component } from "react";
import Header from "./Header/Header";
import { connect } from 'react-redux'

import './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div>

        {this.props.isShoppingCartOpen ? <div className="grayed" /> : null}
        <Header routes={this.props.routes} />

        <div className="page-container">
          <div className={`container `}>
            {this.props.children}
          </div>
        </div>

      </div>

    )
  }

}

const mapStateToProps = state => ({
  isShoppingCartOpen: state.isShoppingCartOpen
})

export default connect(mapStateToProps)(Layout);