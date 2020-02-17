const contentNode = document.getElementById('contents');

const products = [
    ];


const ProductRow = (props) => (
    <tr>
        {/* <td>{props.product.id}</td> */}
        <td>{props.product.category}</td>
        <td>${props.product.price}</td>
        <td>{props.product.productName}</td>
        <td><a target="_blank" href={props.product.imageURL}>View</a></td>
    </tr>
)

function ProductTable(props) {
    const productRows = props.products.map(product =><ProductRow key={product.id} product={product} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    {/* <th>Id</th> */}
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>{productRows}</tbody>
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
        var form = document.forms.productAdd;
        this.props.createProduct({
            category: form.category.value,
            price: form.price.value,
            productName: form.productName.value,
            imageURL: form.imageURL.value,
        });
        // clear the form for the next input
        form.category.value = ""; form.price.value = ""; form.productName.value = ""; form.imageURL.value = "";
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
                    <input type="number" name="price" placeholder="$"  /><br  />
                    <label>Product Name</label><br  />
                    <input type="text" name="productName" placeholder="Enter product name" /><br  />
                    <label>Image URL</label><br  />
                    <input type="text" name="imageURL" placeholder="Enter url" /><br  />
                    <button>Add Product</button>
                </form>
            </div>
        )
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
    
    loadData() {
        setTimeout(() => {
        this.setState({ products: products });
        }, 500);
    }

    createProduct(newProduct) {
        const newProducts = this.state.products.slice();
        newProduct.id = this.state.products.length + 1;
        newProducts.push(newProduct);
        this.setState({ products: newProducts });
    }

   
    render() {
        return( <div>
                    <h2>My Company Inventory</h2>
                    <h4>Showing all available products</h4>
                    <hr />
                    <h4><ProductTable products={this.state.products}/></h4>
                    <h4>Add a new product to the inventory</h4>
                    <hr />
                    <h4><ProductAdd createProduct={this.createProduct} /></h4>
                    <hr />
                </div>);
    }
}

ReactDOM.render(<ProductList />, contentNode);