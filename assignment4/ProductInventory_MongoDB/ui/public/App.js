'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductFilter = function (_React$Component) {
  _inherits(ProductFilter, _React$Component);

  function ProductFilter() {
    _classCallCheck(this, ProductFilter);

    return _possibleConstructorReturn(this, (ProductFilter.__proto__ || Object.getPrototypeOf(ProductFilter)).apply(this, arguments));
  }

  _createClass(ProductFilter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'This is a placeholder for the product filter.'
      );
    }
  }]);

  return ProductFilter;
}(React.Component);

function ProductRow(_ref) {
  var product = _ref.product;

  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      product.id
    ),
    React.createElement(
      'td',
      null,
      product.name
    ),
    React.createElement(
      'td',
      null,
      product.price
    ),
    React.createElement(
      'td',
      null,
      product.category
    ),
    React.createElement(
      'td',
      null,
      product.image
    )
  );
}

function ProductTable(_ref2) {
  var products = _ref2.products;

  var productRows = products.map(function (product) {
    return React.createElement(ProductRow, { key: product.id, product: product });
  });

  return React.createElement(
    'table',
    { className: 'bordered-table' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'ID'
        ),
        React.createElement(
          'th',
          null,
          'Product Name'
        ),
        React.createElement(
          'th',
          null,
          'Price'
        ),
        React.createElement(
          'th',
          null,
          'Category'
        ),
        React.createElement(
          'th',
          null,
          'Image'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      productRows
    )
  );
}

var ProductAdd = function (_React$Component2) {
  _inherits(ProductAdd, _React$Component2);

  function ProductAdd() {
    _classCallCheck(this, ProductAdd);

    var _this2 = _possibleConstructorReturn(this, (ProductAdd.__proto__ || Object.getPrototypeOf(ProductAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(ProductAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.productAdd;
      var product = {
        name: form.name.value,
        price: form.price.value,
        category: form.category.value,
        image: form.image.value
      };
      var createProduct = this.props.createProduct;

      createProduct(product);
      form.name.value = '';form.price.value = '';form.category.value = '';form.image.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { name: 'productAdd', onSubmit: this.handleSubmit },
          React.createElement(
            'label',
            null,
            'Category'
          ),
          React.createElement('br', null),
          React.createElement(
            'select',
            { id: 'category', name: 'category' },
            React.createElement(
              'option',
              { selected: true, value: 'shirts' },
              'Shirts'
            ),
            React.createElement(
              'option',
              { value: 'jeans' },
              'Jeans'
            ),
            React.createElement(
              'option',
              { value: 'jackets' },
              'Jackets'
            ),
            React.createElement(
              'option',
              { value: 'sweaters' },
              'Sweaters'
            ),
            React.createElement(
              'option',
              { value: 'accesories' },
              'Accesories'
            )
          ),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Price per unit'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'number', name: 'price', placeholder: '' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Product Name'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', name: 'name', placeholder: 'Enter product name' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Image URL'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', name: 'image', placeholder: 'Enter url' }),
          React.createElement('br', null),
          React.createElement(
            'button',
            null,
            'Add Product'
          )
        )
      );
    }
  }]);

  return ProductAdd;
}(React.Component);

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired
};

async function graphQLFetch(query) {
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query, variables: variables })
    });
    var body = await response.text();
    var result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      var error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        var details = error.extensions.exception.errors.join('\n ');
        alert(error.message + ':\n ' + details);
      } else {
        alert(error.extensions.code + ': ' + error.message);
      }
    }
    return result.data;
  } catch (e) {
    alert('Error in sending data to server: ' + e.message);
    return null;
  }
}

var ProductList = function (_React$Component3) {
  _inherits(ProductList, _React$Component3);

  function ProductList() {
    _classCallCheck(this, ProductList);

    var _this3 = _possibleConstructorReturn(this, (ProductList.__proto__ || Object.getPrototypeOf(ProductList)).call(this));

    _this3.state = { products: [] };
    _this3.createProduct = _this3.createProduct.bind(_this3);
    return _this3;
  }

  _createClass(ProductList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'loadData',
    value: async function loadData() {
      var query = 'query {\n      productList {\n        id name price category image\n      }\n    }';

      var data = await graphQLFetch(query);
      if (data) {
        this.setState({ products: data.productList });
      }
    }
  }, {
    key: 'createProduct',
    value: async function createProduct(product) {
      var query = 'mutation productAdd($product: ProductInputs!) {\n      productAdd(product: $product) {\n        id\n      }\n    }';

      var data = await graphQLFetch(query, { product: product });
      if (data) {
        this.loadData();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var products = this.state.products;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'h2',
          null,
          'My Company Inventory'
        ),
        React.createElement(
          'h4',
          null,
          'Showing all available products'
        ),
        React.createElement('hr', null),
        React.createElement(ProductFilter, null),
        React.createElement('hr', null),
        React.createElement(ProductTable, { products: products }),
        React.createElement(
          'h4',
          null,
          'Add a new product to the inventory'
        ),
        React.createElement('hr', null),
        React.createElement(ProductAdd, { createProduct: this.createProduct })
      );
    }
  }]);

  return ProductList;
}(React.Component);

var element = React.createElement(ProductList, null);

ReactDOM.render(element, document.getElementById('contents'));