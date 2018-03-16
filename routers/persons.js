const express = require('express')
const personsRouter = express.Router()
const tools = require('../tools/toolsPersons')
const toolsGroups = require('../tools/toolsGroups')
var persons = tools.GetPersons()
var groups = toolsGroups.GetGroups()

// middlewares
// cherche une personne
function findPersonAndPutInRequest(req, res, next) {
    const personIndex = persons.findIndex(
        p => p.id === parseInt(req.params.personId))
    if (personIndex !== -1) {
        req.person = persons[personIndex]
        req.personIndex = personIndex
        req.personId = req.params.personId
    }
    next()
}

// cherche une personne dans un groupe en particulier
function findPersonInGroup(req, res, next){
    for(let i = 0; i<groups[req.groupIndex].members.length; i++){
        if(parseInt(groups[req.groupIndex].members[i]) === parseInt(req.personId)) {
            req.personInGroupIndex = i
        }
    }
    next()
}

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
    if (req.person) {
        next()
    } else {
        res.status(404).json({ error: 'Person not found' })
    }
}

function interruptIfNotInGroup(req, res, next) {
    if (req.personInGroupIndex !== undefined) {
        next()
    } else {
        res.status(404).json({ error: 'Person not found in this group' })
    }
}

function interruptIfNoGroup(req, res, next) {
    if (req.group) {
        next()
    } else {
        res.status(404).json({ error: 'Group not found' })
    }
}

// vérifications des données
function validatePersonData(req, res, next) {
    if(req.body && req.body.firstName && req.body.lastName && req.body.numbers){
        req.personData = req.body
        next()
    }
    else {
        res.status(400).json({ error: 'Invalid person data' })
    }
}

// ----------------- routes -------------------

// lectures
personsRouter.get('/', (req, res) => res.json(persons))
personsRouter.get('/:personId', findPersonAndPutInRequest, interruptIfNotFound,
    (req, res) => res.json(req.person)
)

// création
personsRouter.post('/', validatePersonData, (req, res) => {
    const person = Object.assign({ id: tools.GetNextPersonId() }, req.personData)
    tools.AddPerson(person)
    res.status(201).json(person)
})

// modification
personsRouter.put('/:personId', validatePersonData, findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    persons[req.personIndex] = Object.assign(req.person, req.personData)
    res.status(200).json(persons[req.personIndex])
})

// modification différencielle (modifie seulement les champs voulus, n'écrase pas tous les champs)
personsRouter.patch('/:personId', findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    Object.assign(persons[req.personIndex], req.body)
    res.status(200).json(persons[req.personIndex])
})

// suppression de la personne (et donc de son id dans les groups)
personsRouter.delete('/:personId', findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    tools.DeletePersonOnGroups(req.personIndex, req.personId)
    res.status(204).end()
})

// retire la personne d'un groupe
personsRouter.delete('/:personId/groups/:groupId', findPersonAndPutInRequest, interruptIfNotFound, findGroupAndPutInRequest, interruptIfNoGroup, findPersonInGroup, interruptIfNotInGroup, (req, res) => {
    tools.DeletePersonFromGroup(req.groupIndex, req.personInGroupIndex)
    res.status(204).end()
})

// ajoute la personne dans un groupe
personsRouter.post('/:personId/groups/:groupId', findPersonAndPutInRequest, interruptIfNotFound, findGroupAndPutInRequest, interruptIfNoGroup, findPersonInGroup, (req, res) => {
    if (req.personInGroupIndex) {
        res.status(404).json({ error: 'Person already in this group' })
    }
    else {
        tools.AddPersonInGroup(req.groupIndex, req.personId)
        res.status(201).json(req.group)
    }
})

// export
module.exports = personsRouter