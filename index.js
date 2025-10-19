const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('create room', ({ username, roomCode }) => {
        socket.join(roomCode);
        socket.username = username;
        socket.roomCode = roomCode;
        io.to(roomCode).emit('user joined', username);
    });

    socket.on('join room', ({ username, roomCode }) => {
        socket.join(roomCode);
        socket.username = username;
        socket.roomCode = roomCode;
        io.to(roomCode).emit('user joined', username);
    });

    socket.on('chat message', ({ username, roomCode, message }) => {
        io.to(roomCode).emit('chat message', { username, message });
    });

    socket.on('chat file', ({ username, roomCode, fileUrl, fileType }) => {
        io.to(roomCode).emit('chat file', { username, fileUrl, fileType });
    });

    socket.on('disconnect', () => {
        if (socket.username && socket.roomCode) {
            io.to(socket.roomCode).emit('user left', socket.username);
        }
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});