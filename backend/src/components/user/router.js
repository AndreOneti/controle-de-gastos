const router = require('express').Router();

const { ListUsers, CreateUser, LoginUser, LogoutUser } = require('./controller');

router.get('/', ListUsers);
router.post('/signup', CreateUser);
router.post('/login', LoginUser);
router.get('/logout', LogoutUser);

module.exports = router;
