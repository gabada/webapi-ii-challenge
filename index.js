const express = require('express');
const cors = require('cors');
const postRoutes = require('./posts/postRoutes');

const port = 5000;
const server = express();

server.use(express.json(), cors());
server.use('/api/posts', postRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
