import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation, Link } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';

export default function SeccionesDerecha(){

    useEffect(()=>{
        console.log(parent.document.getElementById('year2023'));
    })
    

    return(
        <div>
            <div>
                <div className='seccionDerecha'>
                    <Link to="/bookChapters#year2023">Press Link to get to headline</Link>
                </div>
            </div>
        </div>
    )
}