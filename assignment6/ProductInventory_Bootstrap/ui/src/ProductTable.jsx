import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Panel, Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />);
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <p>Showing all available products</p>
        </Panel.Heading>
      </Panel>
      <Table bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
    </div>
  );
}

class ProductRow extends React.Component {
  render() {
    const {
      product, deleteProduct, index,
    } = this.props;

    function onDelete(e) {
      e.preventDefault();
      deleteProduct(index);
      // eslint-disable-next-line no-alert
      alert('Deleted product successfully');
    }

    const deleteTooltip = (<Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>);

    const editTooltip = (
      <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
    );

    const viewTooltip = (<Tooltip id="view-tooltip" placement="top">View Image</Tooltip>);

    return (
      <tr>
        <td>{product.name}</td>
        <td>
          $
          {product.price}
        </td>
        <td>{product.category}</td>
        <td>
          <LinkContainer to={`/view/${product.id}`}>
            <OverlayTrigger delayShow={1000} overlay={viewTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="eye-open" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
        </td>
        <td>
          <LinkContainer to={`/edit/${product.id}`}>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="edit" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          {'  '}
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
            <Button bsSize="xsmall" bsStyle="primary" type="button" onClick={onDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}

const ProductRowDeleted = withRouter(ProductRow);
delete ProductRowDeleted.contextType;
