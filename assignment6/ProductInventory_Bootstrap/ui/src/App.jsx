import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

// import ProductList from './ProductList.jsx';
import Page from './Page.jsx';

// const element = <ProductList />;
const element = (
  <Router>
    <Page />
  </Router>
);
ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
