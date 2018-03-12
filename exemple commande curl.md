```sh

# -------------- PERSONS -------------
# liste des personnes
curl http://localhost:3000/persons

# par identifiant
curl http://localhost:3000/persons/2

# ajout d'une personne valide
curl http://localhost:3000/persons -H "Content-type: application/json" -X POST -d "{\"firstName\":\"Jean\",\"lastName\":\"Bond\",\"numbers\":\"0123456789\"}"

# ajout rejeté d'une personne incomplète
curl http://localhost:3000/persons -X POST -H "Content-type: application/json" -d "{\"lastName\":\"Bond\"}"

# modification "valide" (correction de la personne, ajout de l'année)
curl http://localhost:3000/persons/1 -X PUT -H "Content-type: application/json" -d "{\"firstName\":\"Jean\",\"lastName\":\"Bond\",\"numbers\":\"0123456789\"}"

# modification "invalide" rejetée
curl http://localhost:3000/persons/1 -X PUT -H "Content-type: application/json" -d "{\"firstName\":\"Jean\"}"

# supprime une personne
curl http://localhost:3000/persons/2 -X DELETE


# ----------- GROUPS -----------------
# recherche par marque
curl http://localhost:3000/cars/by-brand?brand=Renault

curl http://localhost:3000/cars/by-brand

# modification "valide" (correction du modèle, ajout de l'année)
curl http://localhost:3000/cars/1 -X PUT \
  -H 'Content-type: application/json' \
  -d '{"brand":"Peugeot","model":"Mégane","year":2015}'

# modification "invalide" rejetée
curl http://localhost:3000/cars/1 -X PUT \
  -H 'Content-type: application/json' \
  -d '{"model":"Mégane","year":2015}'

# correction de l'année
curl http://localhost:3000/cars/1 -X PATCH \ -H 'Content-type: application/json' \ -d '{"year":2017}'

```
