import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { useState } from 'react';

export default function Route(){
    const [abrir, setAbrir] = useState(false);
    return(
        <>
            <h1 className='titulos'>
                Leonardo Trujillo
            </h1>

            <div key={99898} className='item-home'>
                <MostrarTexto key={73841234}></MostrarTexto>
            </div>
        </>
    )
}