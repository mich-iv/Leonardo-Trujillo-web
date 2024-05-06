import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';

import MostrarTexto from '../../Components/MostrarTexto.jsx';

export default function Route(){

    return(
        <>
            <h1 className='titulos'>
                Awards
            </h1>

            <div  className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}