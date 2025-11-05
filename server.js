const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/remoteWorkVN', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối đến MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối tới MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Chào mừng đến với Nền Tảng Làm Việc Từ Xa Việt Nam!');
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
