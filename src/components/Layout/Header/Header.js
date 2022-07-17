import { Component } from "react";
import Actions from "./Actions/Actions";
import Navigation from "./Navigation/Navigation";

import './Header.css'
import brandIcon from '../../../icons/brand-icon.svg';


class Header extends Component {

  render() {

    return (
      <header>
        <div className="page-container">
          <Navigation />
          <img src={brandIcon} alt="Brand icon" className="brand-icon"></img>
          <Actions node={this.props.node} />
        </div>

      </header>
    )
  }

}


export default Header;