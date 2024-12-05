import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../../firebase.jsx';

export default function Route(){
    var temporal = '';
    const location = useLocation();

    return(
        <>
            <h1 className='titulos'>
                Awards
            </h1>

            <div className='contenedor-home'>
                <div className='item-home'>
                    <div className='texto'>
                        <img src='src/assets/perfil.png'/>
                    </div>
                    <div className='item-home-links'>
                        <a href='https://orcid.org/0000-0003-1812-5736'>
                            <div className='item-home-links-individual'>
                                <img className='item-home-links-individual-img' width="16" height="16" src='src/assets/iconos/orcid.ico'/>
                                <span className='item-home-links-individual-texto'>ORCID</span>
                            </div>
                        </a>
                        <a href='https://www.researchgate.net/profile/Leonardo-Trujillo-2'>
                            <div className='item-home-links-individual'>
                                <img className='item-home-links-individual-img' width="16" height="16" src='src/assets/iconos/researchgate.ico'/>
                                <span className='item-home-links-individual-texto'>Research Gate</span>
                            </div>
                        </a>
                        <a href='https://dblp.org/pid/62/1755.html'>
                            <div className='item-home-links-individual'>
                                <img className='item-home-links-individual-img' width="16" height="16" src='src/assets/iconos/dblp.ico'/>
                                <span className='item-home-links-individual-texto'>dblp</span>
                            </div>
                        </a>
                        <a href='https://scholar.google.com/citations?user=xXh3xRYAAAAJ'>
                            <div className='item-home-links-individual'>
                                <img className='item-home-links-individual-img' width="16" height="16" src='src/assets/iconos/googleScholar.ico'/>
                                <span className='item-home-links-individual-texto'>Google Scholar</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='item-home'>
                    <div className='texto'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec ligula nec sem lacinia ultrices. 
                        Sed euismod, erat vel lacinia ultricies, est purus aliquam purus, nec volutpat magna nunc nec nunce nec ligula
                        nec sem lacinia ultrices. Sed euismod, er nec ligula nec sem lacinia ultrices. Sed euismod, erat vel lacinia
                        ultricies, est purus aliquam purus, nec volutpat magna nunc nec nunce nec ligula nec sem lacinia ultrices. Sed euismod, er nec ligula 
                        nec sem lacinia ultrices. Sed euismod, erat vel lacinia ultricies, est purus aliquam purus, nec volutpat magna nunc nec nunc.
                    </div>
                </div>
            </div>
        </>
    )
}