```sh

# ------------ SYNTAXE WINDOWS -----------
# -------------- scénario -------------
# liste des personnes
curl http://localhost:3000/persons

# par identifiant
curl http://localhost:3000/persons/1

# ajout d'une personne valide
curl http://localhost:3000/persons -H "Content-type: application/json" -X POST -d "{\"firstName\":\"Jean\",\"lastName\":\"Bond\",\"numbers\":\"0123456789\"}"

# ajout rejeté d'une personne incomplète
curl http://localhost:3000/persons -X POST -H "Content-type: application/json" -d "{\"lastName\":\"Bond\"}"

# modification "valide" (annule et remplace)
curl http://localhost:3000/persons/1 -X PUT -H "Content-type: application/json" -d "{\"firstName\":\"Jean\",\"lastName\":\"Bond\",\"numbers\":\"0123456789\"}"

# modification "invalide" rejetée
curl http://localhost:3000/persons/1 -X PUT -H "Content-type: application/json" -d "{\"firstName\":\"Jean\"}"

# modification "valide" (correction du prenom)
curl http://localhost:3000/persons/1 -X PATCH -H "Content-type: application/json" -d "{\"firstName\":\"James\"}"

# supprime une personne (et son id dans les groupes)
curl http://localhost:3000/persons/2 -X DELETE

# supprime une personne (not found)
curl http://localhost:3000/persons/2 -X DELETE

# ajoute dans un group
curl http://localhost:3000/persons/6/groups/0 -X POST

# ajoute dans un group (already this group)
curl http://localhost:3000/persons/6/groups/0 -X POST

# retire une personne d'un group
curl http://localhost:3000/persons/6/groups/0 -X DELETE

# ----------- GROUPS -----------------
# liste des groupes
curl http://localhost:3000/groups

# par identifiant
curl http://localhost:3000/groups/1

# ajout d'un groupe valide
curl http://localhost:3000/groups -H "Content-type: application/json" -X POST -d "{\"name\":\"Family\"}"

# ajout rejeté (membres en trop)
curl http://localhost:3000/groups -X POST -H "Content-type: application/json" -d "{\"name\":\"Family\", \"members\":[]}"

# modification "valide" (PUT)
curl http://localhost:3000/groups/1 -X PUT -H "Content-type: application/json" -d "{\"name\":\"Family\"}"

# modification "invalide" rejetée
curl http://localhost:3000/groups/1 -X PUT -H "Content-type: application/json" -d "{\"name\":\"\"}"

# modification "valide" (correction du nom)
curl http://localhost:3000/groups/1 -X PATCH -H "Content-type: application/json" -d "{\"name\":\"famille\"}"

# supprime un group
curl http://localhost:3000/groups/0 -X DELETE

# supprime un group (not found)
curl http://localhost:3000/groups/0 -X DELETE
