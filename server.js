const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');


//configure dotenv
dotenv.config();

//rest object
const app = express();

//middlewares 
app.use(morgan("dev"))
app.use(express.json());
// routes
app.use("/api/v1/student", require("./routes/studentRoutes"))

app.get('/test', (req, res) => {
    res.status(200).send('<h1>Node js Mysql App</h1>');
});

//PORT
const PORT = process.env.PORT || 8000;

//conditionaly listen
mySqlPool
    .query("SELECT 1")
    .then(() => {
        //mySql
        console.log("MySql database is connected");
        //listen 
        app.listen(PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })

    })
    .catch((error) => {
        console.log(error);
    })
