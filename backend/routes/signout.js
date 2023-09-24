const router = require('express').Router();

const { signOut } = require('../controllers/users');

router.delete('/signout', signOut);

module.exports = router;
