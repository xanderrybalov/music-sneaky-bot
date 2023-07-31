const express = require('express');
const app = express();
const bot = require('./bot');

app.use((res, req, next) => {
    req.bot = bot;
    next();
});

const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
