const jwt = require('jsonwebtoken');
const secret = 'This is not my secret!';

const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, secret, (err, decodedToken) => {
      err ? res.status(401).json({ message: 'Invalid token!' }) : next();
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, secret, (err, decodedToken) => {
      !decodedToken.admin
        ? res
            .status(403)
            .json({ message: 'You have no permission to access this data!' })
        : next();
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

const isValidEmail = (req, res, next) => {
  req.body.email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? next()
    : res.status(400).json({
        message: 'Invalid email account, please verify your data and try again!'
      });
};

module.exports = { isLoggedIn, isAdmin, isValidEmail };
