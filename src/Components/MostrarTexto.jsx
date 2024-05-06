import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc} from '../../firebase.jsx';
import SeccionesDerecha from './seccionesDerecha.jsx';

const MostrarTexto = () => {
    var temporal;
    const location = useLocation();
    const [textoCargado, setTextoCargado]= useState("");

    useEffect (() => {
        async function docSnap(){
            var response = await getDocs(collection(bd, location.pathname));
            const docs = response.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            return docs;
        }
        docSnap().then(valor => {
            temporal = valor;
            try {
                setTextoCargado(temporal[0].texto);
            } catch (error) {
                console.error(error);
            }
        });
    
    }, []);

    return [<div dangerouslySetInnerHTML={{ __html: textoCargado }} />, <SeccionesDerecha/>];
};

export default MostrarTexto;