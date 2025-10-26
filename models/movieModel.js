import pool from '../config/db.js';

export async function getAllMovies() {
  const [rows] = await pool.query('SELECT * FROM movies');
  return rows;
}

export async function getMovieById(id) {
  const [rows] = await pool.query('SELECT * FROM movies WHERE id = ?', [id]);
  return rows[0];
}

export async function createMovie(movie) {
  const { title, genre, director, release_date, rating } = movie;
  const [result] = await pool.query(
    'INSERT INTO movies (title, genre, director, release_date, rating) VALUES (?, ?, ?, ?, ?)',
    [title, genre, director, release_date, rating]
  );
  return { id: result.insertId, ...movie };
}

export async function updateMovie(id, movie) {
  const { title, genre, director, release_date, rating } = movie;
  await pool.query(
    'UPDATE movies SET title=?, genre=?, director=?, release_date=?, rating=? WHERE id=?',
    [title, genre, director, release_date, rating, id]
  );
  return getMovieById(id);
}

export async function deleteMovie(id) {
  const [result] = await pool.query('DELETE FROM movies WHERE id=?', [id]);
  return result.affectedRows;
}
