const { Telegraf } = require('telegraf');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const downloader = require('./utils/downloader');
require('dotenv').config();

ffmpeg.setFfmpegPath(ffmpegPath);

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        'Welcome! To download audio from YouTube, simply send me a link to a video.'
    );
});

bot.on('text', async (ctx) => {
    const messageText = ctx.update.message.text;

    try {
        await downloader(messageText, ctx);
    } catch (err) {
        console.error('Error:', err);

        ctx.reply(
            'An error occurred while processing your request. Please try again later.'
        );
    }
});

bot.launch().catch((err) => {
    console.error('Error starting bot:', err);
});
