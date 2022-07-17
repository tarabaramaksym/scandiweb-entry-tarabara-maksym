import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import routes from "./navigation/routes";

import './App.css';

class App extends Component {

  // routes are generated from the ./navigation/routes.js file
  render() {
    return (
      <Layout>
        <Routes>
          {routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} element={Component} />
          ))}
        </Routes>
      </Layout>
    );
  }

}

export default App;