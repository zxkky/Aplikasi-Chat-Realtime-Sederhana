const socket = io();

const mainBox = document.getElementById('mainbox');
const loginBox = document.getElementById('loginbox');
const createRoomBox = document.getElementById('createroombox');
const chatBox = document.getElementById('chatbox');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const roomCodeInput = document.getElementById('roomcode');
const loginBtn = document.getElementById('loginbtn');
const createRoomBtn = document.getElementById('createroombtn');
const usernameCreateInput = document.getElementById('username_create');
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const backToMainBtn = document.getElementById('backtomainbtn');
const backToMainBtnCreate = document.getElementById('backtomainbtn_create');
const createRoomViewBtn = document.getElementById('createroomviewbtn');
const joinRoomViewBtn = document.getElementById('joinroomviewbtn');

let username = '';
let roomCode = '';

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

createRoomViewBtn.addEventListener('click', () => {
    hideElement(mainBox);
    showElement(createRoomBox);
});

joinRoomViewBtn.addEventListener('click', () => {
    hideElement(mainBox);
    showElement(loginBox);
});

backToMainBtn.addEventListener('click', () => {
    hideElement(loginBox);
    showElement(mainBox);
});

backToMainBtnCreate.addEventListener('click', () => {
    hideElement(createRoomBox);
    showElement(mainBox);
});

loginBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    roomCode = roomCodeInput.value.trim();
    if (username && roomCode) {
        hideElement(loginBox);
        showElement(chatBox);
        socket.emit('join room', { username, roomCode });
    }
});

createRoomBtn.addEventListener('click', () => {
    username = usernameCreateInput.value.trim();
    if (username) {
        roomCode = Math.random().toString(36).substring(2, 10); // Generate random room code
        hideElement(createRoomBox);
        showElement(chatBox);
        socket.emit('create room', { username, roomCode });

        // Tampilkan alert
        const alertBox = document.getElementById('alertBox');
        const roomCodeText = document.getElementById('roomCodeText');
        roomCodeText.textContent = roomCode;

        alertBox.classList.remove('hidden');
        alertBox.classList.add('block');

        // Sembunyikan alert setelah 3 detik
        setTimeout(() => {
            alertBox.classList.add('hidden');
            alertBox.classList.remove('block');
        }, 3000);
    }
});
const copyCodeBtn = document.getElementById('copyCodeBtn');

copyCodeBtn.addEventListener('click', () => {
    const roomCodeText = document.getElementById('roomCodeText').textContent;
    navigator.clipboard.writeText(roomCodeText).then(() => {
        // Ganti teks tombol sementara untuk menunjukkan bahwa kode telah disalin
        copyCodeBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyCodeBtn.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value && username && roomCode) {
        socket.emit('chat message', { username, roomCode, message: input.value });
        input.value = '';
    }
});

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (fileInput.files.length > 0 && username && roomCode) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileUrl = event.target.result;
            const fileType = file.type;

            socket.emit('chat file', { username, roomCode, fileUrl, fileType });

            // Reset the form after sending the file
            fileInput.value = '';
        };

        reader.readAsDataURL(file);
    }
});

socket.on('chat message', function({ username, message }) {
    const item = document.createElement('div');
    item.textContent = `${username}: ${message}`;
    item.classList.add('p-2', 'bg-gray-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('chat file', function({ username, fileUrl, fileType }) {
    const item = document.createElement('div');
    if (fileType.startsWith('image/')) {
        item.innerHTML = `${username}: <img src="${fileUrl}" class="chat-file" />`;
    } else {
        item.innerHTML = `${username}: <a href="${fileUrl}" download>Download file</a>`;
    }
    item.classList.add('p-2', 'bg-gray-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('user joined', function(username) {
    const item = document.createElement('div');
    item.textContent = `${username} joined the chat`;
    item.classList.add('p-2', 'bg-green-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('user left', function(username) {
    const item = document.createElement('div');
    item.textContent = `${username} left the chat`;
    item.classList.add('p-2', 'bg-red-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

function toggleImageSize(image) {
    if (image.classList.contains('full-size')) {
        image.classList.remove('full-size');
    } else {
        image.classList.add('full-size');
    }
}

// Event listener for clicking on images
document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'IMG' && clickedElement.classList.contains('chat-file')) {
        toggleImageSize(clickedElement);
    }
});
