import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../../firebase.jsx';
import {Helmet} from 'react-helmet';

import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){
    return(
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="This is the home page description" />
                <meta property="og:description" content="This is the dynamic og:description for the home page" />
                <meta property="og:image" content="https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/perfil.jpg" />
            </Helmet>

            <h1 className='titulos'>
                Code
            </h1>

            <div  className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}