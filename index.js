const express = require('express');
const cors = require('cors');

const postsRouter = require('./routes/postsRoutes');

const server = express();
server.use(express.json());
server.use(cors());

const port = 5000;

server.use('/api/posts', postsRouter);

server.listen(port, () => {
    console.log("Server listening...");
})