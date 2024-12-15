import express from "express";
import path from "path";
import router from "./routes/routes.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import wwwrouter from "./wwwroutes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://me.kis.v2.scr.kaspersky-labs.com",
          "https://leostop.com",
          "https://code.jquery.com",
        ],
        connectSrc: [
          "'self'",
          "https://me.kis.v2.scr.kaspersky-labs.com",
          "https://leostop.com",
        ],
      },
    },
  })
);

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "wwwroot")));
app.use('/images', express.static(path.join(__dirname, 'wwwroot/images')));

app.use("/MCSPROJECT", router);
app.use("/", wwwrouter);

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
});
