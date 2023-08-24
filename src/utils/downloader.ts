import ytdl from 'ytdl-core';

export async function downloader(url: string, ctx: any): Promise<void> {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error('Invalid URL');
        }

        const videoInfo = await ytdl.getInfo(url);
        const titleVideo = videoInfo.videoDetails.title;

        const downloadStream = ytdl(url, { filter: 'audioonly' });

        ctx.replyWithAudio(
            { source: downloadStream, filename: `${titleVideo}.mp3` },
            { title: titleVideo }
        );
    } catch (error) {
        console.error('Error downloading audio:', error);

        ctx.reply(
            'An error occurred while downloading the audio. Please check the URL and try again.'
        );
    }
}
