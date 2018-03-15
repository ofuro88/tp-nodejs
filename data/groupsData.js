// groupes
let nextGroupId = 0

module.exports ={
    groups : [
        { id: nextGroupId++, name: 'collaborator', members: [1, 2, 3, 4] },
        { id: nextGroupId++, name: 'friends', members: [1, 4, 5, 6] }
    ],
    nextGroupId : nextGroupId
}