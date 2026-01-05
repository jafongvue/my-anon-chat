const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// ລະບົບຮັບການເຊື່ອມຕໍ່
io.on('connection', (socket) => {
  // ສ້າງຊື່ສົມມຸດໃຫ້ຜູ້ໃຊ້ແບບສຸ່ມ (ຕົວຢ່າງ: User 123)
  const anonymousName = "User-" + Math.floor(Math.random() * 1000);
  console.log(anonymousName + ' ເຂົ້າມາໃນຫ້ອງແຊັດ');

  // ເມື່ອມີຂໍ້ຄວາມສົ່ງມາ
  socket.on('chat message', (msg) => {
    // ສົ່ງຂໍ້ຄວາມນັ້ນໄປໃຫ້ທຸກໆຄົນໃນຫ້ອງ
    io.emit('chat message', { name: anonymousName, text: msg });
  });

  socket.on('disconnect', () => {
    console.log(anonymousName + ' ອອກຈາກຫ້ອງແຊັດ');
  });
});

http.listen(3000, () => {
  console.log('Server ກຳລັງເຮັດວຽກຢູ່ http://localhost:3000');
});