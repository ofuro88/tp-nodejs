const express = require('express')
const app = express()
app.use(require('body-parser').json())

// tableaux
    // personnes
let nextPersonId = 0
const persons = [
    { id: nextPersonId++, fisrtName: 'théo', lastName: 'durand', numbers: ['0123456789', '0538694210'] },
    { id: nextPersonId++, fisrtName: 'léa', lastName: 'dupont', numbers: ['0874563210', '0412589456', '0601112356'] },
    { id: nextPersonId++, fisrtName: 'marc', lastName: 'dufil', numbers: ['0638520147', '0011225544'] },
    { id: nextPersonId++, fisrtName: 'julien', lastName: 'dufil', numbers: ['0302225364', '0561123549'] },
    { id: nextPersonId++, fisrtName: 'julia', lastName: 'zen', numbers: ['0126534865', '0788664423'] },
    { id: nextPersonId++, fisrtName: 'alicia', lastName: 'maréchal', numbers: ['0638520147'] }
]
    // groupes
let nextGroupId = 0
const groups = [
    { id: nextGroupId++, name: 'collaborator', members: [1, 2, 3, 4] },
    { id: nextGroupId++, name: 'friends', members: [1, 4, 5, 6] }
]

// ------------------------ PERSONS --------------------------
// middlewares


// lectures
app.get('/persons', (req, res) => res.json(persons))


// modification


// suppression


// ---------------------- GROUPS ---------------------------
// middlewares


// lectures
app.get('/groups', (req, res) => res.json(groups))


// modification


// suppression


// lancement du serveur web
app.listen(3000, () => console.log('On http://localhost:3000/'))