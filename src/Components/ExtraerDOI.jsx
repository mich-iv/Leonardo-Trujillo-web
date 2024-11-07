import React, { useEffect, useState } from 'react'
import parse from 'bibtex-parser';

const ExtraerTexto = (doi) => {
    var url="https://doi.org/"+doi;
    const [textoExtraido, setTextoExtraido] = useState(null);

    var resultMap = new Map();

    //useEffect(() => {
        async function obtenerTexto(){
            return fetch(url, {
                headers:{
                    "Accept": "application/x-bibtex"
                }
            })
            .then(response => response.text())
        }
        obtenerTexto().then(datos => {
            setTimeout(() => {setTextoExtraido(parse(datos))}, 200);

            try {
                for (const [key, value] of Object.entries(datos)) {
                    for (const [llave, valor] of Object.entries(value)) {
                        resultMap.set(llave, valor);
                    }
                }
                //console.log(resultMap);
            } catch (error) {
                console.error("Falló:"+error);
            }
        })
    //},[id]);

    console.log(resultMap);
    return textoExtraido;
}

export default ExtraerTexto;