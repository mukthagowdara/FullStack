
class ProductFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the product filter.</div>
    );
  }
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.image}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const productRows = products.map(product => (
    <ProductRow key={product.id} product={product} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
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
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.name.value = ''; form.price.value = ''; form.category.value = ''; form.image.value = '';
  }

  render() {
    return (
      <div>
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
            <input type="text" name="name" placeholder="Enter product name" /><br  />
            <label>Image URL</label><br  />
            <input type="text" name="image" placeholder="Enter url" /><br  />
            <button>Add Product</button>
        </form>
    </div>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
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
        id name price category image
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { products } = this.state;
    return (
      <React.Fragment>
        <h2>My Company Inventory</h2>
        <h4>Showing all available products</h4>
        <hr />
        <ProductFilter />
        <hr />
        <ProductTable products={products} />
        <h4>Add a new product to the inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));