export default function validate(req, res, next) {
  const body = req.body || {}; // ✅ hindari error kalau undefined
  const { title, genre, release_date, rating } = body;

  if (!title || !genre || !release_date || rating === undefined) {
    return res.status(400).json({ message: 'Semua field wajib diisi!' });
  }

  next();
}
