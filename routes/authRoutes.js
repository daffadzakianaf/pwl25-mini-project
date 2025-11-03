import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();

//  REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User berhasil didaftarkan' });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

//  LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ message: 'User tidak ditemukan' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    // Buat token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

export default router;
