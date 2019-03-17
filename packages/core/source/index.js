const debug = require('debug')('trello-core');
const request = require('request');

const host = 'https://api.trello.com/1';

const handleResult = (resolve, reject) => (err, res, body) => {
  if (err) {
    debug('error', err);
    return reject(err);
  }
  if (res.statusCode >= 400) {
    debug('error', body);
    const error = new Error(res.body);
    error.statusCode = res.statusCode;
    return reject(error);
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

  querystring(values = {}) {
    return Object.assign({}, values, {
      key: this.key,
      token: this.token,
    });
  }

  /**
   * @param {string} uri
   * @param {object} options
   */
  execute(options) {
    const url = `${host}${options.url}`;
    const qs = Object.assign({}, options.qs, {
      key: this.key,
      token: this.token,
    });
    const opts = {
      ...options,
      qs,
      url,
    };
    debug('execute', opts);
    return new Promise((resolve, reject) => {
      request(opts, handleResult(resolve, reject));
    });
  }

  /**
   * @param {object} options
   */
  getBoard(options) {
    debug('board.get', options);
    return this.execute({
      method: 'get',
      url: `/boards/${options.board}`,
    });
  }

  /**
   * @param {object} options
   */
  createList(options) {
    debug('list.create', options);
    return this.execute({
      method: 'post',
      url: '/lists',
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
    return this.execute({
      method: 'get',
      url: `/lists/${options.list}`,
    });
  }

  /**
   * @param {object} options
   */
  createCard(options) {
    debug('card.create', options);
    return this.execute({
      method: 'post',
      url: '/cards',
      qs: {
        idList: options.list,
      },
      body: {
        name: options.name,
      },
      json: true,
    });
  }

  /**
   * @param {object} options
   */
  getCard(options) {
    debug('card.get', options);
    return this.execute({
      method: 'get',
      url: `/cards/${options.card}`,
    });
  }

  /**
   * @param {object} options
   */
  createAttachment(options) {
    debug('attachment.create', options);
    return this.execute({
      method: 'post',
      url: `/cards/${options.card}/attachments`,
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
    return this.execute({
      method: 'get',
      url: 'search',
      qs: {
        query: options.query,
      },
    });
  }
}

module.exports = TrelloClient;
