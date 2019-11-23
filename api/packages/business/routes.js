const express = require('express');
const router = express.Router();
const handlers = require('./handlers')


router.get('/', handlers.list);
router.post('/', handlers.create);
router.put('/update ', handlers.update);

module.exports = router;