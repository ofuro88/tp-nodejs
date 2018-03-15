var { persons, nextPersonId } = require('../data/personsData')
const tools = require('../tools/toolsGroups')

var groups = tools.GetGroups()


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

function DeletePersonOnGroups(personIndex, personId){
    for(var i = 0; i<groups.length; i++){
        for(var j = 0; j<groups[i].members.length; j++){
            if(groups[i].members[j] === personId){
                groups[i].members[j].splice(j,1)
            }
        }
    }
    persons.splice(personIndex, 1)
}

module.exports = {
    GetPersons, GetNextPersonId, AddPerson, DeletePersonOnGroups
}