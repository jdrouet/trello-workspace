const TrelloClient = require('trello-core');

module.exports = new TrelloClient({
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
});
