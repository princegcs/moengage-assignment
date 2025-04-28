const List = require('../models/List');

exports.showLists = async (req, res) => {
  const lists = await List.find({ userId: req.session.userId });
  res.render('lists', { lists });
};

exports.viewList = async (req, res) => {
  const list = await List.findById(req.params.id);
  res.render('list-details', { list });
};

exports.deleteList = async (req, res) => {
  await List.findByIdAndDelete(req.params.id);
  res.redirect('/lists');
};

exports.showEdit = async (req, res) => {
  const list = await List.findById(req.params.id);
  res.render('edit-list', { list });
};
exports.editList = async (req, res) => {
  const { name } = req.body;
  await List.findByIdAndUpdate(req.params.id, { name });
  res.redirect('/lists');
};
