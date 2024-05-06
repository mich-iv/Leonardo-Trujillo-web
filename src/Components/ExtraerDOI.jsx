import React, { useEffect, useState } from 'react'
import parse from 'bibtex-parser'; 

function ExtraerTexto(id) {
    var url="https://doi.org/"+id;
    const [textoExtraido, setTextoExtraido] = useState(null);

    useEffect(() => {
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
        })
    },[id]);

    return textoExtraido;
}


export default ExtraerTexto;