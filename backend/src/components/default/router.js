const router = require('express').Router();

const { GetRoute } = require('./controller/index');

router.get('/', GetRoute);

module.exports = router;
