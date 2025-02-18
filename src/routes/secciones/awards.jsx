import React from 'react';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet} from 'react-helmet';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Leonardo Trujillo - Awards</title>
            <meta property="og:description" content="Awards"></meta>
        </Helmet>
            <h1 className='titulos'>
                Awards
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}