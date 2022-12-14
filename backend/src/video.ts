import ytdl from "ytdl-core";
import fs from 'fs';
import fsPromises from 'fs/promises'
import path from 'path'

interface videoDetails {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
}

export async function fetchVideoData(youtubeUrl: string): Promise<videoDetails | {error: string}> {
  if (youtubeUrl === "" || youtubeUrl === undefined) return {'error': 'Invalid url'};
  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const details = info.videoDetails;
    return {
      title: details.title,
      thumbnail: details.thumbnails[details.thumbnails.length - 1].url,
      duration: details.lengthSeconds,
      views: details.viewCount,
      uploadDate: details.uploadDate,
    };
  } catch {
    return {
      error: 'Failed to fetch Video'
    }
  }
}

function getIdFromVideo(youtubeUrl: string): string {
  return youtubeUrl.slice(youtubeUrl.length - 11, youtubeUrl.length);
}

export async function downloadMP4(url: string): Promise<string | {error: string}> {
  await ytdl.getBasicInfo(url);
  try {
    if (!fs. existsSync('./files')){
      fs. mkdirSync('./files');
    }
    await new Promise((resolve) => {
      ytdl(url, {
        quality: 22
      }).pipe(fs.createWriteStream('files/' + getIdFromVideo(url) + '.mp4'))
      .on('close', () => {
        resolve('Complete');
      })
    }).then(async () => {
      await new Promise((resolve, reject) => {
        if (fs.existsSync('./files/' + getIdFromVideo(url) + '.mp4')) {
          return resolve('./files/' + getIdFromVideo(url) + '.mp4');
        }
        return reject('File was not found.');
      });
    });
  } catch {
    return {error: 'error'}
  }

  return './files/' + getIdFromVideo(url) + '.mp4';
}

export async function downloadMP3(url: string): Promise<string | {error: string}>{
  await ytdl.getBasicInfo(url);
  try {
    if (!fs. existsSync('./files')){
      fs. mkdirSync('./files');
    }
    await new Promise((resolve) => {
      ytdl(url, {
        filter: 'audioonly'
      }).pipe(fs.createWriteStream('files/' + getIdFromVideo(url) + '.mp3'))
      .on('close', () => {
        resolve('Complete');
      })
    }).then(async () => {
      await new Promise((resolve, reject) => {
        if (fs.existsSync('./files/' + getIdFromVideo(url) + '.mp3')) {
          return resolve('./files/' + getIdFromVideo(url) + '.mp3');
        }
        return reject('File was not found.');
      });
    });
  } catch {
    return {error: 'error'}
  }

  return './files/' + getIdFromVideo(url) + '.mp3';
}

export async function cleanUp() {
  const folderPath = "./files";
  try {
    const files = await fsPromises.readdir(folderPath);
    for (const file of files) {
        await fsPromises.unlink(path.resolve(folderPath, file));
    }
  } catch (err){
      console.log(err);
  }
  return {};
}