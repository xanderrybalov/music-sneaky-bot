const { Telegraf } = require('telegraf');

require('dotenv').config();

console.log(process.env.TELEGRAM_TOKEN);

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
    ctx.reply('Test working');
});

bot.launch()
    .then(() => {
        console.log('Бот запущен');
    })
    .catch((err) => {
        console.error('ERORRRS', err);
    });

module.exports = bot;
