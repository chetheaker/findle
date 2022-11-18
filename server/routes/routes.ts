const express = require('express')
const router = express.Router();

const { readAll, createMany } = require('./controller')

router.post('/', createMany);

router.get('/', readAll);

module.exports = router;