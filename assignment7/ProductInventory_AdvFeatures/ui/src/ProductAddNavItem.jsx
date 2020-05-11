import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button, ButtonToolbar, FormGroup, Form, Modal, NavItem,
  FormControl, ControlLabel, InputGroup, OverlayTrigger, Tooltip, Glyphicon,
} from 'react-bootstrap';
import Toast from './Toast.jsx';

class ProductAddNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: '$',
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showError = this.showError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlepriceChange = this.handlepriceChange.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.productAdd;
    const product = {
      category: form.category.value,
      price: form.price.value.replace('$', ''),
      name: form.name.value,
      image: form.image.value,
    };
    const query = `mutation addProduct($product: ProductInputs!){
        addProduct(product: $product){
            id
        }
    }`;
    const data = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.addProduct.id}`);
    }

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
    const { showing } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="add-product">Add Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form name="productAdd" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Category:</ControlLabel>
                {' '}
                <select name="category" className="category">
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Product Name</ControlLabel>
                {' '}
                <InputGroup>
                  <FormControl type="text" name="name" />
                </InputGroup>
              </FormGroup>
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
              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                {' '}
                <InputGroup>
                  <FormControl type="url" name="image" />
                </InputGroup>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductAddNavItem);
