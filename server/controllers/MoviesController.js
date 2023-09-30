import asyncHandle from 'express-async-handler';
import Movie from '../models/MoviesModel.js';
import { movies } from '../data/movie.js';
import { moviesCate } from '../data/movieCate.js';

//////////// PUBLIC
// IMPORT DATA: POST /api/movies/import
export const importMovies = asyncHandle(async (req, res, next) => {
    try {
        // làm trống hết các bảng movie
        await Movie.deleteMany();
        // thêm movie vào DB
        // const movieList = await Movie.insertMany(movies);
        const movieList = await Movie.insertMany(moviesCate);
        res.status(200).json(movieList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL MOVIES : GET /api/movies
// export const getMovies = asyncHandle(async (req, res, next) => {
//     try {
//         // lọc theo category, time , language, rate year và search
//         const { category, time, language, rate, year, search } = req.query;

//         let query = {
//             ...(category && { category }),
//             ...(time && { time }),
//             ...(language && { language }),
//             ...(rate && { rate }),
//             ...(year && { year }),
//             ...(search && { name: { $regex: search, $options: 'i' } }),
//         };

//         // phân trang và load thêm
//         const page = Number(req.query.page) || 1; // mặc định trang đầu tiên nếu không yêu cầu page
//         const limit = 8; // 8 movie 1 page
//         const skip = (page - 1) * limit; // bỏ qua 4 movie 1 page

//         // find movie theo query , limit
//         const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

//         // lấy số lượng movie tìm thấy
//         const count = await Movie.countDocuments(query);

//         // gửi res về client
//         res.status(200).json({
//             totalMovie: count, // tổng số movie tìm được
//             page, // trang thứ bao nhiêu
//             pages: Math.ceil(count / limit), // tổng số trang tìm được
//             movies,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

export const getMovies = asyncHandle(async (req, res, next) => {
    try {
        const { category, time, language, rate, year, search } = req.query;
        const requestedCategories = category ? category.split(',') : [];

        // Tạo điều kiện tìm kiếm danh mục
        const categoryQuery =
            requestedCategories.length > 0 ? { category: { $elemMatch: { name: { $in: requestedCategories } } } } : {};

        // Tạo truy vấn chung cho các điều kiện khác
        const query = {
            ...categoryQuery,
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: 'i' } }),
        };

        // Phân trang và load thêm
        const page = Number(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        // Tìm các bộ phim thỏa mãn truy vấn
        const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

        // Lấy tổng số bộ phim tìm thấy
        const count = await Movie.countDocuments(query);

        res.status(200).json({
            totalMovie: count,
            page,
            pages: Math.ceil(count / limit),
            movies,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET MOVIE BY ID : GET : /api/movies/:id
export const getMovieById = asyncHandle(async (req, res, next) => {
    try {
        // tìm movie trong DB
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404);
            throw new Error('Movie not found');
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET MOVIE BY CATEGORY : GET : /api/movies/category
export const getAllMovie = asyncHandle(async (req, res, next) => {
    try {
        // tìm movie trong DB
        const movies = await Movie.find();
        if (!movies) {
            res.status(404);
            throw new Error('Movie not found');
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET MOVIE TOP RATED : GET : /api/movies/rated
export const getMovieRated = asyncHandle(async (req, res, next) => {
    try {
        // tìm movie trong DB và sắp xếp theo rate
        const movies = await Movie.find().sort({ rate: -1 });

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET RANDOM MOVIE  : GET : /api/movies/random
export const getRandomMovie = asyncHandle(async (req, res, next) => {
    try {
        // tìm movie trong DB và sắp xếp theo rate
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//////////// PRIVATE USER
// CREATE REVIEW : POST api/movies/:id/reviews
export const createMovieReview = asyncHandle(async (req, res, next) => {
    try {
        //tìm movie trong DB
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            res.status(404);
            throw new Error('Movie not found');
        }
        // kiểm tra xem user đã review phim đó chưa
        const isReviewed = movie.review.find((r) => r.userId.toString() === req.user._id.toString());
        // nếu đã reviews thì gửi lỗi
        if (isReviewed) {
            return res.status(400).json({ error: 'You already reviewed this movie' });
            // throw new Error('You already reviewed this movie');
        }
        // else tạo 1 review mới
        const review = {
            userId: req.user._id,
            userName: req.user.fullName,
            userImage: req.user.image,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        // push review vào mảng reviews
        movie.review.push(review);
        // tăng số lượng review
        movie.numberOfReview = movie.review.length;
        // tính lại số lượng rate
        movie.rate = movie.review.reduce((acc, cur) => cur.rating + acc, 0) / movie.review.length;
        //lưa vào DB
        await movie.save();

        res.status(200).json('Review added!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//////////// PRIVATE ADMIN
// UPDATE MOVIE : PUT api/movies/:id
export const updatedMovie = asyncHandle(async (req, res, next) => {
    const { name, overview, titleImage, image, category, language, year, time, video, rate, numberOfReview, casts } = req.body;
    try {
        // tìm movie trong DB
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404);
            throw new Error('Movie not found');
        }
        // update movie
        movie.name = name || movie.name;
        movie.overview = overview || movie.overview;
        movie.titleImage = titleImage || movie.titleImage;
        movie.image = image || movie.image;
        movie.category = category || movie.category;
        movie.language = language || movie.language;
        movie.year = year || movie.year;
        movie.time = time || movie.time;
        movie.video = video || movie.video;
        movie.rate = rate || movie.rate;
        movie.numberOfReview = numberOfReview || movie.numberOfReview;
        movie.casts = casts || movie.casts;

        // save vào DB
        const updateMovie = await movie.save();
        res.status(201).json(updateMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE MOVIE : DELETE api/movies/:id
export const deletedMovie = asyncHandle(async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json('Movie deleted !');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE ALL MOVIE : DELETE api/movies/
export const deleteAllMovie = asyncHandle(async (req, res, next) => {
    try {
        await Movie.deleteMany();
        res.status(200).json('All Movie deleted !');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE MOVIE : POST api/movies/:id
export const createMovie = asyncHandle(async (req, res, next) => {
    const { name, overview, titleImage, image, category, language, year, time, video, rate, numberOfReview, casts } = req.body;
    try {
        // create movie
        const movie = new Movie({
            userId: req.user._id,
            name,
            overview,
            titleImage,
            image,
            category: category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReview,
            casts: casts,
        });
        if (!movie) {
            res.status(400);
            throw new Error('Invalid movie data');
        }

        // save vào DB
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
