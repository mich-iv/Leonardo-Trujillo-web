import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){
    return(
        <>
            <h1 className='titulos'>
                Students
            </h1>

            <div id={'asddas'} key={Math.random()} className='textos-columnas'>
                <MostrarTexto/>
            </div>
        </>
    )
}