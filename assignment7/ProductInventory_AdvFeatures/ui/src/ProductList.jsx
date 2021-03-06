import React from 'react';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.loadCount();
    const query = `query{
                productList {
                    id category name price image
                }
            }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const query = `mutation addProduct($product: ProductInputs!){
                addProduct(product: $product){
                    id
                }
            }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    if (response) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        this.loadCount();
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  async loadCount() {
    const query = `query {
      productCounts
    }`;
    const result = await graphQLFetch(query);
    if (result) {
      this.setState({ count: result.productCounts });
    }
  }

  render() {
    const { products } = this.state;
    const { count } = this.state;
    return (
      <React.Fragment>
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <br />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
