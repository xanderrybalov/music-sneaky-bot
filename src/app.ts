import { Telegraf } from 'telegraf';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import { downloader } from './utils/downloader';
import * as dotenv from 'dotenv';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegPath);

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

if (!TELEGRAM_TOKEN) {
    console.error(
        'TELEGRAM_TOKEN is not defined in the environment variables.'
    );
    process.exit(1); // Exit the application with an error code
}

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        'Welcome! To download audio from YouTube, simply send me a link to a video.'
    );
});

bot.on('text', async (ctx) => {
    const messageText = ctx.update.message.text;

    try {
        await downloader(messageText, ctx);
    } catch (error) {
        console.error('Error:', error);

        ctx.reply(
            'An error occurred while processing your request. Please try again later.'
        );
    }
});

bot.launch().catch((err) => {
    console.error('Error starting bot:', err);
});
console.log('Bot is running 🏃');
