import React, { useEffect, useState,  } from 'react'
import '../estilos/Paginas.css';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function SeccionesDerecha(){
    const [campos, setCampos] = useState("");

    let ubicacion = useLocation(); // Obtiene la ubicación actual

    var nombre = '';
    var nombreKey = '';
    var nombreFiltrado = '';
    var nombreFormateado = '';

    useEffect(()=>{
        try{
            /* obtener los elementos del HTML con la etiqueta <h2>, pues desde el editor de texto
            se agregan los marcadores a los años correspondientes con la etiqueta <a>
            y un id con el año que se marcó */
            setTimeout(() => setCampos(parent.document.getElementsByTagName('h2')), 1000);
        }catch(error){
            throw new Error("No hay datos", error);
        }
    }, [])

    var marcadores = [];
    
    for (let i = 0; i < campos.length; i++) {
        nombre = campos[i].id;
        nombreFormateado = campos[i].innerText;
        
        if(nombre.startsWith("titulo")){
            nombreKey = "marcador"+i;
            //antes era slice(4, 8), pero se adaptó en el caso de que esta página llegue al año 10000 o más jkaskja
            nombreFiltrado = nombre.slice(6, nombre.length);

            marcadores.push(<HashLink name={nombreKey} key={nombreKey} id={nombreKey} smooth to={ubicacion.pathname+"#titulo"+nombreFiltrado}>
                {nombreFormateado}</HashLink>);
        }
    }

    if((marcadores.length > 0) && ubicacion.hash !== "" ){
        // removemos el # de la ubicación
        ubicacion.hash = ubicacion.hash.replace("#", "");
        ubicacion.hash = ubicacion.hash.replace("%20", " ");
        
        if(ubicacion.pathname !== "/students"){
            // quitamos los estilos para reiniciar animacion
            document.getElementById(ubicacion.hash).style.transition = null;
            document.getElementById(ubicacion.hash).style.backgroundColor = null;
            document.getElementById(ubicacion.hash).style.borderRadius = null;
            
            // fijamos el color de fondo del marcador y redoendamos las esquinas
            document.getElementById(ubicacion.hash).style.borderRadius = "0.25rem";
            document.getElementById(ubicacion.hash).style.backgroundColor = "rgba(100, 175, 159, 0.74)";
            
            // fijamos el comportamiento de desplazamiento y desplazamos la vista
            document.documentElement.style.scrollBehavior = "smooth";
            document.getElementById(ubicacion.hash).scrollIntoView();
            
            document.getElementById(ubicacion.hash).style.backgroundColor = "rgba(0, 0, 0, 0)";
            document.getElementById(ubicacion.hash).style.transition = "background-color 2s ease-out";
            // volvemos trasnparente el fondo del marcador
        }else{
            // fijamos el comportamiento de desplazamiento y desplazamos la vista
            document.documentElement.style.scrollBehavior = "smooth";
            document.getElementById(ubicacion.hash).scrollIntoView();
        }
    }
    
    return(
        <>
        {/* Mostramos los marcadores solo si contienen datos*/}
            <div style={{
                    opacity: marcadores.length > 0 ? "1" : "0",
                    transition: "all 300ms",
                    visibility: marcadores.length > 0 ? "visible"  : "hidden",
                }} className='menu-navegador'>
                <div className='menu-navegador-boton'>
                    <i className="fas fa-bookmark"></i>
                    <div className="menu-navegador-boton-contenido">
                        {marcadores}
                    </div>
                </div>
            </div>
        </> 
    )
}