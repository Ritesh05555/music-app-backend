// generateHash.js
const bcrypt = require('bcryptjs');

const plainPassword = '5';
const hash = bcrypt.hashSync(plainPassword, 10); // 10 is the salt rounds
console.log('Bcrypt Hash for "admin123":', hash);
