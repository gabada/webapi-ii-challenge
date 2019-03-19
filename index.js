const express = require('express');
const db = require('./data/db.js');

const postRoutes = require('./posts/postRoutes');

const port = 5000;
const server = express();

server.use(express.json());
server.use('/api/posts', postRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
