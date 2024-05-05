import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation, Link } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';
import { HashLink } from 'react-router-hash-link';

export default function SeccionesDerecha(){
    const [campos, setCampos] = useState("");

    const lista = parent.document.getElementsByTagName('a');
    var nombre = '';
    var nombreFiltrado = '';
    // console.log('LISTAAAA'+lista);

    useEffect(()=>{
            try{
                /* obtener los elementos del HTML con la etiqueta <a>, pues desde el editor de texto
                se agregan los marcadores a los años correspondientes con la etiqueta <a>
                y un id con el año que se marcó */
                setTimeout(() => setCampos(parent.document.getElementsByTagName('a')), 500);
            }catch(error){
                console.log("No hay datos");
            }
    }, [])

    let marcadores = [];
    for (let i = 0; i < lista.length; i++) {
        nombre = lista[i].id;
        if(nombre.startsWith("year")){
            nombreFiltrado = nombre.slice(4, 8);
            marcadores.push(<HashLink name="marcador" smooth to={"/bookChapters#year"+nombreFiltrado}>
                {nombreFiltrado}</HashLink>);
                marcadores.push(<br/>);
        }
    }
    
    return(
        <div>
            <div>
                <div className='seccionDerecha'>
                    {/* si hay marcadores de años, entonces muestralos */}
                    {marcadores.length > 0 ? 
                        <div className="" id="tituloMarcadores">Años</div> :
                        ''
                    }
                    {marcadores} {/* años a mostrar */}
                </div>
            </div>
        </div>
    )
}