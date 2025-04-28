const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.showSignup = (req, res) => {
  res.render('signup');
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();
  res.redirect('/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send('User not found. Please signup.');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send('Invalid credentials.');
  }

  req.session.userId = user._id;
  res.redirect('/search');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
