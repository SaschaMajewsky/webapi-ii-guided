const express = require('express');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.use('/hubs', hubsRouter);

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
