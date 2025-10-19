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
## ⚙️ Cara Menjalankan Aplikasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/zxkky/Aplikasi-Chat-Realtime-Sederhana.git
cd Aplikasi-Chat-Realtime-Sederhana
```
###2️⃣ Install Dependencies

Pastikan Node.js sudah terpasang di komputer kamu, lalu jalankan:

```bash
npm install
```

###3️⃣ Jalankan Aplikasi

Kamu bisa menjalankan aplikasi dengan dua cara:

**Mode Normal**

```bash
npm start
```

**Mode Pengembangan (dengan nodemon)**
```bash
npm run dev
```
###4️⃣ Buka di Browser

Setelah server berjalan, buka link berikut:
```bash
http://localhost:3000
```
---
📂 Struktur Folder
---
```pgsql
Aplikasi-Chat-Realtime-Sederhana/
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
```
