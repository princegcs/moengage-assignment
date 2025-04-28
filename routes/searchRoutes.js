const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', isLoggedIn, searchController.showSearch);
router.post('/filter', isLoggedIn, searchController.search);
router.post('/save', isLoggedIn, searchController.saveList);

module.exports = router;
