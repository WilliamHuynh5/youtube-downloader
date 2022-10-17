# youtube-downloader
https://youtube-downloader-mp.herokuapp.com/

A webapp for those interested in downloading videos from YouTube. Supports MP4 and MP3 formats using the best available quality.

# setup locally
- `npm install` to install dependencies
- `npm start` in the `backend` directory to start the server
- `npm start` in the `frontend` directory to start the client

# todo
- Allow users to select quality
- Allow for bulk downloading
- Add an estimated download time with progress bar

# limitations
- Files exceeding 1gb cannot be downloaded. This is due to file size limits with the Heroku free plan. 
