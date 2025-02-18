import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Route(){
    const [abrir, setAbrir] = useState(false);
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo</title>
            <meta property="og:description" content="Home"></meta>
        </Helmet>
            <h1 className='titulos'>
                Leonardo Trujillo
            </h1>

            <div key={99898} className='item-home'>
                <MostrarTexto key={73841234}></MostrarTexto>
            </div>
        </>
    )
}