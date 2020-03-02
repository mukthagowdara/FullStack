const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = "Product Inventory API v1.0";

const productDB = [
  {
    product: 'Shirt', price: 10, category: 'Polo', image: 'https://www.shutterstock.com/image-photo/young-male-blank-black-tshirt-front-776178196',
  },
  {
    product: 'Shirt', price: 10, category: 'Polo', image: 'https://www.shutterstock.com/image-photo/set-three-photos-young-pretty-guy-1512767312',
  },
];

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    productList,
  },
  Mutation: {
    setAboutMessage,
    productAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function productList() {
  return productDB;
}

function productAdd(_, { product }) {
  product.created = new Date();
  product.id = productDB.length + 1;
  if (product.status == undefined) product.status = 'New';
  productDB.push(product);
  return product;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});