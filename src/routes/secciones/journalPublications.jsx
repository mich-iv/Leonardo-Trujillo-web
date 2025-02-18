import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Journal Publications</title>
            <meta property="og:description" content="Journal Publications"></meta>
        </Helmet>
            <h1 className='titulos'>
                Journal Publications
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}