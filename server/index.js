const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


//Create a connection Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7507',
    database: 'BlackMarket'
});

//Connect to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//create a table if doesn't exist
const createDb = `CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
)`;

connection.query(createDb, (err, result)=>{
    if(err){
        throw err
    } 
    console.log(result);
})

//handle post request to signup

//middleware to parse request body
app.use(bodyParser.json());

app.post('/signup', (req, res)=>{
    const { firstname, lastname, email, password} = req.body;

    ///generate a random 6 digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    
    //Create a username by combining first name and random number
    const username = `${firstName}${randomNumber}`;

    const sqlInsert = `INSERT INTO users (username, firstname, lastname, email, password) VALUES ('${username}','${firstname}','${lastname}','${email}','${password}')`;
    

    connection.query(sqlInsert, (err, result)=>{
            if(err){
                console.error("Error inserting user: ", + err.message);
                res.status(500).send("Error inserting user");
                return;
            }
            console.log("User inserted successfully");
            res.status(200).send("User inserted successfully");
            res.send(`User inserted successfully : ${username}`);
    })

})  



//listen to the port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});