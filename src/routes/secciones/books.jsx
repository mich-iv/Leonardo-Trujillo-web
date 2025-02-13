import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){
    return(
        <>
            <h1 className='titulos'>
                Books
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}