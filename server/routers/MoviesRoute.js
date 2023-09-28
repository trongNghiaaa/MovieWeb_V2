import express from 'express';
import { admin, protect } from '../middleware/Auth.js';
import {
    createMovie,
    createMovieReview,
    deleteAllMovie,
    deletedMovie,
    getAllMovie,
    getMovieById,
    getMovieRated,
    getMovies,
    getRandomMovie,
    importMovies,
    updatedMovie,
} from '../controllers/MoviesController.js';

const router = express.Router();

// public
router.post('/import', importMovies);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/all/movies', getAllMovie);
router.get('/rated/top', getMovieRated);
router.get('/random/all', getRandomMovie);

// private : user
router.post('/:id/review', protect, createMovieReview);

// private : admin
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updatedMovie);
router.delete('/:id', protect, admin, deletedMovie);
router.delete('/', protect, admin, deleteAllMovie);

export default router;
