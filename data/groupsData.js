// groupes
let nextGroupId = 0

module.exports ={
    groups : [
        { id: nextGroupId++, name: 'collaborator', members: [1, 2, 3, 4] },
        { id: nextGroupId++, name: 'friends', members: [0, 1, 2, 5] }
    ],
    nextGroupId : nextGroupId
}