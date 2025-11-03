import * as Movie from '../models/movieModel.js';

export async function listMovies(req, res, next) {
  try {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  } catch (err) { next(err); }
}

export async function getMovie(req, res, next) {
  try {
    const movie = await Movie.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) { next(err); }
}

export async function createNewMovie(req, res, next) {
  console.log("Body dari request:", req.body);
  try {
    const newMovie = await Movie.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
}


export async function editMovie(req, res, next) {
  try {
    const updated = await Movie.updateMovie(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function removeMovie(req, res, next) {
  try {
    const deleted = await Movie.deleteMovie(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) { next(err); }
}
