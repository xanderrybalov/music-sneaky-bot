const ytdl = require('ytdl-core');

const downloader = async function (url, ctx) {
    try {
        const videoInfo = await ytdl.getInfo(url);
        const titleVideo = videoInfo.videoDetails.title;
        const downloadStream = await ytdl(url, { filter: 'audioonly' });
        ctx.replyWithAudio({
            source: downloadStream,
            filename: `${titleVideo}.mp3`,
        });
    } catch (err) {
        console.error('Error downloading audio:', err);
        ctx.reply(
            'Виникла якась помилка, можливо ви вставили невірний url, або ще щось. Якщо чесно мені похуй 😜'
        );
    }
};

module.exports = downloader;
