// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;

// const cloudinary = require('cloudinary').v2;

//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// console.log('Cloudinary config:', cloudinary.config());
//   module.exports = cloudinary;

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'dt2nr7rjg', // Replace with actual value
//   api_key: '489477363115884',      // Replace with actual value
//   api_secret: 'DyTrweC1_Bp9OxFYL3vRpJyGKBw', // Replace with actual value
// });

// console.log('Cloudinary config:', cloudinary.config());

// module.exports = cloudinary;

// config.js

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary config:', cloudinary.config());

module.exports = { cloudinary };