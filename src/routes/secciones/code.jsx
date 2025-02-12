import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../../firebase.jsx';
import {Helmet} from 'react-helmet';

import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){

    var ubicacion = "code";
    return(
        <>
            <h1 className='titulos'>
                Code
            </h1>

            <div className='texto'>
                <MostrarTexto ubicacion={ubicacion}/>
            </div>
        </>
    )
}