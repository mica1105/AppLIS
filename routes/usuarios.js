var express = require('express');
var router = express.Router();
var personalController = require('../controllers/personal');

/* GET users listing. */
router.get('/', personalController.listar);

module.exports = router;
