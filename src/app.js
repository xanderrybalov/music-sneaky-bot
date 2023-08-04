const express = require('express');
const app = express();
const bot = require('./bot');

app.use((res, req, next) => {
    req.bot = bot;
    next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Bot working on port ${PORT}`);
});
