import { Component } from "react";

import CurrencyModal from "./CurrenciesModal/CurrencyModal";
import ShoppingCartModal from "./ShoppingCartModal/ShoppingCartModal";

import './Actions.css';

class Actions extends Component {


  render() {
    return (
      <div className="actions">
        <CurrencyModal />
        <ShoppingCartModal />
      </div>
    );
  }

}


export default Actions;