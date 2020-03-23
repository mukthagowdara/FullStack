/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.remove({});

const productsDB = [
  {
    id: 1,
    name: 'Polo',
    price: 10,
    category: 'Shirts',
    image: 'https://www.ctshirts.com/us/classic-collar-non-iron-twill-shirt----white/FON0409WHT.html?utm_term=FON0409WHT15H4S&gclid=EAIaIQobChMI0JWh5qGv6AIVxJyzCh3h8A2pEAYYASABEgKE_vD_BwE&marketing=true&utm_campaign=USA-Shopping-A-Formal-Shirts&utm_medium=cpc&marketingCode=usot99&utm_source=google&utm_content=pla',
  },
  {
    id: 2,
    name: 'Joggers',
    price: 20,
    category: 'Pants',
    image:'',
  },
];

db.products.insertMany(productsDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ image: 1 });