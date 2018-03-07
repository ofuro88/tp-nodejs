const express = require('express')
var { persons, nextPersonId } = require('./data/personsData')
const personsRouter = express.Router()

// middlewares
// données trouvées
function findPersonAndPutInRequest(req, res, next) {
    const personIndex = persons.findIndex(
        p => p.id === parseInt(req.params.personId))
    if (personIndex !== -1) {
        req.person = persons[personIndex]
        req.personIndex = personIndex
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
    const personData = req.body
    if(personData && personData.firstName && personData.lastName && personData.numbers){
        req.personData = personData
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
    const person = Object.assign({ id: nextPersonId }, req.personData)
    nextPersonId++
    persons.push(person)
    res.status(201).json(person)
})

// modification
personsRouter.put('/persons/:personId', validateCarDataInRequestBody, interruptIfNotFound, (req, res) => {
    const person = Object.assign(req.person, req.personData)
    res.status(200).json(person)
})

// modification différencielle (modifie seulement les champs voulus, n'écrase pas tous les champs)
personsRouter.patch('/persons/:personId', findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    const person = Object.assign(req.person, req.personData);
    res.status(200).json(person)
})


// suppression
personsRouter.delete('/persons/:personId', findPersonAndPutInRequest, interruptIfNotFound, (req, res) => {
    persons.splice(req.personIndex, 1)
    res.status(204).end()
})


// export
module.exports = personsRouter