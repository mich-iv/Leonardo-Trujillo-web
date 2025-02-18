import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Select Conference Papers</title>
            <meta property="og:description" content="Select Conference Papers"></meta>
        </Helmet>
            <h1 className='titulos'>
                Select Conference Papers
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}