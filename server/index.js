const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./src/routes/index.js");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});



const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app)
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
}).then(() =>{
    console.log("Mongodb connected");
    server.listen(port, () =>{
        console.log(`Server is listening on port ${port}`)
    });
}).catch((err) =>{
    console.log({err});
    process.exit(1);
});

