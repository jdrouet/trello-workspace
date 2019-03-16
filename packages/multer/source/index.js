const debug = require('debug')('trello-multer');
const TrelloClient = require('trello-core');

class TrelloStorage extends TrelloClient {
  constructor(options) {
    super(options);
    this.board = options.board;
    this.list = options.list;
  }

  async _handleFile(req, file, cb) {
    debug('storage._handleFile', file);
    try {
      const card = await this.createCard({
        name: file.originalname,
        list: this.list,
      });
      const attachment = await this.createAttachment({
        card: card.id,
        name: file.originalname,
        stream: file.stream,
      });
      return cb(null, attachment);
    } catch (err) {
      return cb(err);
    }
  }

  // _removeFile(req, file, cb) {
  //   console.log('_removeFile', file);
  //   return cb(null, file);
  // }
}

module.exports = {
  TrelloStorage,
};
