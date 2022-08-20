require('dotenv').config()

const PORT = process.env.PORT

//Baza podataka
const password = process.env.ATLAS_PASS
const user = process.env.ATLAS_USER
const dbname = 'igraci-api'
const url = `mongodb+srv://${user}:${password}@cluster0.dkf4b.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {PORT, url}