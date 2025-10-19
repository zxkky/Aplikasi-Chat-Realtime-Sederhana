# 💬 Aplikasi Chat Realtime

Aplikasi chat sederhana berbasis **Realtime** yang dibuat menggunakan **Node.js**, **Express**, dan **Socket.io**.  
Pengguna dapat membuat atau bergabung ke dalam ruang obrolan (room), mengirim pesan secara langsung, dan mengunggah file.

---

## 🚀 Fitur Utama

- 🔒 Membuat dan bergabung ke ruang chat dengan kode unik  
- 💬 Pesan dikirim dan diterima secara realtime menggunakan Socket.io  
- 📁 Dapat mengunggah file dalam ruang chat  
- 👤 Setiap pengguna dapat menggunakan nama pengguna (username) sendiri  
- 🧩 Tampilan antarmuka yang sederhana dan responsif menggunakan React + TailwindCSS  

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
|-----------|------------|
| **Frontend** | React, TailwindCSS |
| **Backend** | Node.js, Express |
| **Realtime** | Socket.io |
| **Upload File** | Multer |
| **Deploy (opsional)** | Vercel / Render / cPanel |

---

## ⚙️ Cara Instalasi & Menjalankan

1. **Clone repository**

   ```bash
   git clone https://github.com/username/chat-app.git
   cd chat-app

    Instal semua dependensi

npm install

Jalankan server

npm start

atau jika menggunakan nodemon:

npm run dev

Buka di browser

Kunjungi: 👉 http://localhost:3000

📂 Struktur Folder

chat-app/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
├── package.json
├── README.md
└── .gitignore
