require('dotenv').config()
var cors = require('cors')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());

const diapersRouter = require('./routes/diapers')
app.use('/diapers', diapersRouter)
const feedsRouter = require('./routes/feeds')
app.use('/feeds', feedsRouter)
const feedTypesRouter = require('./routes/feedTypes')
app.use('/feedTypes', feedTypesRouter)
const sleepsRouter = require('./routes/sleeps')
app.use('/sleeps', sleepsRouter)
const medsRouter = require('./routes/meds')
app.use('/meds', medsRouter)
const medTypesRouter = require('./routes/medTypes')
app.use('/medTypes', medTypesRouter)

app.listen(3000, () => console.log('Server Started'));