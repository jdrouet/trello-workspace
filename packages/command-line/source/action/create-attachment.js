const fs = require('fs');
const path = require('path');
const program = require('commander');
const client = require('../service/trello');

const action = async (card, file) => {
  const stream = fs.createReadStream(file);
  const attachment = await client.createAttachment({
    card,
    name: path.basename(file),
    stream,
  });
  console.log(attachment);
};

program
  .command('create-attachment <card-id> <file>')
  .action(action);
