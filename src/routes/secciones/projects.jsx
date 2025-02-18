import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Projects</title>
            <meta property="og:description" content="Projects"></meta>
        </Helmet>
            <h1 className='titulos'>
                Projects
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}