import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from "./config.js";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongodbUrl = config.MONGODB_URL;

/*=========================================
                Mongoose                 
=========================================*/
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log("Error in connecting MongoDB", error.reason));

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

/*=========================================
            express                 
=========================================*/
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/listings", productsRoute);

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => { console.log(`Server started at http://localhost:${config.PORT}`); });
