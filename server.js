const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Kết nối đến MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/remoteWorkVN';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối thành công đến MongoDB: ' + mongoURI))
  .catch(err => console.error('Lỗi kết nối tới MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Remote Work Platform in Vietnam!');
});

io.on('connection', (socket) => {
  console.log('Một người dùng đã kết nối');
  socket.on('disconnect', () => {
    console.log('Một người dùng đã ngắt kết nối');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});