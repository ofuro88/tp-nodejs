const express = require('express')
const app = express()
app.use(require('body-parser').json())

// gestions des routes pour les fichiers persons et groups (les fonctions seront dedans avec les tableaux)
app.use('/persons', require('./persons'))
app.use('/groups', require('./groups'))

// lancement du serveur web
app.listen(3000, () => console.log('On http://localhost:3000/'))