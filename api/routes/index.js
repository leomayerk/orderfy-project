const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    return res.send({ message: "essa info é  muito importante" });
});

router.post('/', auth, (req, res) => {
    return res.send({ message: "tudo ok com o post" });
})

module.exports = router;