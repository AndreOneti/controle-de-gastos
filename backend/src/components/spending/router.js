const router = require('express').Router();

const { ListSpending, RegisterSpending, DeleteSpending } = require('./controller');

router.get('/', ListSpending);
router.post('/register', RegisterSpending);
router.delete('/:id', DeleteSpending);

module.exports = router;
