const express = require('express');
const { searchBook } = require('../controllers/bookSearch');
const router = express.Router()


router.get('/book-search',searchBook)



module.exports = router;