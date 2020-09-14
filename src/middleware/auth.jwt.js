const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign(user,process.env.TOKEN_SECRET,{ expiresIn: '1d' });
  return token;
}

module.exports = {
  createToken
}