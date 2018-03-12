const express = require('express')
const groups = require('../data/groupsData')
const groupsRouter = express.Router()


// middlewares


// lectures
groupsRouter.get('/', (req, res) => res.json(groups))


// création


// modification


// suppression


// export
module.exports = groupsRouter