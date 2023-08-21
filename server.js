if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const familyRouter = require('./routes/families');
const encuestaRouter = require('./routes/encuestas.routes');
app.use('/families', familyRouter);
app.use('/encuestas', encuestaRouter);

// Make sure images folder is publicly available
app.use('/images', express.static('images'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.listen(process.env.PORT || 3000, () => console.log('Server started'))