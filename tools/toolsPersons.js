var { persons, nextPersonId } = require('../data/personsData')

 function GetPersons(){
    return persons
 }

function GetNextPersonId(){
    return nextPersonId
}

function AddPerson(pPerson) {
    nextPersonId++
    persons.push(pPerson)
}

module.exports = {
    GetPersons, GetNextPersonId, AddPerson
}