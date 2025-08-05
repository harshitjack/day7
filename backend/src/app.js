const express = require('express');
const app = express();


const songRoutes = require('./routes/song.routes');
const cors = require('cors');


app.use(express.json());
app.use(cors())
app.use('/', songRoutes);










module.exports = app;