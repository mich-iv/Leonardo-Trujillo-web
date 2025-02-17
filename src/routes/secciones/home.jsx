import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { useState } from 'react';
import Informacion from './informacion.jsx';

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

            <div>
                <button id='si' onClick={() => setAbrir(true)}>Mostrar texto</button>
                <Informacion abrir={abrir} cerrar = {() => setAbrir(false)}>
                    Home aaaaaaaaaaaa
                </Informacion>
            </div>
        </>
    )
}