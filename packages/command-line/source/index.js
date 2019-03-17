const program = require('commander');
const pck = require('../package.json');
require('./action');

program.version(pck.version);

program.parse(process.argv);
