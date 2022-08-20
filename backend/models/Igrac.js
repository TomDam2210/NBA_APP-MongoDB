const mongoose = require('mongoose')

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
   
module.exports = mongoose.model('Igrac', igracSchema, 'igraci')

