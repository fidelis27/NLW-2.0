import express, { json } from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use('/temp', express.static(path.resolve(__dirname, '..', 'temp')));

const port = 3333;
app.listen(port, () => console.log(`server is running on port ${port}`));
