import { Component } from "react";
import { Link, matchPath } from 'react-router-dom';
import { withRouter } from "../../../../navigation/withRouter";

import './Navigation.css';

class Navigation extends Component {

  // renders navbar using routes receieved from the navigation/routes.js file
  // uses matchPath and useLocation hook (which it receieves from being wrapped by withRouter) to highlight the active button
  render() {
    return (
      <nav>
        <ul>
          {
            this.props.routes.map((route, index) => {
              const match = matchPath(this.props.location.pathname, route.path);
              return route.render ?
                <li key={index}>
                  <Link to={route.path} className={match ? 'selected' : ''}>{route.name}</Link>
                  {match ? <div className="selected-border"></div> : null}
                </li>
                : null
            })
          }
        </ul>
      </nav>
    )
  }

}

export default withRouter(Navigation);