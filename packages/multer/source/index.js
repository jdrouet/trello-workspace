const debug = require('debug')('trello-multer');
const TrelloClient = require('trello-core');
const concat = require('concat-stream');

class TrelloStorage extends TrelloClient {
  constructor(options) {
    super(options);
    this.board = options.board;
    this.list = options.list;
  }

  uploadFile(filename, buffer, cb) {
    debug('storage.uploadFile', filename);
    return this.createCard({
      name: filename,
      list: this.list,
    }).then(async (card) => {
      const attachment = await this.createAttachment({
        card: card.id,
        name: filename,
        stream: {
          value: buffer,
          options: {
            filename,
          },
        },
      });
      return cb(null, {
        attachment: attachment.id,
        card: card.id,
        url: attachment.url,
        previews: attachment.previews,
      });
    }).catch(cb);
  }

  _handleFile(req, file, cb) {
    debug('storage._handleFile', file);
    file.stream.pipe(concat({ encoding: 'buffer' }, (data) => {
      this.uploadFile(file.originalname, data, cb);
    }));
  }

  _removeFile(req, file, cb) {
    console.log('_removeFile', file);
    return cb(null, file);
  }
}

module.exports = {
  TrelloStorage,
};
