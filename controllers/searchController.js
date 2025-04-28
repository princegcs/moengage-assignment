const List = require('../models/List');

const validCodes = [
    100, 101, 102,103,
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
  300, 301, 302, 303, 304, 305, 307, 308,
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
  410, 411, 412, 413, 414, 415, 416, 417, 418, 421,
  422, 423, 424, 425, 426, 428, 429, 431, 451,
  500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
];


exports.showSearch = (req, res) => {
  res.render('search', { images: [] });
};


exports.search = (req, res) => {
  const { code } = req.body;
  let images = [];

  if (code.includes('xx')) {
    const prefix = code[0];
    const filteredCodes = validCodes.filter(c => c.toString().startsWith(prefix));

    filteredCodes.forEach(c => {
      images.push(`https://http.dog/${c}.jpg`);
    });
  } 
  else if (code.includes('x')) {
    const prefix = code.slice(0, 2);
    for (let i = 0; i <= 9; i++) {
      const complete = `${prefix}${i}`;
      images.push(`https://http.dog/${complete}.jpg`);
    }
  } 
  else {
    images.push(`https://http.dog/${code}.jpg`);
  }

  res.render('search', { images, code });
};


exports.saveList = async (req, res) => {
  const { name, code } = req.body;
  let responseCodes = [];
  let imageLinks = [];

  if (code.includes('xx')) {
    const prefix = code[0];
    const filteredCodes = validCodes.filter(c => c.toString().startsWith(prefix));

    filteredCodes.forEach(c => {
      responseCodes.push(c.toString());
      imageLinks.push(`https://http.dog/${c}.jpg`);
    });
  } 
  else if (code.includes('x')) {
    const prefix = code.slice(0, 2);
    for (let i = 0; i <= 9; i++) {
      const complete = `${prefix}${i}`;
      responseCodes.push(complete);
      imageLinks.push(`https://http.dog/${complete}.jpg`);
    }
  } 
  else {
    responseCodes.push(code);
    imageLinks.push(`https://http.dog/${code}.jpg`);
  }

  const list = new List({
    name,
    responseCodes,
    imageLinks,
    userId: req.session.userId
  });

  await list.save();
  res.redirect('/lists');
};
