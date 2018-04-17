const express = require('express')
const send = require('../utils/send')
const polRouter = express.Router()

polRouter.get('/', send)
polRouter.get('/fuzzy', send)

module.exports = polRouter