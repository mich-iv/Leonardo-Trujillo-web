import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../../firebase.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOrcid, faResearchgate, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Route(){
    var temporal = '';
    const location = useLocation();

    return(
        <>
            <h1 className='titulos'>
                Leonardo Trujillo
            </h1>

                <div key={99898} className='item-home'>
                    <MostrarTexto key={73841234}></MostrarTexto>
                </div>
        </>
    )
}