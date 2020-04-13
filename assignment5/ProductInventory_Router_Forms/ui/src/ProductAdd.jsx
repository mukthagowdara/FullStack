
import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { price: '$' };
    this.handlepriceChange = this.handlepriceChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      category: form.category.value,
      price: form.price.value.replace('$', ''),
      name: form.name.value,
      image: form.image.value,
    };

    this.props.createProduct(product);
    form.price.value = '$';
    form.name.value = '';
    form.image.value = '';
    form.category.value = '';
  }

  handlepriceChange() {
    this.setState({ price: document.forms.productAdd.price.value });
  }


  render() {
    return (
      <React.Fragment>
        <p>Add a new product to inventory</p>
        <hr />
        <form name="productAdd" onSubmit={this.handleSubmit}>
          <div className="form-container">
            <div className="form-col">
              Category
              <br />
              <select name="category" className="category">
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </select>
              <br />
              Product Name
              <br />
              <input type="text" name="name" />
            </div>
            <div className="form-col">
              Price Per Unit
              {' '}
              <br />
              <input
                type="text"
                name="price"
                defaultValue={this.state.price}
                onChange={this.handlepriceChange}
              />
              <br />
              Image URL
              <br />
              <input type="url" name="image" />
            </div>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </React.Fragment>
    );
  }
}
