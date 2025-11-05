const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Đăng ký người dùng mới
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('Người dùng đã được tạo thành công');
  } catch (error) {
    res.status(400).send('Lỗi khi tạo người dùng: ' + error.message);
  }
});

// Lấy danh sách người dùng
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;