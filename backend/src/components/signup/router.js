const router = require('express').Router();

const { GetRoute, PostRoute } = require('./controller');

router.get('/', GetRoute);
router.post('/', PostRoute);

module.exports = router;
