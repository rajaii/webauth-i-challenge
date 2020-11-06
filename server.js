const express = require('express');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db =require('./data/db-config.js');
const userDb = require('./data/userHelpers.js');

const sessionOptions = {
    name: 'mycookie',
    secret: 'cookiesareyummy',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createTable: true,
        clearInterval: 1000 * 60 * 60
    })
}
//import jwt and jwt.sign a cookie in the session options
//implement a simple react app with a protected route that displays users from this db, 
//learn how to implement protected route with cookies
//learn how to pull data ie. uID, etc needed for maniped from cookie
//learn anything else to get away from token auth on maniped

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionOptions));

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the webauth challenge loader!</h1>')
})

server.get('/api/users', validate, (req, res) => {
    const { username, password } = req.headers;
    userDb.find()
    .then(u => {
        console.log('in');
        res.status(200).json(u);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})



server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    userDb.add(user)
    .then(userInfo => {
        console.log('in')
        res.status(201).json(userInfo)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.headers;

    if(username && password) {
        userDb.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({message: `welcome ${user.username}`})
            } else {
                res.status(401).json({message: 'you shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'unexpected error'});
        });
    } else {
        res.status(400).json({message: "no credentials provided"})
    }
})



function validate(req, res, next) {
   
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(400).json({ message: 'No credentials provided' });
    }
};


module.exports = server;