import express, { json } from 'express';
import pkg1 from 'body-parser';
const { json: _json, urlencoded } = pkg1;
import familyRouter from './routes/families.js';
import encuestaRouter from './routes/encuestas.routes.js';
import pkg2 from 'mongoose';
const { connect, connection } = pkg2;
import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const app = express();

connect(process.env.DATABASE_URL, {useNewUrlParser:true,useUnifiedTopology: true });
const db = connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(json());

app.use('/families', familyRouter);
app.use('/encuestas', encuestaRouter);

app.use('/images', express.static('images'));

app.use(_json());
app.use(urlencoded({ limit: '10mb', extended: false}));

app.listen(process.env.PORT || 3000, () => console.log('Server started'));