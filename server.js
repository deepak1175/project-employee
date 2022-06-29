// Import the required dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const EmployeeRoute = require('./routes/employee');
const AuthRoute = require('./routes/auth');
const dotenv = require('dotenv');
dotenv.config();
const mongoUri='mongodb://localhost:27017/employee?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(mongoUri,()=>{console.log('Connection estabilished')}
)
const db = mongoose.connection;

// check if the connection is successful
db.on('error'  ,(err) => {
    console.log(err);
})

db.once('open' ,() => {
    console.log('connected');
})
// create the server
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/public/uploads' , express.static('uploads'));
app.use(cors());
const PORT =5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/employee', EmployeeRoute);
app.use('/api', AuthRoute);



