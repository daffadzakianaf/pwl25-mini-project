import express from 'express';
import {
  listMovies,
  getMovie,
  createNewMovie,
  editMovie,
  removeMovie
} from '../controllers/movieController.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', listMovies);
router.get('/:id', getMovie);
router.post('/', validate, createNewMovie);
router.put('/:id', validate, editMovie);
router.delete('/:id', removeMovie);

export default router;
