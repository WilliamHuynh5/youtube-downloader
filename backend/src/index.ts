import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { fetchVideoData, downloadMP3, downloadMP4, cleanUp } from './video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = path.join(__dirname, '..', '..', 'frontend');
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(frontendPath, "/build")));

app.get("/api/download/mp3", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  res.download(await downloadMP3(url) as string);
});

app.get("/api/download/mp4", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  res.download(await downloadMP4(url) as string);
});

app.post("/api/fetch/video/details", async (req: Request, res: Response) => {
  const url = req.body.url;
  res.json(await fetchVideoData(url));
})

app.delete("/api/clean/up", async (req: Request, res: Response) => {
  res.json(await cleanUp());
})

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
