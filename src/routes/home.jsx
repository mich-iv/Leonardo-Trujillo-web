import React, { useEffect, useState } from 'react'
import '../estilos/Paginas.css';
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';

export default function Route(){
    var temporal;
    const location = useLocation();
    const [textoCargado, setTextoCargado]= useState("");

    const mostrarTexto = () => {
        return <div dangerouslySetInnerHTML={{ __html: textoCargado }} />;
    };

    useEffect (() => {
        async function docSnap(){
            var response = await getDocs(collection(bd, "home"));
            const docs = response.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            return docs;
        }
        docSnap().then(valor => {
            temporal = valor;
            setTextoCargado(temporal[0].texto);
        });

    }, []);

    return(
        <div>
            <div>
                <div  className='texto'>
                    {mostrarTexto()}
                </div>
            </div>
        </div>
    )
}