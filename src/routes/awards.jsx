import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { Employees } from "../bd/datos.json";
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';

export default function Route(){
    var prueba;
    const location = useLocation();
    const [textoCargado, setTextoCargado]= useState("");

    const mostrarTexto = () => {
        return <div dangerouslySetInnerHTML={{ __html: textoCargado }} />;
    };

    useEffect (() => {
        async function docSnap(){
            // const response = await firebase.firestore().collection('awards').get();
            var response = await getDocs(collection(bd, location.pathname));
            const docs = response.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            return docs;
        }
        docSnap().then(valor => {
            prueba = valor;
            setTextoCargado(prueba[0].texto);
        });

    }, []);

    return(
        <div>
            <div>
                <h1 className='titulos'>
                    Awards
                </h1>

                

                {/* {Employees.map((data, key) => {
                    return <h2 key={key}>{data.preferredFullName}</h2>;
                })
                } */}
                <div  className='texto'>
                    {mostrarTexto()}
                </div>
                    
            </div>
        </div>
    )
}