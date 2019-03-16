const {expect} = require('chai');
const nock = require('nock');
const Client = require('../source');

const config = {
  key: process.env.TRELLO_KEY || 'trello-key',
  token: process.env.TRELLO_TOKEN || 'trello-token',
};

describe('board', () => {
  afterEach(() => nock.cleanAll());

  describe('get', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .get('/boards/board-id')
        .query(config)
        .reply(200, {
          id: 'board-id',
          name: 'whatever',
        });
      const client = new Client(config);
      return client
        .getBoard({board: 'board-id'})
        .then((board) => {
          expect(board).to.have.property('id', 'board-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });
});
