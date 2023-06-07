const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';

const token = jwt.sign({ username: 'user1' }, secret, { expiresIn: '1h' });

console.log("Token is --> "+token);
