const express = require('express')
const personsRouter = express.Router()
const tools = require('../tools/toolsPersons')
var persons = tools.GetPersons()

// middlewares
// données trouvées
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

// données non trouvées
function interruptIfNotFound(req, res, next) {
    if (req.person) {
        next()
    } else {
        res.status(404).json({ error: 'Person not found' })
    }
}

// vérifications des données
function validatePersonData(req, res, next) {
    // console.log(req.body)
    if(req.body && req.body.firstName && req.body.lastName && req.body.numbers){
        req.personData = req.body
        next()
    }
    else {
        res.status(400).json({ error: 'Invalid person data' })
    }
}

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

// suppression
personsRouter.delete('/:personId', findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    tools.DeletePersonOnGroups(req.personIndex, req.personId)
    res.status(204).end()
})


// export
module.exports = personsRouter