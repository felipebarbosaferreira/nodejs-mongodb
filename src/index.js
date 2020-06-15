const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const port = 3333;

const TaskRoutes = require('./routes/TaskRoutes');

server.use('/task', TaskRoutes);

server.listen(port, () => {
    console.log('API Online na porta: ', port);
});