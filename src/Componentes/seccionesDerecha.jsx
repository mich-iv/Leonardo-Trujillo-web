import React, { useEffect, useState, useRef } from 'react'
import '../estilos/Paginas.css';
import { useParams, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function SeccionesDerecha(){
    const [campos, setCampos] = useState("");

    const ubicacion = useLocation(); // Obtiene la ubicación actual

    var nombre = '';
    var nombreKey = '';
    var nombreFiltrado = '';

    useEffect(()=>{
            try{
                /* obtener los elementos del HTML con la etiqueta <h2>, pues desde el editor de texto
                se agregan los marcadores a los años correspondientes con la etiqueta <a>
                y un id con el año que se marcó */
                setTimeout(() => setCampos(parent.document.getElementsByTagName('h2')), 500);
            }catch(error){
                throw new Error("No hay datos", error);
            }
    }, [])

    let marcadores = [];
    // console.log(ubicacion.pathname);
    
    for (let i = 0; i < campos.length; i++) {
        nombre = campos[i].id;

        //quitamos espacios de los campos
        // nombre = nombre.split(" ").join("");
        
        console.log(nombre);
        
        // console.log(nombre.split("_"));
        // titulo = nombre.split("_")[1];
        
        
        if(nombre.startsWith("titulo")){
            nombreKey = "marcador"+i;
            //antes era slice(4, 8), pero se adaptó en el caso de que esta página llegue al año 10000 o más jkaskja
            // nombreFiltrado = nombre.slice(4, nombre.length);
            nombreFiltrado = nombre.slice(6, nombre.length);
            console.log(nombreFiltrado);
            
            marcadores.push(<HashLink name="marcador" key={nombreKey} smooth to={ubicacion.pathname+"#titulo"+nombreFiltrado}>
                {nombreFiltrado}</HashLink>);
                marcadores.push(<br key={nombreKey+"br"}/>);
        }
    }
    
    return(
        <div>
            <div className='menu-navegador'>
            <div className='menu-navegador-boton'>
            <i className="fas fa-bookmark"></i>
              <div className="menu-navegador-boton-contenido">
                {marcadores}
              </div>
            </div>
          </div>
          
            <div>
                <div className='seccionDerecha'>
                    {/* si hay marcadores de años, entonces muestralos */}
                    {/* {marcadores.length > 0 ? 
                        <div key={"1"} id="tituloMarcadores">Years</div> :
                        ''
                    } */}
                    {/* años a mostrar */}
                    {/* {marcadores}  */}
                </div>
            </div>
        </div>
    )
}