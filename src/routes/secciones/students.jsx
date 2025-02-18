import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Students</title>
            <meta property="og:description" content="Students"></meta>
        </Helmet>
            <h1 className='titulos'>
                Students
            </h1>

            <div id={'asddas'} key={Math.random()} className='textos-columnas'>
                <MostrarTexto/>
            </div>
        </>
    )
}