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

function DeletePersonOnGroups(personIndex){
    // TODO : supprimer la personne dans les groups
    persons.splice(req.personIndex, 1)
}

module.exports = {
    GetPersons, GetNextPersonId, AddPerson, DeletePersonOnGroups
}