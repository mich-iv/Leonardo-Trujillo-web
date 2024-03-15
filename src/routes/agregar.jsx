import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { Employees } from "../bd/datos.json";
import { useParams } from 'react-router-dom';
import {bd, collection, addDoc} from '../../firebase.jsx';

export default function Route(){
    const [tituloForm, setTitulo] = useState("");
    const [descripcionForm, setDescripcion] = useState("");
    const [urlForm, setUrl] = useState("");
    const [anioForm, setAnio] = useState("");

    //obtenemos la ruta actual del url
    const { ubicacion } = useParams();

        const submit = (e) => {
            e.preventDefault();
            try{
                /*
                aquí el truco está en "bd, UBICACION", donde
                ubicación es la ruta que le da el nombre de 
                la colección, para así no generar un .jsx para
                cada sección.
                */
                addDoc(collection(bd, ubicacion), {
                    titulo: tituloForm,
                    descripcion: descripcionForm,
                    url: urlForm,
                    anio: anioForm
                });
            }catch (error) {
                console.log(error);
            }
          console.log("Document written with ID: ");
        }
    
    return(
        <div>
            <div>
                <h1 >
                    Agregar {ubicacion}
                </h1>

                <form>
                    Titulo<br/>
                    <input 
                        value={tituloForm}
                        placeholder='Ingresar titulo'
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <br/>
                    <br/>

                    Descripción<br/>
                    <input 
                        value={descripcionForm}
                        placeholder='Descripción'
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    
                    <br/>
                    <br/>
                    URL de publicación<br/>
                    <input 
                        value={urlForm} 
                        placeholder='URL'
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <br/>
                    <br/>
                    Año<br/>
                    <input 
                        value={anioForm} 
                        placeholder='Año'
                        onChange={(e) => setAnio(e.target.value)}
                    />
                    <br/>
                    <br/>
                    {/* por investigar */}
                    PDF<br/>
                    <input 
                        type="file"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <br/>
                    <br/>
                </form>

                <button onClick={submit}>Agregar</button>
            </div>
        </div>
    )
}