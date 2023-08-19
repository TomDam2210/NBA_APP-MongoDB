import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Forma from './Forma'

test('<Forma> poziva onSubmit i mijenja stanje roditelja', () =>{
    const stvoriIgraca = jest.fn()

    const komponenta = render(
        <Forma spremiIgraca={stvoriIgraca} />
    )
    
    const input = komponenta.container.querySelector('input')
    const forma = komponenta.container.querySelector('form')
    
    fireEvent.change(input, {
        target: {value: 'testiranje forme nije jednostavno'}
    })
    fireEvent.submit(forma)

    expect(stvoriIgraca.mock.calls).toHaveLength(1)
    expect(stvoriIgraca.mock.calls[0][0].sadrzaj).toBe('testiranje forme nije jednostavno')
})