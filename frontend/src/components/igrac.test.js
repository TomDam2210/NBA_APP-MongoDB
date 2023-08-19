import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Igrac from './Igrac'

test('renderira sadrzaj', () => {
    const igrac = {
        brojDresa: "30",
        ime: "Stephen",
        prezime: "Curry",
        pozicija: "Guard"
    }
    
    
    const komponenta = render(
        <Igrac igrac={igrac} />
        )
        expect(komponenta.container).toHaveTextContent('Stephen')

})
