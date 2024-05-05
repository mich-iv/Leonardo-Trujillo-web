import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';
import SeccionesDerecha from '../Components/seccionesDerecha.jsx';
import MostrarTexto from '../Components/MostrarTexto.jsx';

export default function Route(){


    return(
        <div>
            <div>
                <h1 className='titulos'>
                    Book chapters
                </h1>

                <div className='texto'>
                    <MostrarTexto/>
                </div>
                <div>
                    <SeccionesDerecha/>
                </div>
            </div>
        </div>
    )
}