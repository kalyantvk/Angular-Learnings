const express = require('express');

const app = express();

app.use(express.static('./dist/HandsonFirst'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: '/'}),
);

app.listen(process.env.PORT);