var { groups, nextGroupId } = require('../data/groupsData')

 function GetGroups(){
    return groups
 }

function GetNextGroupId(){
    return nextGroupId
}

function AddGroup(pGroup) {
    nextGroupId++
    groups.push(pGroup)
}

function DeleteGroup(groupIndex){
    // TODO : supprimer le group
}

module.exports = {
    GetGroups, GetNextGroupId, AddGroup, DeleteGroup
}