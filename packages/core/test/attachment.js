const {expect} = require('chai');
const nock = require('nock');
const fs = require('fs');
const path = require('path');
const Client = require('../source');

const config = {
  key: process.env.TRELLO_KEY || 'trello-key',
  token: process.env.TRELLO_TOKEN || 'trello-token',
};

describe('attachment', () => {
  afterEach(() => nock.cleanAll());

  describe('create', () => {
    it('should call trello API', () => {
      const scope = nock('https://api.trello.com/1')
        .post('/cards/card-id/attachments')
        .query(config)
        .reply(200, {id: 'attachment-id'});
      const reader = fs.createReadStream(path.join(__dirname, 'files', 'image.jpg'));
      const client = new Client(config);
      return client
        .createAttachment({
          card: 'card-id',
          name: 'image.jpg',
          stream: reader,
        })
        .then((card) => {
          expect(card).to.have.property('id', 'attachment-id');
          expect(scope.isDone()).to.eql(true);
        });
    });
  });
});
