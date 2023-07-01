const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const quotesFilePath = './quotes.json';

app.get('/', (req, res)=> {
    res.send(fs.readFileSync(quotesFilePath, 'utf8'))
})

app.get('/quotes', (req, res) => {
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const quotes = JSON.parse(data);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  });
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const quotes = JSON.parse(data);
    const quote = quotes.find(q => q.id === id);

    if (quote) {
      res.json(quote);
    } else {
      res.status(404).send('Quote not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
