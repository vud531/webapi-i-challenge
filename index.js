// implement your API here

const express = require('express');

const DB = require('./data/db.js')

const server = express();



server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
  });