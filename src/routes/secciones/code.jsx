import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
            <Helmet>
                <title>Leonardo Trujillo - Code</title>
                <meta property="og:description" content="Code"></meta>
            </Helmet>
            <h1 className='titulos'>
                Code
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}