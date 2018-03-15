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
    for(let i = 0; i<groups.length; i++){
        for(let j = 0; j<groups[i].members.length; j++){
            if(groups[i].members[j] === parseInt(personId)){
                groups[i].members.splice(j,1)
            }
        }
    }
    persons.splice(personIndex, 1)
}

function DeletePersonFromGroup(groupIndex, personIndex){
    groups[groupIndex].members.splice(personIndex,1)
}

function AddPersonInGroup(groupIndex, personId){
    groups[groupIndex].members.push(parseInt(personId))
}

module.exports = {
    GetPersons, GetNextPersonId, AddPerson, DeletePersonOnGroups, DeletePersonFromGroup, AddPersonInGroup
}