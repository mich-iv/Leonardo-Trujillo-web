import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';

import MostrarTexto from '../Components/MostrarTexto.jsx';

export default function Route(){

    return(
        <div>
            <div>
                <h1 className='titulos'>
                    Projects
                </h1>

                <div  className='texto'>
                    <MostrarTexto/>
                </div>
            </div>
        </div>
    )
}