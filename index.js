// index.js
const express = require('express');
const { renderToString } = require('solid-js/web');
const { default: App } = require('./src/App.jsx');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const appHtml = renderToString(() => App);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Solid Express App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
