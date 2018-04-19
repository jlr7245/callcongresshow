const express = require('express')
const send = require('../utils/send')

const { index, state } = require('./controller')

const polRouter = express.Router()

polRouter.get('/', index, send)
polRouter.get('/fuzzy', send)

polRouter.get('/:state', state, send)

module.exports = polRouter
