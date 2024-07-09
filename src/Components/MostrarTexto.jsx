import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc, orderBy, query} from '../../firebase.jsx';
import SeccionesDerecha from './seccionesDerecha.jsx';
import {eliminar} from './opcionesRegistros.js';

const MostrarTexto = () => {
    const location = useLocation();
    let { ubicacion } = "";
    
    var temporal;
    let datosTemporal = {};
    var yearTemporal;
    const [datos, setDatos]= useState({});
    const [yearSeccion, setYearSeccion]= useState({});
    let idTemporal = {};
    let val = [];

    ubicacion = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect (() => {
        async function docSnap(){
            const coleccion = collection(bd, ubicacion)
            const ordenarPor = query(coleccion, orderBy("YEAR","desc"), orderBy("MONTH","desc"));
            
            const response = await getDocs(ordenarPor);
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
                for (var key in temporal) {
                    if (temporal.hasOwnProperty(key)) {
                        let incremento = parseInt(key, 10);
                        // Iterar sobre las propiedades de cada objeto anidado
                        for (var subkey in temporal[key]) {
                            if (temporal[key].hasOwnProperty(subkey)) {
                                datosTemporal[key] = temporal[key];
                                
                                if (val.includes(datosTemporal[key].YEAR)) {
                                    delete datosTemporal[key];
                                } else {
                                    val.push(datosTemporal[key].YEAR)
                                }
                            }
                        }
                    }
                }
                setDatos(temporal);
                setYearSeccion(val);
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    //esta función se quedó aquí porque aún no sé cómo mandar parámetros
    //a otras partes de React XD
    window.mostrarOpciones = (evento) => {
        if(location.pathname.startsWith("/agregar/") && evento.target.tagName == 'P'){
            if(evento.type === 'mouseup'){
                eliminar(bd, ubicacion, evento.target.id);
            }else if(evento.type === 'mouseleave'){
                evento.target.style.color = 'black';
                evento.target.style.border = '1px solid transparent';
            }else if(evento.type === 'mouseover'){
                evento.target.style.color = 'red';
                evento.target.style.border = '1px solid';
            }
        }
        
    }

    //Esta función inicializa año viejo y actual con un dato vacío, para luego
    //asignarle PRIMERAMENTE al año actual. De este modo, al recorrer el arreglo por
    //años, preguntará si el año viejo (asignado al final) es igual al actual; de serlo
    // entonces solo agregará un caracter vacío. Si no, pues agregará el año ya que es un
    // año no detectado antes
    function textoFormateado(){
        var anioViejo;
        var anioActual;
        var contenidoAnios = [];

        Object.keys(datos).forEach(clave => {
            anioActual = datos[clave].YEAR;
            // 2030 == 2030?
            if(anioViejo == anioActual){
                //si, entonces no agregues nada, porque al desplegar años nos saldrían dos h2 de 2030, cuando los queremos AGRUPADOS.
                contenidoAnios.push(<h2 key={""} id={""}>{""}</h2>);
            }else{//2030 == 2029?
                //no, entonces agrega el nuevo año que está recorriendo; 2029
                contenidoAnios.push(<h2 key={datos[clave].YEAR} id={"year"+datos[clave].YEAR}>{datos[clave].YEAR}</h2>);
            }

            //aqui está el truco; asignamos el año viejo hasta el final para que el forEach al regresar, lea el año viejo y lo compare con el nuevo
            anioViejo = anioActual;
        });

        return[
            <div key={69}>
                {Object.entries(datos).map(([key, value]) => (
                    [
                    console.log(value.AUTHOR),
                    /* añadimos el titulo por año
                    si el arreglo trae el año repetido (''), entonces no muestres nada */,

                    // si trae datos (cualquier año), entonces muestra el h2
                    <h2 key={value.YEAR} id={"year"+value.YEAR}>{contenidoAnios[key].key}</h2>,
                    //desplegamos parrafo con la información acomodada
                    <p onMouseOver={mostrarOpciones} onMouseLeave={mostrarOpciones} onMouseUp={mostrarOpciones} key={value.id} id={value.id}>
                        <a>{"["+(parseInt(key)+1)+"] "}</a>
                        {
                            //si valor(value) es diferente de vacío,muestra lo que trae,
                            //si no,
                            //no muestres nada ('')
                            (value.PUBLISHER !== undefined  ? value.PUBLISHER + ", " : '')+
                            (value.MONTH !== undefined ? value.MONTH + ", " : '')+
                            (value.TITLE !== undefined  ? value.TITLE + ", " : '')+
                            (value.entryType !== undefined ? value.entryType + ", " : '')+
                            (value.VOLUME !== undefined ? value.VOLUME + ", " : '')+
                            (value.PAGES !== undefined  ? value.PAGES + ", " : '') +
                            (value.YEAR !== undefined ? value.YEAR + ", " : '' )+
                            (value.NUMBER !== undefined  ? value.NUMBER + ", " : '') +
                            (value.AUTHOR !== undefined  ? value.AUTHOR  + ", " : '') +
                            (value.JOURNAL !== undefined  ? value.JOURNAL  + ", " : '') +
                            (value.ISSN !== undefined  ? value.ISSN  + ", " : '') +
                            (value.DOI !== undefined  ? "doi: "+ value.DOI + ". " : '')
                        }
                        {/* link del DOI */}
                        <label key={"url"+value.URL}>{"Available: "}</label><a key={value.URL} href={value.URL}>{value.URL}</a>
                        </p>
                    ]))}
            </div>,
            // mostramos sección derecha con navegador por años
            <SeccionesDerecha key={2}/>
        ]
    }

    return [
        textoFormateado(),
        // mostramos sección derecha con navegador por años
        <SeccionesDerecha key={2}/>
    ];
};

export default MostrarTexto;