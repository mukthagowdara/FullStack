db.products.remove({});
db.deleted_products.remove({});
const productDB = [
];

db.products.insertMany(productDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });
print('Created counter');

db.products.createIndex({ id: 1 }, { unique: true });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
