const express = require('express')
const app = express()
// router
const groupsRouter = express.Router()

// ---------------------- GROUPS ---------------------------
// groupes
let nextGroupId = 0
const groups = [
    { id: nextGroupId++, name: 'collaborator', members: [1, 2, 3, 4] },
    { id: nextGroupId++, name: 'friends', members: [1, 4, 5, 6] }
]

// middlewares


// lectures
groupsRouter.get('/', (req, res) => res.json(groups))


// création


// modification


// suppression


// export
module.exports = groupsRouter