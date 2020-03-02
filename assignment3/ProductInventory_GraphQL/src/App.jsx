// const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

// function jsonDateReviver(key, value) {
//   if (dateRegex.test(value)) return new Date(value);
//   return value;
// }

class ProductFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the product filter.</div>
    );
  }
}

function ProductRow(props) {
  const product = props.product;
  return (
    <tr>
      <td>{product.product}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.image}</td>
    </tr>
  );
}

function ProductTable(props) {
  const productRows = props.products.map(product =>
    <ProductRow key={product.id} product={product} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      product: form.product.value, price: form.price.value,
      category: form.category.value, image: form.image.value,
    }
    this.props.createProduct(product);
    form.product.value = ""; price.title.value = "";
    form.category.value = ""; form.image.value = "";
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
      <label>Category</label><br  />
          <select id="category" name="category">
              <option selected value="shirts">Shirts</option>
              <option value="jeans">Jeans</option>
              <option value="jackets">Jackets</option>
              <option value="sweaters">Sweaters</option>
              <option value="accesories">Accesories</option>
          </select><br  /> 
          <label>Price per unit</label><br  />
          <input type="number" name="price" placeholder=""  /><br  />
          <label>Product Name</label><br  />
          <input type="text" name="productName" placeholder="Enter product name" /><br  />
          <label>Image URL</label><br  />
          <input type="text" name="imageURL" placeholder="Enter url" /><br  />
          <button>Add Product</button>
      </form>
    );
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList {
        product price category image
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        product
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: { product } })
    });
    this.loadData();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Product Inventory</h1>
        <ProductFilter />
        <hr />
        <ProductTable issues={this.state.products} />
        <hr />
        <ProductAdd createIssue={this.createProduct} />
      </React.Fragment>
    );
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));