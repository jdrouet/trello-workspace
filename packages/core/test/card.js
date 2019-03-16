const {expect} = require('chai');
const nock = require('nock');
const Client = require('../source');

const config = {
  key: process.env.TRELLO_KEY || 'trello-key',
  token: process.env.TRELLO_TOKEN || 'trello-token',
};

describe('card', () => {
  afterEach(() => nock.cleanAll());

  describe('create', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .post('/cards', {
          name: 'whatever',
        })
        .query({
          ...config,
          idList: 'list-id',
        })
        .reply(200, {
          id: 'card-id',
          badges: [],
          checkItemStates: [],
          closed: false,
          dueComplete: false,
          dateLastActivity: '2019-02-01T14:04:42.745Z',
          desc: '',
          descData: null,
          due: null,
          dueReminder: null,
          email: null,
          idBoard: 'board-id',
          idChecklists: [],
          idList: 'list-id',
          idMembers: [],
          idMembersVoted: [],
          idShort: 15,
          idAttachmentCover: null,
          labels: [],
          idLabels: [],
          manualCoverAttachment: false,
          name: 'whatever',
          pos: 212091,
          shortLink: 'RXnaa2q8',
          shortUrl: 'https://trello.com/c/RXnaa2q8',
          subscribed: false,
          url: 'https://trello.com/c/RXnaa2q8/15-whatever'
        });
      const client = new Client(config);
      return client
        .createCard({
          list: 'list-id',
          name: 'whatever',
        })
        .then((card) => {
          expect(card).to.have.property('id', 'card-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });

  describe('get', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .get('/cards/card-id')
        .query(config)
        .reply(200, {
          id: 'card-id',
          badges: [],
          checkItemStates: [],
          closed: false,
          dueComplete: false,
          dateLastActivity: '2019-02-01T14:04:42.745Z',
          desc: '',
          descData: null,
          due: null,
          dueReminder: null,
          email: null,
          idBoard: 'board-id',
          idChecklists: [],
          idList: 'list-id',
          idMembers: [],
          idMembersVoted: [],
          idShort: 15,
          idAttachmentCover: null,
          labels: [],
          idLabels: [],
          manualCoverAttachment: false,
          name: 'whatever',
          pos: 212091,
          shortLink: 'RXnaa2q8',
          shortUrl: 'https://trello.com/c/RXnaa2q8',
          subscribed: false,
          url: 'https://trello.com/c/RXnaa2q8/15-whatever'
        });
      const client = new Client(config);
      return client
        .getCard({card: 'card-id'})
        .then((card) => {
          expect(card).to.have.property('id', 'card-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });
});
