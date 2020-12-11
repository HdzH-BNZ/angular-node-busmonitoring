const Express = require('express');
const cors = require('cors');
const { Client } = require('pg');


const corsOptions = { //mettre la destination à qui épargner les CORS requests
    origin: "http://localhost:4200"
  };

const app = Express();

const client = new Client({
    user: '',
    database: '',
    password: '',
    host: 'localhost',
    port: 5432
})

app.use(cors(corsOptions))//pr désactiver les CORS requests
app.use(Express.json())// le paramètre sera req.body
app.listen(8000, () => console.log("Serveur dispo sur le port 8000"))


//LES ROUTES

app.get('/api/arrets', async (req, res) => {
    const rows = await readArrets()
    res.setHeader("content-type", "application/json")//pr transformer notre fichier en JSON
    res.send(JSON.stringify(rows))

})

app.get('/api/arrets/:id', async (req, res) => {
    const id = req.params.id
    const rows = await readArretByID(id)
    res.setHeader("content-type", "application/json")//pr transformer notre fichier en JSON
    res.send(JSON.stringify(rows))
    
})

app.post("/api/arrets", async (req, res) => {
    try {
        const { nom_ligne, nom_exploit, nom_arret, nom_commune, etat_arret, acces_pmr, marquage_au_sol, etat_marquage, poubelle, banc, carte_trajets, horaires, toit, commentaires, lat, lng, date_eval } = req.body;
        const newArret = await client.query(
            'INSERT INTO arrets (nom_ligne, nom_exploit, nom_arret, nom_commune, etat_arret, acces_pmr, marquage_au_sol, etat_marquage, poubelle, banc, carte_trajets, horaires, toit, commentaires, lat, lng, date_eval) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *', 
            [nom_ligne, nom_exploit, nom_arret, nom_commune, etat_arret, acces_pmr, marquage_au_sol, etat_marquage, poubelle, banc, carte_trajets, horaires, toit, commentaires, lat, lng, date_eval]
            );
        res.json('L\'arrêt a bien été ajouté');
    } 
    catch (error) {
        console.log(error)
    }

})

app.put("/api/arrets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_ligne, nom_exploit, nom_arret, nom_commune, etat_arret, acces_pmr, marquage_au_sol, etat_marquage, poubelle, banc, carte_trajets, horaires, toit, commentaires, lat, lng, date_eval } = req.body;
        const updateArret = await client.query(
            'UPDATE arrets SET nom_ligne = $1, nom_exploit = $2, nom_arret = $3, nom_commune = $4, etat_arret = $5, acces_pmr = $6, marquage_au_sol = $7, etat_marquage = $8, poubelle = $9, banc = $10, carte_trajets = $11, horaires = $12, toit = $13, commentaires = $14, lat = $15, lng = $16, date_eval = $17 WHERE id = $17',
            [nom_ligne, nom_exploit, nom_arret, nom_commune, etat_arret, acces_pmr, marquage_au_sol, etat_marquage, poubelle, banc, carte_trajets, horaires, toit, commentaires, lat, lng, date_eval, id]
        );
        res.json('L\'arrêt a bien été modifié');
    } 
    catch (error) {
        console.log(error)
    }
})

app.delete("/api/arrets/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteArret = await client.query('DELETE FROM arrets VALUE WHERE id = ($1)',
        [id]
        );

        res.json('L\'arrêt a été supprimé avec succès !');
    } 
    catch (error) {
        console.log(error)
    }
})

// LES FONCTIONS

async function readArrets() {
    try {
        const requete = await client.query("SELECT * FROM arrets")
        console.table(requete.rows)
        return requete.rows;
    }
    catch (e) {
        console.log(e)
    }
}

async function readArretByID(id) {
    try {
        const requete = await client.query("SELECT * FROM arrets WHERE id = ($1)", [id])
        return requete.rows;
    }
    catch(e) {
        console.log(e)
    }
}

//Lancement de l'appli
start()

async function start() {
    await client.connect()
    console.log("Vous êtes connectés à la BDD")
}