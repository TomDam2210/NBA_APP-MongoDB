import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const igraci = [
  {
    br: 30,
    ime: 'Stephen',
    prezime: 'Curry',
    pozicija: 'PointGuard'
  },
  {
    br: 11,
    ime: 'Kyrie',
    prezime: 'Irving',
    pozicija: 'Shooter'
  },
  {
    br: 3,
    ime: 'Kevin',
    prezime: 'Durant',
    pozicija: 'Center'
  }
 ]
 

ReactDOM.render(<App igraci={igraci} />, document.getElementById('root'))