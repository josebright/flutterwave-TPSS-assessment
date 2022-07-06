import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index.js';
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => { res.send('LannisterPay Transaction Payment Splitting Service (TPSS)')});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
})