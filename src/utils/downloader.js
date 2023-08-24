const ytdl = require('ytdl-core');

// Define an async function for downloading audio
const Downloader = async function (url, ctx) {
    try {
        // Validate the URL before using ytdl.validateURL
        if (!ytdl.validateURL(url)) {
            throw new Error('Invalid URL');
        }

        // Get video information
        const videoInfo = await ytdl.getInfo(url);
        const titleVideo = videoInfo.videoDetails.title;

        // Get the audio download stream
        const downloadStream = ytdl(url, { filter: 'audioonly' });

        // Send the audio file to the user
        ctx.replyWithAudio(
            { source: downloadStream, filename: `${titleVideo}.mp3` },
            { title: titleVideo }
        );
    } catch (err) {
        console.error('Error downloading audio:', err);
        ctx.reply(
            'An error occurred while downloading the audio. Please check the URL and try again.'
        );
    }
};

// Export the Downloader function
module.exports = Downloader;
