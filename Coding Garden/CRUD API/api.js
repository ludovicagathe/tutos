const express = require('express');
const faqs = require('./faqs');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "hello"
  });
});

router.use('/faqs', faqs);

module.exports = router;
