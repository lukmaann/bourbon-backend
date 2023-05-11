import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import AuthRoute from "./routes/auth.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";


// Configuraion-----------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extented:true }));
app.use(bodyParser.urlencoded({ extented:true, limit: "30mb" }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

// Strorage------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// mongoose---------------------------------------------------------------------

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

// Route----------------------------------------------------------------------------
app.post("/auth/register", upload.single("picture"), register);

app.use("/auth", AuthRoute);
