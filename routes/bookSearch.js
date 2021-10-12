const express = require('express');
const { searchBook } = require('../controllers/bookSearch');
const { requiresignin } = require('../middlewares/authentication');
const router = express.Router()


router.get('/book-search',requiresignin,searchBook)



module.exports = router;