const express = require('express')
const persons = require('./data/personsData')
const personsRouter = express.Router()

// middlewares
// données trouvées
function findPersonAndPutInRequest(req, res, next) {
    const personIndex = persons.findIndex(
        c => c.id === parseInt(req.params.personId))
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

// lectures
personsRouter.get('/', (req, res) => res.json(persons))
personsRouter.get('/:personId', findPersonAndPutInRequest, interruptIfNotFound,
    (req, res) => res.json(req.person)
)

// création


// modification


// suppression


// export
module.exports = personsRouter