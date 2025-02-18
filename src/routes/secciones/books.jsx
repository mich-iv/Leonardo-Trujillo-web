import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
            <Helmet>
                <title>Leonardo Trujillo - Books</title>
                <meta property="og:description" content="Books"></meta>
            </Helmet>
            <h1 className='titulos'>
                Books
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}