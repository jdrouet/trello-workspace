const program = require('commander');
const client = require('../service/trello');

const action = async (list) => {
  const result = await client.getCards({
    list,
  });
  console.table(result.map((item) => ({
    id: item.id,
    name: item.name,
    url: item.url,
  })));
};

program
  .command('get-cards <list-id>')
  .action(action);
