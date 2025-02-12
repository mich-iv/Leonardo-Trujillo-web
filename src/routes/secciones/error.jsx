import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';

import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){

    return(
        <>
            <h1 className='titulos'>
                Error 404
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}