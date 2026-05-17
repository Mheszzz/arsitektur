const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk membaca data dari input HTML form (POST)
app.use(express.urlencoded({ extended: true }));

// Array di memori server untuk menyimpan catatan
let notes = ["Belajar Infrastruktur TI", "Deploy ke Vercel sukses"];

app.get('/', (req, res) => {
    // Generasi list catatan secara dinamis dari server
    let listItems = notes.map((note, index) => `
        <li>
            <span>${note}</span>
            <a href="/delete/${index}" style="background-color: #e74c3c; color: white; text-decoration: none; padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: bold;">Hapus</a>
        </li>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notes App - Versi Node.js (Express)</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; display: flex; justify-content: center; }
                .container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); width: 100%; max-width: 400px; text-align: center; }
                h1 { color: #333; margin-bottom: 20px; font-size: 24px; }
                form { display: flex; gap: 10px; margin-bottom: 20px; }
                input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
                button { background-color: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                button:hover { background-color: #2980b9; }
                ul { list-style: none; padding: 0; text-align: left; }
                li { background: #f9f9f9; padding: 12px; border-radius: 6px; margin-bottom: 8px; border-left: 5px solid #3498db; display: flex; justify-content: space-between; align-items: center; font-size: 15px; }
                .tag { font-size: 11px; color: #7f8c8d; display: block; margin-top: 15px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Notes App (Node.js Express)</h1>
                <form action="/add" method="POST">
                    <input type="text" name="note" placeholder="Tulis catatan server baru..." required>
                    <button type="submit">Tambah</button>
                </form>
                <ul>${listItems}</ul>
            </div>
        </body>
        </html>
    `);
});

// Route untuk menambah catatan ke array server
app.post('/add', (req, res) => {
    const newNote = req.body.note;
    if (newNote && newNote.trim() !== '') {
        notes.push(newNote.trim());
    }
    res.redirect('/');
});

// Route untuk menghapus catatan dari array server berdasarkan indeks
app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < notes.length) {
        notes.splice(id, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});