# Multer Trello

This project is mostly a proof of concept. It's not made to be used in production.

## Installation

```bash
npm install --save trello-multer
```

## Usage

```node
const express = require('express');
const multer = require('multer');
const {TrelloStorage} = require('trello-multer');

const app = express();
const uploader = multer({
  storage: new TrelloStorage({
    key: 'trello-key',
    token: 'trello-token',
    board: 'board id',
    list: 'list id',
  }),
});

app.post('/upload', uploader.single('picture'), (req, res) => {
  res.json(req.file);
});
```
