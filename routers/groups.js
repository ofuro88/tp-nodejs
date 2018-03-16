const express = require('express')
const tools = require('../tools/toolsGroups')
const groups= tools.GetGroups()
const groupsRouter = express.Router()


// middlewares
// vérifie l'éxistence du group
function findGroupAndPutInRequest(req, res, next) {
    const groupIndex = groups.findIndex(
        g => g.id === parseInt(req.params.groupId))
    if (groupIndex !== -1) {
        req.group = groups[groupIndex]
        req.groupIndex = groupIndex
        req.groupId = req.params.groupId
    }
    next()
}

// données non trouvées
function interruptIfNotFound(req, res, next) {
    if (req.group) {
        next()
    } else {
        res.status(404).json({ error: 'Group not found' })
    }
}

// vérifications des données
function validateGroupData(req, res, next) {
    console.log(req.body.members)
    if(req.body && req.body.name && req.body.members === undefined){
        req.groupData = req.body
        next()
    }
    else {
        res.status(400).json({ error: 'Invalid group data' })
    }
}

// lectures
groupsRouter.get('/', (req, res) => res.json(groups))
groupsRouter.get('/:groupId', findGroupAndPutInRequest, interruptIfNotFound,
    (req, res) => res.json(req.group)
)

// création
groupsRouter.post('/', validateGroupData, (req, res) => {
    const group = Object.assign({ id: tools.GetNextGroupId(), name: "" ,members:[] }, req.groupData)
    tools.AddGroup(group)
    res.status(200).json(group)
})

// modification
groupsRouter.put('/:groupId', validateGroupData, findGroupAndPutInRequest, interruptIfNotFound, (req, res) => {
    groups[req.groupIndex] = Object.assign(req.group, req.groupData)
    res.status(200).json(groups[req.groupIndex])
})

// modification différencielle (modifie seulement les champs voulus, n'écrase pas tous les champs)
groupsRouter.patch('/:groupId', validateGroupData, findGroupAndPutInRequest, interruptIfNotFound, (req, res) => {
    Object.assign(groups[req.groupIndex], req.body)
    res.status(200).json(groups[req.groupIndex])
})

// suppression de le groupe (et donc de son id dans les groups)
groupsRouter.delete('/:groupId', findGroupAndPutInRequest, interruptIfNotFound, (req, res) => {
    tools.DeleteGroup(req.groupIndex)
    res.status(204).end()
})


// export
module.exports = groupsRouter