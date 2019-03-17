const program = require('commander');
const client = require('../service/trello');

const action = async (board) => {
  const result = await client.getBoard({
    board,
    params: {
      fields: [
        'id',
        'name',
        'desc',
        'url',
      ].join(','),
      lists: 'all',
      list_fields: [
        'id',
        'name',
        'closed',
      ].join(','),
    },
  });
  const {lists, ...others} = result;
  console.table(others);
  console.table(lists);
};

program
  .command('get-board <board-id>')
  .action(action);
