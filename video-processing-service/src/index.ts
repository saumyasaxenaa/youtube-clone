import express from "express";
import ffmpeg from "fluent-ffmpeg"; // wrapper around cli tool

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  // Get path of the input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad Request: Missing File Path");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-filter:v", "scale=360:-1") //converting the video into 360p
    .on("end", () => {
      res.status(200).send("Processing finished successfully");
    })
    .on("error", (err) => {
      console.log(`An error occured: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});