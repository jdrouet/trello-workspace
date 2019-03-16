const {expect} = require('chai');
const nock = require('nock');
const Client = require('../source');

const config = {
  key: process.env.TRELLO_KEY || 'trello-key',
  token: process.env.TRELLO_TOKEN || 'trello-token',
};

describe('list', () => {
  afterEach(() => nock.cleanAll());

  describe('create', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .post('/lists', {name: 'whatever'})
        .query({
          ...config,
          idBoard: 'board-id',
        })
        .reply(200, {
          id: 'list-id',
          name: 'whatever',
        });
      const client = new Client(config);
      return client
        .createList({
          board: 'board-id',
          name: 'whatever',
        })
        .then((list) => {
          expect(list).to.have.property('id', 'list-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });

  describe('get', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .get('/lists/list-id')
        .query(config)
        .reply(200, {
          id: 'list-id',
          name: 'whatever',
        });
      const client = new Client(config);
      return client
        .getList({list: 'list-id'})
        .then((list) => {
          expect(list).to.have.property('id', 'list-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });
});
