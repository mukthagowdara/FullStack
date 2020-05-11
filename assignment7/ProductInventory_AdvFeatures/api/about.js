let aboutMessage = 'Product Inventory';

async function setAboutMessage(_, { message }) {
  // eslint-disable-next-line no-return-assign
  return aboutMessage = message;
}

async function getMessage() {
  return aboutMessage;
}

module.exports = { getMessage, setAboutMessage };
