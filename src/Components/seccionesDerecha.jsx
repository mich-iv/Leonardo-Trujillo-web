import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation, Link } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';
import { HashLink } from 'react-router-hash-link';

export default function SeccionesDerecha(){
    const [year, setYear] = useState("");
    const [campos, setCampos] = useState("");
    const expresion = /^year[0-9]+$/i;
    var temporal;

    const lista = parent.document.getElementsByTagName('a');
    var nombre = '';
    var nombreFiltrado = '';
    console.log(lista);

    useEffect(()=>{
            try{
                setTimeout(() => setCampos(parent.document.getElementsByTagName('a')), 1000);
                // console.log("campos:"+campos);
            }catch(error){
                console.log("No hay datos");
            }
    }, [])

    let years = [];
    years.push('Años');
    years.push(<br/>);
    for (let i = 0; i < lista.length; i++) {
        nombre = lista[i].id;
        if(nombre.startsWith("year")){
            nombreFiltrado = nombre.slice(4, 8);
            
            years.push(<HashLink smooth to={"/bookChapters#year"+nombreFiltrado}>
                {nombreFiltrado}</HashLink>);
                years.push(<br/>);
        }
        // setYear(parent.document.getElementById(nombre).getAttribute("id")), 2000);
    }

    return(
        <div>
            <div>
                <div className='seccionDerecha'>
                    {years}
                </div>
            </div>
        </div>
    )
}