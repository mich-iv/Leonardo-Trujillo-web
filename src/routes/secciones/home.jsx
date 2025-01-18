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

            <div className='contenedor-home'>
                <div className='item-home'>
                    <div className='item-home-contenido'>
                        <img className='item-home-contenido-img' src='https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/perfil.jpg'/>
                    {/* </div> */}
                    <div className='item-home-links'>
                        <a href='https://orcid.org/0000-0003-1812-5736'>
                            <div className='item-home-links-individual'>
                                {/* <img className='item-home-links-individual-img' width="16" height="16" src='https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/iconos/orcid.ico'/> */}
                                <FontAwesomeIcon className='item-home-links-individual-img' icon={faOrcid} />
                                <span className='item-home-links-individual-texto'>ORCID</span>
                            </div>
                        </a>
                        <a href='https://www.researchgate.net/profile/Leonardo-Trujillo-2'>
                            <div className='item-home-links-individual'>
                                <FontAwesomeIcon className='item-home-links-individual-img' icon={faResearchgate} />
                                <span className='item-home-links-individual-texto'>Research Gate</span>
                            </div>
                        </a>
                        <a href='https://dblp.org/pid/62/1755.html'>
                            <div className='item-home-links-individual'>
                                <img className='item-home-links-individual-img' width="16" height="16" src='https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/iconos/dblp.ico'/>
                                <span className='item-home-links-individual-texto'>dblp</span>
                            </div>
                        </a>
                        <a href='https://scholar.google.com/citations?user=xXh3xRYAAAAJ'>
                            <div className='item-home-links-individual'>
                            <FontAwesomeIcon className='item-home-links-individual-img' icon={faGoogleScholar} />
                            <span className='item-home-links-individual-texto'>Google Scholar</span>
                            </div>
                        </a>
                        </div>
                    </div>
                </div>
                <div className='item-home'>
                    <MostrarTexto></MostrarTexto>
                </div>
            </div>
        </>
    )
}