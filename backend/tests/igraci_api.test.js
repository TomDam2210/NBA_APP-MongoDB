const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Igrac = require('../models/igrac')

const api = supertest(app)

const pocetniIgraci = [
    {
      brojDresa: 30,
      ime: 'Stephen',
      prezime: 'Curry',
      pozicija: 'PointGuard'
    },
    {
      brojDresa: 11,
      ime: 'Kyrie',
      prezime: 'Irving',
      pozicija: 'Shooter'
    },
    {
      brojDresa: 3,
      ime: 'Kevin',
      prezime: 'Durant',
      pozicija: 'Center'
    }

]

beforeEach(async () => {
    await Igrac.deleteMany({})
    let novi = new Igrac(pocetniIgraci[0])
    await novi.save()
    novi = new Igrac(pocetniIgraci[1])
    await novi.save()
    novi = new Igrac(pocetniIgraci[2])
    await novi.save()
})

describe("Testovi za GET", () => {
  test('poruke se vraćaju kao JSON', async () => {
    await api
        .get('/api/igraci')
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test('imamo dvije poruke', async () => {
    const odg = await api.get('/api/igraci')

    expect(odg.body).toHaveLength(pocetniIgraci.length)
})

test('prva poruka je o curryu', async () => {
    const odgovor = await api.get('/api/igraci')

    expect(odgovor.body[0].ime).toBe('Stephen')
})
})




describe("Testovi za POST", () => {
  test('dodavanje ispravnih podataka', async () => {
    const noviIgrac = {
      ime: 'Luka',
      prezime: 'Doncic',
      brojDresa: 77,
      pozicija: 'guard'
    }
    await api
    .post('/api/igraci')
    .send(noviIgrac)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const odgovor = await api.get('/api/igraci')
    expect(odgovor.body).toHaveLength(pocetniIgraci.length + 1)
  
    const sadrzaj = odgovor.body.map(p => p.ime)
    expect(sadrzaj).toContain('Luka')
   })
   
  test('dodavanje igraca bez imena', async () => {
    const noviIgrac = {
      prezime: 'Doncic',
      brojDresa: '77',
      pozicija: 'guard'
    }

    await api
    .post('/api/igraci')
    .send(noviIgrac)
    .expect(400)
    const odgovor = await api.get('/api/igrac')
    expect(odgovor.body).toHaveLength(pocetniIgraci.length)
   })
})


 

afterAll(() => {
    mongoose.connection.close()
})