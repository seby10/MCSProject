import express from 'express';
import path from 'path';
import router from './routes/routes.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import wwwrouter from './wwwroutes/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());


app.use(express.static(path.join(__dirname, 'wwwroot')));

app.use('/proyectoMCS', router);
app.use('/', wwwrouter);

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`)
})