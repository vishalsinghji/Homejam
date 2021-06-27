const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
var PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


// Routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');

const api = process.env.API_URL;


app.use(`${api}/users`, userRoutes);
app.use(`${api}/courses`, courseRoutes);
app.use(`${api}/students`, studentRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(PORT, ()=>{
    console.log('server is running  http://localhost:5000');
})
