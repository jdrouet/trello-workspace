const program = require('commander');
const client = require('../service/trello');

const action = async (query) => {
  const result = await client.search({query});
  console.table(result.boards);
};

program
  .command('search <query>')
  .action(action);
