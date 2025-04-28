const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

//View all lists
router.get('/', isLoggedIn, listController.showLists);

//View single list
router.get('/:id', isLoggedIn, listController.viewList);

//Delete
router.post('/:id/delete', isLoggedIn, listController.deleteList);

//Edit
router.get('/:id/edit', isLoggedIn, listController.showEdit);
router.post('/:id/edit', isLoggedIn, listController.editList);

module.exports = router;
