let express = require('express');
let movie = require('../controls/movie');
let api = require('../api');


let router = express.Router();
router.get(api.movieList,movie.fetchAll);
router.get(api.movieDetail,movie.getById);
router.get(api.movieTop,movie.getTop);
router.get(api.movieTopScore,movie.getTopScore);




module.exports = router;