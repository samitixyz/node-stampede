const express = require("express")
const bodyParser = require('body-parser')
const dbo = require("./libs/db/conn")
const path = require('path');
var cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
app.use(express.static('app'));

// app.use(express.static(__dirname + 'public/bot'));
// app.use(express.static(__dirname + 'public/bot/out'));

app.use(require("./libs/routes/decode"));
app.use(cors({ origin : '*'}));
// https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers
const port = process.env.PORT || 3000;

app.listen(port, () => {
    // dbo.connectToServer(function (err) {
    //     if(err) console.error(err);
    // });
    console.log(` 
     _||\\/| _._|_|_  
    (_||  |(_| |_| | 
        created by samiti.dev           
    `);

                    
    console.log(`Listening on port ${port}`);
    // console.log("running...");
});

