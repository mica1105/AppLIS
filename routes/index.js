var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
  error
  res.render('error', { title: 'Express' });
});

module.exports = router;
