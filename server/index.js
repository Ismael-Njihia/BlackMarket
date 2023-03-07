
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
    password: 'David001@',
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
    accounType VARCHAR(10) NOT NULL,
    PRIMARY KEY (username)
)`;

connection.query(createDb, (err, result)=>{
    if(err){
        throw err
    } 
    console.log(result);
})

//Enable cors
app.use(cors({
    origin: 'http://localhost:5174',
}))

//handle post request to signup

//middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/signup', (req, res)=>{
    const { firstname, lastname, email, password} = req.body;
    //check if required fielsd are present

    if(!firstname || !lastname || !email || !password){
        res.status(400).send("Missing required fields")
        return;
    }

    if(!validateEmail(email)){
        res.status(400).send("Invalid email")
        return;
    }
    //check if the user exists using the email adress
   const sqlselect = `SELECT * FROM users where email ='${email}'`;

   connection.query(sqlselect, (err, rows)=>{
    if(err){
        console.error("Error selecting user: ",  err.message);
        res.status(500).send("Error selecting user");
        return;
    }

    if(rows.length > 0){
        res.status(409).send("User already exists with this Email");
        return;
    }
   })

    ///generate a random 6 digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    
    //Create a username by combining first name and random number
    const username = `${firstname}${randomNumber}`;
    const accounType = 'Basic'

    const sqlInsert = `INSERT INTO users (username, firstname, lastname, email, password, accounType) VALUES ('${username}','${firstname}','${lastname}','${email}','${password}', '${accounType}')`;
    

    connection.query(sqlInsert, (err, result)=>{
            if(err){
                console.error("Error inserting user: ", err.message);
                res.status(500).send("Error inserting user");
                return;
            }
            console.log("User inserted successfully");
            res.status(200).send("User inserted successfully");
           
    })

})  
//validate Email

function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



//listen to the port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});