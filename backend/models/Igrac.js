const mongoose = require('mongoose')

const password = process.env.ATLAS_PASS
const dbname = 'igraci-api'
const url = `mongodb+srv://tomodam:${password}@cluster0.dkf4b.mongodb.net/${dbname}?retryWrites=true&w=majority`

const igracSchema = new mongoose.Schema({
 brojDresa: {
    type: String,
    required: true
 },
 ime: {
    type: String,
    required: true
 },
 prezime: {
    type: String,
    required: true
 },
 pozicija: {
    type: String,
    required: true
 }
})

igracSchema.set('toJSON', {
    transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
    }
   })
   

const Igrac = mongoose.model('Igrac', igracSchema, 'igraci')

console.log("Spajamo se na bazu")
mongoose.connect(url)
 .then(result => {
 console.log("Spojeni smo na bazu");
 })
 .catch(error => {
 console.log("Greška pri spajanju", error.message);
 }) 

module.exports = Igrac;