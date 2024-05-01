import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';

export default function SeccionesDerecha(){
    const yearsRef = useRef();

    return(
        <div>
            <div>
                <div className='seccionDerecha'>
                    <a href=''>2023</a>
                </div>
            </div>
        </div>
    )
}