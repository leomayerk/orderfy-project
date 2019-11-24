const express = require('express');
const router = express.Router();
const handlers = require('./handlers')
const auth =  require('../../middlewares/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files')
    },
    filename: function(req, file, cb, next) {
        cb(null, Date.now() + '_' + req.credentials._id + '_' + file.originalname)
    }
})

const upload = multer({storage});

router.get('/', auth, handlers.list);
router.post('/', auth, upload.single('anexo'), handlers.create);
router.put('/ ', auth,  handlers.update);

module.exports = router;