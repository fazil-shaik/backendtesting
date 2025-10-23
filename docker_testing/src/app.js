// // app.js
// import express from 'express';
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello from Docker!');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Docker!');
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.post('/data', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    res.send(`Received data: ${body}`);
  });   
});

app.listen(3000, () => console.log('Server running on port 3000'));
