import ytdl from "ytdl-core";
import fs from 'fs';

  // const id = getIdFromVideo(youtubeUrl);
  // const thumbnail = 'img.youtube.com/vi/' + id + '/hqdefault.jpg';
  
  
export async function fetchVideoData(youtubeUrl) {
  if (youtubeUrl === "" || youtubeUrl === undefined) return {'error': 'Invalid url'};
  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const details = info.videoDetails;
    return {
      title: details.title,
      thumbnail: details.thumbnails[-1],
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

function getIdFromVideo(youtubeUrl) {
  return youtubeUrl.slice(youtubeUrl.length - 11, youtubeUrl.length);
}

export async function downloadMP4(url) {
  const info = await ytdl.getBasicInfo(url);
  console.log(info.videoDetails.title);
  await new Promise((resolve) => {
    ytdl(url, {
      format: 'mp4'
    }).pipe(fs.createWriteStream('files/' + getIdFromVideo(url) + '.mp4'))
    .on('close', () => {
      resolve();
    })
  }).then(async () => {
    console.log('finished downloading');
    await new Promise((resolve, reject) => {
      if (fs.existsSync('./files/' + getIdFromVideo(url) + '.mp4')) {
        return resolve('./files/' + getIdFromVideo(url) + '.mp4');
      }
      return reject('File was not found.');
    });
  });

  return './files/' + getIdFromVideo(url) + '.mp4';
}

export function downloadMP3(url) {
  return new Promise((resolve, reject) => {
    try {
      ytdl(url, {
        format: 'mp3'
      }).pipe(fs.createWriteStream('files/' + getIdFromVideo(url) + '.mp3'));
      return resolve;
    } catch {
      return reject("No video id found");
    }
  }).then(
    
  )
}