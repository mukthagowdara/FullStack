
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />);
  return (
    <div>
      <p>Showing all available products</p>
      <hr />
      <table className="bordered-table">
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
      </table>
    </div>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
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

    return (
      <tr>
        <td>{product.name}</td>
        <td>
          $
          {product.price}
        </td>
        <td>{product.category}</td>
        <td><Link to={`/view/${product.id}`}>View</Link></td>
        <td>
          <Link to={`/edit/${product.id}`}>Edit</Link>
          {' | '}
          <button id="deletebutton" type="button" onClick={onDelete}>Delete</button>

        </td>
      </tr>
    );
  }
}

const ProductRowDeleted = withRouter(ProductRow);
delete ProductRowDeleted.contextType;
