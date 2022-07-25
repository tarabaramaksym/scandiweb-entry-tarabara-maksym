import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import getRoutes from "./navigation/routes";
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: []
    }
  }

  async componentDidMount() {
    const routes = await getRoutes();
    this.setState({ ...this.state, routes });
  }

  // routes are generated from the ./navigation/routes.js file
  render() {

    if (this.state.routes.length === 0) {
      return null;
    }
    return (
      <Layout routes={this.state.routes}>
        <Routes>
          {this.state.routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} element={Component} />
          ))}
        </Routes>
      </Layout>
    );
  }

}

export default App;