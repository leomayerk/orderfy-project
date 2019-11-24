const express = require('express');
const router = express.Router();
const handlers = require('./handlers')
const auth =  require('../../middlewares/auth')


router.get('/', auth, handlers.list);
router.post('/', auth, handlers.create);
router.put('/ ', auth,  handlers.update);

module.exports = router;