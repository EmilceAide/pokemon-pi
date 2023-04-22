const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(morgan('dev'));

module.exports = server; 