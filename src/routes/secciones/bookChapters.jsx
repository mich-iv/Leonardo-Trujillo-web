import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Book Chapters</title>
            <meta property="og:description" content="Book Chapters"></meta>
        </Helmet>
            <h1 className='titulos'>
                Book Chapters
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}