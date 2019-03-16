const debug = require('debug')('trello-core');
const request = require('request');

const host = 'https://api.trello.com/1';

const handleResult = (resolve, reject) => (err, res, body) => {
  if (err) {
    debug('error', err);
    return reject(err);
  }
  if (res.statusCode < 200 || res.statusCode >= 300) {
    return reject(body);
  }
  if (typeof body === 'string') {
    return resolve(JSON.parse(body));
  }
  return resolve(body);
};

class TrelloClient {
  /**
   * @param {object} options
   */
  constructor(options) {
    this.key = options.key;
    this.token = options.token;
  }

  /**
   * @param {string} uri
   * @param {object} options
   */
  get(uri, options = {}) {
    const url = `${host}${uri}`;
    const qs = Object.assign({}, options.params, {
      key: this.key,
      token: this.token,
    });
    return new Promise((resolve, reject) => {
      request.get({
        url,
        qs,
        json: true,
      }, handleResult(resolve, reject));
    });
  }

  /**
   * @param {string} uri
   * @param {object} options
   */
  post(uri, options) {
    const url = `${host}${uri}`;
    const qs = Object.assign({}, options.params, {
      key: this.key,
      token: this.token,
    });
    return new Promise((resolve, reject) => {
      request.post({
        url,
        qs,
        body: options.body,
        formData: options.formData,
        json: !!options.body,
      }, handleResult(resolve, reject));
    });
  }

  /**
   * @param {object} options
   */
  getBoard(options) {
    debug('board.get', options);
    return this.get(`/boards/${options.board}`);
  }

  /**
   * @param {object} options
   */
  createList(options) {
    debug('list.create', options);
    return this.post('/lists', {
      params: {
        idBoard: options.board,
      },
      body: {
        name: options.name,
      },
    });
  }

  /**
   * @param {object} options
   */
  getList(options) {
    debug('list.get', options);
    return this.get(`/lists/${options.list}`);
  }

  /**
   * @param {object} options
   */
  createCard(options) {
    debug('card.create', options);
    return this.post('/cards', {
      params: {
        idList: options.list,
      },
      body: {
        name: options.name,
      },
    });
  }

  /**
   * @param {object} options
   */
  getCard(options) {
    debug('card.get', options);
    return this.get(`/cards/${options.card}`);
  }

  /**
   * @param {object} options
   */
  createAttachment(options) {
    debug('attachment.create', options);
    return this.post(`/cards/${options.card}/attachments`, {
      formData: {
        name: options.name,
        file: options.stream,
      },
    });
  }

  /**
   * @param {object} options
   */
  search(options) {
    debug('search', options);
    return this.get('/search', {
      params: {
        query: options.query,
      },
    });
  }
}

module.exports = TrelloClient;
