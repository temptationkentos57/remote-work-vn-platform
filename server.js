const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/remoteWorkVN';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB: ' + mongoURI))
  .catch(err => console.error('Connection error to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Remote Work Platform in Vietnam!');
});

io.on('connection', (socket) => {
  console.log('A user has connected');
  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});