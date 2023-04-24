const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes')

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(morgan('dev'));
server.use(router)

module.exports = server; 