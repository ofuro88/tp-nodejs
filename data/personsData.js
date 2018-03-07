// personnes
let nextPersonId = 0
const persons = [
    { id: nextPersonId++, firstName: 'theo', lastName: 'durand', numbers: ['0123456789', '0538694210'] },
    { id: nextPersonId++, firstName: 'lea', lastName: 'dupont', numbers: ['0874563210', '0412589456', '0601112356'] },
    { id: nextPersonId++, firstName: 'marc', lastName: 'dufil', numbers: ['0638520147', '0011225544'] },
    { id: nextPersonId++, firstName: 'julien', lastName: 'dufil', numbers: ['0302225364', '0561123549'] },
    { id: nextPersonId++, firstName: 'julia', lastName: 'zen', numbers: ['0126534865', '0788664423'] },
    { id: nextPersonId++, firstName: 'alicia', lastName: 'marechal', numbers: ['0638520147'] }
]

module.exports = {
    persons : persons,
    nextPersonId : nextPersonId
}