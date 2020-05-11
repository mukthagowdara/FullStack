import React from 'react';
import {
  Button, Panel, ButtonToolbar, FormGroup, Form,
  FormControl, ControlLabel, InputGroup,
} from 'react-bootstrap';


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
        <Panel><Panel.Heading><p>Add a new product to inventory</p></Panel.Heading></Panel>
        <Form inline name="productAdd" onSubmit={this.handleSubmit}>
          {/* <div className="form-container">
            <div className="form-col"> */}
          <FormGroup>
            <ControlLabel>Category:</ControlLabel>
            {' '}
            <FormControl
              componentClass="select"
              name="category"
            >
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </FormControl>
          </FormGroup>
          <br />
          <br />
          <FormGroup>
            <ControlLabel>Product Name</ControlLabel>
            {' '}
            <InputGroup>
              <FormControl type="text" name="name" />
            </InputGroup>
          </FormGroup>
          <br />
          <br />
          {/* </div> */}
          {/* <div className="form-col"> */}
          <FormGroup>
            <ControlLabel>Price Per Unit</ControlLabel>
            {' '}
            <InputGroup>
              <FormControl
                type="text"
                name="price"
                defaultValue={this.state.price}
                onChange={this.handlepriceChange}
              />
            </InputGroup>
          </FormGroup>
          <br />
          <br />
          <FormGroup>
            <ControlLabel>Image</ControlLabel>
            {' '}
            <InputGroup>
              <FormControl type="url" name="image" />
            </InputGroup>
          </FormGroup>
          {/* </div>
          </div> */}
          <br />
          <br />
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">
              Add Product
            </Button>
          </ButtonToolbar>
        </Form>
      </React.Fragment>
    );
  }
}
