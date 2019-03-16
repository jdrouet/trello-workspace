# trello-core

Core Trello node module

## Usage

```bash
npm i --save trello-core
```

```
const TrelloClient = require('trello-core');

const client = new TrelloClient({
  key: 'your trello key',
  token: 'your trello token',
});
client.search({query: 'whatever'})
  .then(console.log);
```

## Roadmap

- [x] Search `GET /api/search`
- [x] Get board `GET /api/boards/:boardid`
- [ ] Create board `POST /api/boards`
- [ ] Update board `PUT /api/boards/:boardid`
- [x] Get list `GET /api/lists/:listid`
- [x] Create list `POST /api/lists`
- [ ] Update list `PUT /api/lists/:listid`
- [x] Get card `GET /api/cards/:cardid`
- [x] Create card `POST /api/cards`
- [x] Update card `PUT /api/cards/:cardid`
- [ ] Get attachments `GET /api/cards/:cardid/attachments`
- [ ] Upload attachment `POST /api/cards/:cardid/attachments`
