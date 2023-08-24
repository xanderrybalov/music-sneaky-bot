// Import necessary modules
const { Telegraf } = require('telegraf');
const { path: ffmpegPath } = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const downloader = require('./utils/downloader');
require('dotenv').config();

// Configure ffmpeg with the correct path
ffmpeg.setFfmpegPath(ffmpegPath);

// Create a new instance of the Telegraf bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Handle the /start command
bot.start((ctx) => {
    ctx.reply(
        'Welcome! To download audio from YouTube, simply send me a link to a video.'
    );
});

// Handle incoming text messages
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

// Launch the bot and handle potential errors
bot.launch().catch((err) => {
    console.error('Error starting bot:', err);
});

// Log a message indicating the bot is running
console.log('Bot is running 🏃');
