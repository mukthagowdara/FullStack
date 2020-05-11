const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const about = require('./about.js');
const product = require('./product.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    productList: product.list,
    product: product.get,
    productCounts: product.counts,
  },
  Mutation: {
    productUpdate: product.update,
    productDelete: product.delete,
    setAboutMessage: about.setAboutMessage,
    addProduct: product.add,
  },
};
const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  let cors;
  if (enableCors) {
    const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
    const methods = 'POST';
    cors = { origin, methods, credentials: true };
  } else {
    cors = 'false';
  }
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
