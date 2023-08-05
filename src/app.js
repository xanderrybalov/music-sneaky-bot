const { Telegraf } = require('telegraf');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const downloader = require('./utils/downloader');
require('dotenv').config();

ffmpeg.setFfmpegPath(ffmpegPath);

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        'Вітаю! Щоб скачати аудіо з YouTube, просто надішліть мені посилання на відео.'
    );
});

bot.on('text', (ctx) => {
    const messageText = ctx.update.message.text;
    downloader(messageText, ctx);
});

bot.launch();
