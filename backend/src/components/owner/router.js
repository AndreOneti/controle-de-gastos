const router = require('express').Router();

const { ListOwners, RegisterOwner, DeleteOwner } = require('./controller');

router.get('/', ListOwners);
router.post('/register', RegisterOwner);
router.delete('/:id', DeleteOwner);

module.exports = router;
