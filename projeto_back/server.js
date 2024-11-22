const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send("Server operacional");
});
app.listen(port, () => {
  console.log(`O servidor está na porta:${port}`);
});