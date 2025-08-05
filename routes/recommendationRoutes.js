const express = require('express');
const router = express.Router();

const { getDynamicRecommendations } = require('../controllers/recommendationController');


router.post('/', getDynamicRecommendations);

module.exports = router;
