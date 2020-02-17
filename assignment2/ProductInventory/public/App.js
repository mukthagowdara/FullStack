"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var products = [];

var ProductRow = function ProductRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.product.category
        ),
        React.createElement(
            "td",
            null,
            "$",
            props.product.price
        ),
        React.createElement(
            "td",
            null,
            props.product.productName
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                { target: "_blank", href: props.product.imageURL },
                "View"
            )
        )
    );
};

function ProductTable(props) {
    var productRows = props.products.map(function (product) {
        return React.createElement(ProductRow, { key: product.id, product: product });
    });
    return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Product Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                ),
                React.createElement(
                    "th",
                    null,
                    "Category"
                ),
                React.createElement(
                    "th",
                    null,
                    "Image"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            productRows
        )
    );
}

var ProductAdd = function (_React$Component) {
    _inherits(ProductAdd, _React$Component);

    function ProductAdd() {
        _classCallCheck(this, ProductAdd);

        var _this = _possibleConstructorReturn(this, (ProductAdd.__proto__ || Object.getPrototypeOf(ProductAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(ProductAdd, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.productAdd;
            this.props.createProduct({
                category: form.category.value,
                price: form.price.value,
                productName: form.productName.value,
                imageURL: form.imageURL.value
            });
            // clear the form for the next input
            form.category.value = "";form.price.value = "";form.productName.value = "";form.imageURL.value = "";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "productAdd", onSubmit: this.handleSubmit },
                    React.createElement(
                        "label",
                        null,
                        "Category"
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "select",
                        { id: "category", name: "category" },
                        React.createElement(
                            "option",
                            { selected: true, value: "shirts" },
                            "Shirts"
                        ),
                        React.createElement(
                            "option",
                            { value: "jeans" },
                            "Jeans"
                        ),
                        React.createElement(
                            "option",
                            { value: "jackets" },
                            "Jackets"
                        ),
                        React.createElement(
                            "option",
                            { value: "sweaters" },
                            "Sweaters"
                        ),
                        React.createElement(
                            "option",
                            { value: "accesories" },
                            "Accesories"
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Price per unit"
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "number", name: "price", placeholder: "$" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Product Name"
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", name: "productName", placeholder: "Enter product name" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Image URL"
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", name: "imageURL", placeholder: "Enter url" }),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        null,
                        "Add Product"
                    )
                )
            );
        }
    }]);

    return ProductAdd;
}(React.Component);

var ProductList = function (_React$Component2) {
    _inherits(ProductList, _React$Component2);

    function ProductList() {
        _classCallCheck(this, ProductList);

        var _this2 = _possibleConstructorReturn(this, (ProductList.__proto__ || Object.getPrototypeOf(ProductList)).call(this));

        _this2.state = { products: [] };
        _this2.createProduct = _this2.createProduct.bind(_this2);
        return _this2;
    }

    _createClass(ProductList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            var _this3 = this;

            setTimeout(function () {
                _this3.setState({ products: products });
            }, 500);
        }
    }, {
        key: "createProduct",
        value: function createProduct(newProduct) {
            var newProducts = this.state.products.slice();
            newProduct.id = this.state.products.length + 1;
            newProducts.push(newProduct);
            this.setState({ products: newProducts });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    "My Company Inventory"
                ),
                React.createElement(
                    "h4",
                    null,
                    "Showing all available products"
                ),
                React.createElement("hr", null),
                React.createElement(
                    "h4",
                    null,
                    React.createElement(ProductTable, { products: this.state.products })
                ),
                React.createElement(
                    "h4",
                    null,
                    "Add a new product to the inventory"
                ),
                React.createElement("hr", null),
                React.createElement(
                    "h4",
                    null,
                    React.createElement(ProductAdd, { createProduct: this.createProduct })
                ),
                React.createElement("hr", null)
            );
        }
    }]);

    return ProductList;
}(React.Component);

ReactDOM.render(React.createElement(ProductList, null), contentNode);