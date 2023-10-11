const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res, next) => {
  res.json({
    message: 'Welcome to API!!!',
  });
});

app.post('/api/post', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res, next) => {
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
  };
  jwt.sign({ user }, 'secretkey', { expiresIn: '60s' }, (err, token) => {
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.listen(5001, () => console.log('server started at port 5000'));
