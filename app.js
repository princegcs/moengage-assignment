const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Mongo error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));


const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const listRoutes = require('./routes/listRoutes');

app.use('/', authRoutes);
app.use('/search', searchRoutes);
app.use('/lists', listRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
