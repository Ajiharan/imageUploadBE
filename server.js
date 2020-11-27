import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());
const router = express.Router();

const imageSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});
const ImageSchema = mongoose.model("imageSchemas", imageSchema);

app.use("/image", router);
router.post("/upload", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const postData = await new ImageSchema({
      imageUrl: req.body.imageUrl,
    });
    const saveData = await postData.save();
    res.status(200).json(saveData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

const PORT = 5000;

const DB_CONNECTION = "mongodb://localhost:27017/imageUploadDB";

mongoose.connect(DB_CONNECTION, (err) => {
  if (err) {
    throw err;
  }
  console.log("DB connected successfully");
});

app.listen(PORT, () => {
  console.log(`Port listen in ${PORT}`);
});
