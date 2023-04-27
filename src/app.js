const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes')

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
server.use(morgan('dev'));
server.use(router)


module.exports = server; 