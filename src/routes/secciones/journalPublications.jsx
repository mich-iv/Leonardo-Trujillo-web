import React, { useEffect, useState } from 'react'
import '../../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../../firebase.jsx';

import MostrarTexto from '../../Components/MostrarTexto.jsx';

export default function Route(){

    return(
        <>
            <h1 className='titulos'>
                Journal Publications
            </h1>

            <div className='texto'>
                <MostrarTexto/>
            </div>
        </>
    )
}