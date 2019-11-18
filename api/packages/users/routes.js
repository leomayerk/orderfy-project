const express = require('express');
const router = express.Router();

const handlers = require('./handlers')


router.get('/', handlers.list);
router.post('/', handlers.create);
router.post('/login', handlers.login);

module.exports = router;