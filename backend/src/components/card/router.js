const router = require('express').Router();

const { ListCards, RegisterCard, DeleteCard } = require('./controller');

router.get('/', ListCards);
router.post('/register', RegisterCard);
router.delete('/:id', DeleteCard);

module.exports = router;
