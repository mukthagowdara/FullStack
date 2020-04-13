let aboutMessage = 'Product Inventory API v2.0';

async function setAboutMessage(_, { message }) {
  // eslint-disable-next-line no-return-assign
  return aboutMessage = message;
}

async function getMessage() {
  return aboutMessage;
}

module.exports = { getMessage, setAboutMessage };
