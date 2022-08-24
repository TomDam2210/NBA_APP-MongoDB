import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const igraci = [
  {
    brojDresa: "30",
    ime: 'Stephen',
    prezime: 'Curry',
    pozicija: 'PointGuard'
  },
  {
    brojDresa: "11",
    ime: 'Kyrie',
    prezime: 'Irving',
    pozicija: 'Shooter'
  },
  {
    brojDresa: "3",
    ime: 'Kevin',
    prezime: 'Durant',
    pozicija: 'Center'
  }
 ]
 

ReactDOM.render(<App igraci={igraci}/>, document.getElementById('root'))