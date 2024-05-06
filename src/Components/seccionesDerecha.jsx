import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation, Link } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';
import { HashLink } from 'react-router-hash-link';

export default function SeccionesDerecha(){
    const [campos, setCampos] = useState("");

    const ubicacion = useLocation().pathname; // Obtiene la ubicación actual

    const lista = parent.document.getElementsByTagName('a');
    var nombre = '';
    var nombreKey = '';
    var nombreFiltrado = '';

    console.log(ubicacion);

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
    for (let i = 0; i < campos.length; i++) {
        nombre = campos[i].id;
        if(nombre.startsWith("year")){
            nombreKey = "marcador"+i;
            nombreFiltrado = nombre.slice(4, 8);
            marcadores.push(<HashLink name="marcador" key={nombreKey} smooth to={ubicacion+"/#year"+nombreFiltrado}>
                {nombreFiltrado}</HashLink>);
                marcadores.push(<br key={nombreKey+"br"}/>);
        }
    }
    
    return(
        <div>
            <div>
                <div className='seccionDerecha'>
                    {/* si hay marcadores de años, entonces muestralos */}
                    {marcadores.length > 0 ? 
                        <div key={"1"} id="tituloMarcadores">Años</div> :
                        ''
                    }
                    {marcadores} {/* años a mostrar */}
                </div>
            </div>
        </div>
    )
}