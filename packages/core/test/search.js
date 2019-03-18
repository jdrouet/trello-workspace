const {expect} = require('chai');
const nock = require('nock');
const Client = require('../source');

const config = {
  key: process.env.TRELLO_KEY || 'trello-key',
  token: process.env.TRELLO_TOKEN || 'trello-token',
};

describe('search', () => {
  afterEach(() => nock.cleanAll());

  it('should handle errors', () => {
    const scope = nock('https://api.trello.com/1')
      .get('/search')
      .query({
        query: 'test',
        ...config,
      })
      .replyWithError('unauthorized');
    const client = new Client(config);
    return client
      .search({query: 'test'})
      .catch(() => {
        expect(scope.isDone()).to.eql(true);
      });
  });

  it('should handle rejection', () => {
    const scope = nock('https://api.trello.com/1')
      .get('/search')
      .query({
        ...config,
        query: 'test',
      })
      .reply(401, 'unauthorized');
    const client = new Client(config);
    return client
      .search({query: 'test'})
      .catch(() => {
        expect(scope.isDone()).to.eql(true);
      });
  });

  it('should list the boards', () => {
    const scope = nock('https://api.trello.com/1')
      .get('/search')
      .query({
        ...config,
        query: 'test',
      })
      .reply(200, {
        options: {
          terms: [],
          modifiers: [],
          modelTypes: ['actions', 'cards', 'boards', 'organizations', 'members'],
          partial: false,
        },
        boards: [{
          id: '5c1b9123cae5d121wacc4ce1',
          name: 'test-trello-1',
          idOrganization: null,
        }, {
          id: '5bc6307802616a544a42b0cc',
          name: 'test-trello-2',
          idOrganization: null,
        }],
        cards: [],
        organizations: [],
        members: [],
      });
    const client = new Client(config);
    return client
      .search({query: 'test'})
      .then((result) => {
        expect(result).to.have.property('options');
        expect(result).to.have.property('boards');
        expect(result).to.have.property('cards');
        expect(result).to.have.property('organizations');
        expect(result).to.have.property('members');
        expect(scope.isDone()).to.eql(true);
      });
  });
});
