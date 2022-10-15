import express from 'express';
import cors from 'cors';
import path from 'path';

import { fetchVideoData, downloadMP3, downloadMP4 } from './video.js';

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(frontendPath, "/build")));

app.get("/api/download/mp3", async (req, res) => {
  const url = req.query.url;
  res.json(await downloadMP3(url));
});

app.get("/api/download/mp4", async (req, res) => {
  const url = req.query.url;
  res.download(await downloadMP4(url));
});

app.post("/api/fetch/video/details", (req, res) => {
  const url = req.body.url;
  res.json(fetchVideoData(url));
})

app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});