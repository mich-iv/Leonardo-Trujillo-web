import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import {bd, collection, getDocs, doc, getDoc, orderBy, query} from '../../firebase.jsx';
import {editar, eliminar} from './opcionesRegistros.js';
import SeccionesDerecha from './seccionesDerecha.jsx';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export function MostrarTexto (props) {
    const location = useLocation();
    let { ubicacion } = "";
    
    var temporal;
    let datosTemporal = {};
    const [datos, setDatos]= useState({});
    let val = [];

    //obtenemos la ubicación actual para saber qué colección de la base de datos leer.
    // ubicacion = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    //obtenemos la ubicacion  con el parametro que se le pasa
    ubicacion = props.ubicacion;

    console.log(props.ubicacion);

    useEffect (() => {
        async function docSnap(){
            const coleccion = collection(bd, ubicacion);
            var ordenarPor;

            if(ubicacion === "students"){
                //si caemos en estudiantes, entonces ordenar por grado
                ordenarPor = query(coleccion, orderBy("gradoAlumno", "desc"));
            }else{
                //si no, entonces ordenar por fecha
                ordenarPor = query(coleccion, orderBy("DATE","desc"));
            }

            //obtenemos los documentos de la colección 
            const response = await getDocs(ordenarPor);
            const docs = response.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            console.log(docs);
            
            return docs;
        }
        docSnap().then(valor => {
            temporal = valor;
            try {
                for (var key in temporal) {
                    if (temporal.hasOwnProperty(key)) {
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
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    //esta función se quedó aquí porque aún no sé cómo mandar parámetros
    //a otras partes de React XD
    window.mostrarOpciones = (evento) => {
        if(location.pathname.startsWith("/agregar/")){
            document.getElementById("banderaOpcion").value = null;

            if(evento.target.value === 'editar'){
                const id = evento.target.id;
                const data = datos.find(d => d.id === id);

                document.getElementById("id").value = id;
                console.log(id);
                
                
                let resultMap = {};
                Object.keys(data).forEach(key => {
                    resultMap[key] = data[key];
                });

                if(document.getElementById("banderaOpcion").value === "editar"){
                    editar(bd, ubicacion, evento.target.id, resultMap);
                }else{
                    document.getElementById("nombreAlumno").value = data.nombreAlumno;
                    document.getElementById("gradoAlumno").value = data.gradoAlumno;
                    document.getElementById("fechaInicioAlumno").value = data.fechaInicioAlumno;
                    document.getElementById("fechaGraduacionAlumno").value = data.fechaGraduacionAlumno;
                    document.getElementById("tituloTesisAlumno").value = data.tituloTesisAlumno;
                    document.getElementById("programaAlumno").value = data.programaAlumno;
                    document.getElementById("institucionAlumno").value = data.institucionAlumno;
                }

                document.getElementById("banderaOpcion").value = "editar";
            }else if(evento.target.value === 'eliminar'){
                eliminar(bd, ubicacion, evento.target.id);
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
            // console.log("Entrada - " + anioActual);
            // 2030 == 2030?
            if(anioViejo == anioActual){
                // console.log("TRUE - " + anioViejo +":"+ anioActual);
                //VERDADERO: entonces no agregues nada, porque al desplegar años nos saldrían dos h2 de 2030, cuando los queremos AGRUPADOS.
                contenidoAnios.push(<h2 key={""} id={""}>{""}</h2>);
            }else{//2030 == 2029?
                // console.log("FALSE - " + anioViejo +":"+ anioActual);
                //FALSO: entonces agrega el nuevo año que está recorriendo; 2029
                contenidoAnios.push(<h2 key={datos[clave].YEAR} id={"year"+datos[clave].YEAR}>{datos[clave].YEAR}</h2>);
            }
            //aqui está el truco; asignamos el año viejo hasta el final para que el forEach al regresar, lea el año viejo y lo compare con el nuevo
            // console.log(contenidoAnios);
            anioViejo = anioActual;
        });


        if (ubicacion === "students") {
            const grados = {
                "4": "PhD",
                "3": "Postgraduate degree",
                "2": "Master’s degree",
                "1": "College degree"
            };
        
            const alumnosPorGrado = Object.entries(datos).reduce((acc, [key, value]) => {
                if (value.gradoAlumno !== undefined) {
                    if (!acc[value.gradoAlumno]) {
                        acc[value.gradoAlumno] = [];
                    }
                    acc[value.gradoAlumno].push(value);
                }
                return acc;
            }, {});
        
            return (
                <>
                    {Object.entries(alumnosPorGrado).map(([grado, alumnos]) => (
                        <div className='texto-columnas-bloque' key={grado}>
                            {/* aqui se cambió el color de fondo y bordes de los bloques de texto */}
                            <div style={{backgroundColor: '#f0f0f0', borderRadius: '0.5em 0.5em'}}>
                                <h2 className='texto-columnas-bloque-titulos'>{grados[grado]}</h2>
                                {alumnos.map((alumno, index) => (
                                    <div key={index} className='texto-columnas-bloque-contenido'>
                                        {alumno.nombreAlumno !== undefined ? <h3 className='texto-columnas-bloque-contenido-datos'>{alumno.nombreAlumno}</h3> : ''}
                                        {alumno.fechaInicioAlumno !== undefined ? <p className='texto-columnas-bloque-contenido-datos'><b>Start date: </b>{alumno.fechaInicioAlumno}</p> : ''}
                                        {alumno.fechaGraduacionAlumno !== undefined ? <p className='texto-columnas-bloque-contenido-datos'><b>Graduation date: </b>{alumno.fechaGraduacionAlumno}</p> : ''}
                                        {alumno.tituloTesisAlumno !== undefined ? <p className='texto-columnas-bloque-contenido-datos'><b>Thesis: </b>{alumno.tituloTesisAlumno}</p> : ''}
                                        {alumno.programaAlumno !== undefined ? <p className='texto-columnas-bloque-contenido-datos'><b>Program: </b>{alumno.programaAlumno}</p> : ''}
                                        {alumno.institucionAlumno !== undefined ? <p className='texto-columnas-bloque-contenido-datos'><b>Institution: </b>{alumno.institucionAlumno}</p> : ''}
                                        
                                        <div className='texto-columnas-bloque-contenido-separador'/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            );
        }else{
            return[
                <div key={69} id='69'>
                    {Object.entries(datos).map(([key, value]) => (
                        [
                            /* añadimos el titulo por año
                            si el arreglo trae el año repetido (''), entonces no muestres nada */,

                            // si trae datos (cualquier año), entonces muestra el h2 con el año
                            (contenidoAnios[key].key.length > 0) ? 
                            <h2 key={value.YEAR} id={"year"+contenidoAnios[key].key}><b>{contenidoAnios[key].key}</b></h2> : '',
                            //desplegamos parrafo con la información acomodada
                            <p key={value.id} id={value.id}>
                                <label>{"["+(parseInt(key)+1)+"] "}</label>
                                {/* si traemos texto, entonces mostrar primero */}
                                {location.pathname.endsWith('bookChapters') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' : 
                                <>
                                    {/* 
                                    si valor(value.TITLE) es diferente de vacío o undefined, entonces ("?")
                                    muestra lo que trae,
                                    si no (else, o dos puntos ":"), no muestres nada ('') 
                                    */}
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : 'Unknown author, ' }
                                    {value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}
                                    {value.BOOKTITLE !== undefined || value.JOURNAL !== undefined ? ("in ") : ''}
                                    {/* aquí pregunto que si trae booktitle lo ponga, si no, que ponga journal */}
                                    <i>{value.BOOKTITLE !== undefined  ? (value.BOOKTITLE  + ", ") : value.JOURNAL !== undefined  ? (value.JOURNAL  + ", ") : ''}</i>
                                    {value.EDITION !== undefined  ? (value.EDITION  + ". ") : ''}
                                    {value.PUBLISHER !== undefined  ? (value.PUBLISHER + ", ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ", ") : '' }
                                    {value.PAGES !== undefined  ? ("pp. " + value.PAGES + ". ") : ''}
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('journalPublications') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' : 
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : ''}
                                    {value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}
                                    {value.JOURNAL !== undefined || value.BOOKTITLE !== undefined ? ("in ") : ''}
                                    {/* aquí pregunto que si trae booktitle lo ponga, si no, que ponga journal */}
                                    <i>{value.JOURNAL !== undefined  ? (value.JOURNAL  + ", ") : value.BOOKTITLE !== undefined  ? (value.BOOKTITLE  + ", ") : ''}</i>
                                    {value.VOLUME !== undefined ? ("vol. " + value.VOLUME + ", ") : ''}
                                    {value.ISSUE !== undefined ? (value.ISSUE + ", ") : '' }
                                    {value.PAGES !== undefined  ? ("pp. " + value.PAGES + ", ") : ''}
                                    {value.MONTH !== undefined ? (value.MONTH.substring(0,3) + " ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ". ") : '' }
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL}>{value.URL}</a>
                                    </>
                                : location.pathname.endsWith('conferencePapers') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' : 
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : ''}
                                    {value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}
                                    {value.BOOKTITLE !== undefined || value.JOURNAL !== undefined ? ("in ") : ''}
                                    {/* aquí pregunto que si trae booktitle lo ponga, si no, que ponga journal */}
                                    <i>{value.BOOKTITLE !== undefined  ? (value.BOOKTITLE  + ", ") : value.JOURNAL !== undefined  ? (value.JOURNAL  + ", ") : ''}</i> 
                                    {value.LOCATION !== undefined  ? (value.LOCATION  + ", ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ", ") : '' }
                                    {value.PAGES !== undefined  ? ("pp. " + value.PAGES + ". ") : ''}
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('books') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' :
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : ''}
                                    <i>{value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}</i>
                                    {value.EDITION !== undefined  ? (value.EDITION  + ", ") : ''}
                                    {value.LOCATION !== undefined  ? (value.LOCATION  + ": ") : ''}
                                    {value.PUBLISHER !== undefined  ? (value.PUBLISHER + ", ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ". ") : '' }
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('students') ?
                                <>
                                    <div className='texto-columnas'>
                                    {value.gradoAlumno !== undefined  ? value.gradoAlumno == "4" ? 
                                        <>
                                            <div className=''> 
                                                <h1>PhD</h1>
                                                {value.nombreAlumno !== undefined  ? (value.nombreAlumno  + ", ") : ''}
                                                {value.gradoAlumno !== undefined  ? (value.gradoAlumno + ", ") : ''}
                                                {value.fechaInicioAlumno !== undefined  ? (value.fechaInicioAlumno  + ", ") : ''}
                                                {value.graduadoAlumno !== undefined  ? (value.graduadoAlumno  + ": ") : ''}
                                                {value.tituloTesisAlumno !== undefined  ? (value.tituloTesisAlumno + ", ") : ''}
                                                {value.programaAlumno !== undefined  ? (value.programaAlumno + ", ") : ''}
                                                {value.institucionAlumno !== undefined  ? (value.institucionAlumno + "") : ''}
                                            </div>
                                        </>
                                    : '' : ''}
                                    {value.gradoAlumno !== undefined  ? value.gradoAlumno == "3" ? 
                                        <>
                                            <div>
                                                <h1>Postgraduate degree</h1>
                                                {value.nombreAlumno !== undefined  ? (value.nombreAlumno  + ", ") : ''}
                                                {value.gradoAlumno !== undefined  ? (value.gradoAlumno + ", ") : ''}
                                                {value.fechaInicioAlumno !== undefined  ? (value.fechaInicioAlumno  + ", ") : ''}
                                                {value.graduadoAlumno !== undefined  ? (value.graduadoAlumno  + ": ") : ''}
                                                {value.tituloTesisAlumno !== undefined  ? (value.tituloTesisAlumno + ", ") : ''}
                                                {value.programaAlumno !== undefined  ? (value.programaAlumno + ", ") : ''}
                                                {value.institucionAlumno !== undefined  ? (value.institucionAlumno + "") : ''}
                                            </div>
                                        </> 
                                    : '' : ''}
                                    {value.gradoAlumno !== undefined  ? value.gradoAlumno == "2" ? 
                                        <>
                                            <div>
                                                <h1>Master’s degree</h1>
                                                {value.nombreAlumno !== undefined  ? (value.nombreAlumno  + ", ") : ''}
                                                {value.gradoAlumno !== undefined  ? (value.gradoAlumno + ", ") : ''}
                                                {value.fechaInicioAlumno !== undefined  ? (value.fechaInicioAlumno  + ", ") : ''}
                                                {value.graduadoAlumno !== undefined  ? (value.graduadoAlumno  + ": ") : ''}
                                                {value.tituloTesisAlumno !== undefined  ? (value.tituloTesisAlumno + ", ") : ''}
                                                {value.programaAlumno !== undefined  ? (value.programaAlumno + ", ") : ''}
                                                {value.institucionAlumno !== undefined  ? (value.institucionAlumno + "") : ''}
                                            </div>
                                        </> 
                                    : '' : ''}
                                    {value.gradoAlumno !== undefined  ? value.gradoAlumno == "1" ? 
                                        <>
                                            <div>
                                                <h1>College degree</h1>
                                                {value.nombreAlumno !== undefined  ? (value.nombreAlumno  + ", ") : ''}
                                                {value.gradoAlumno !== undefined  ? (value.gradoAlumno + ", ") : ''}
                                                {value.fechaInicioAlumno !== undefined  ? (value.fechaInicioAlumno  + ", ") : ''}
                                                {value.graduadoAlumno !== undefined  ? (value.graduadoAlumno  + ": ") : ''}
                                                {value.tituloTesisAlumno !== undefined  ? (value.tituloTesisAlumno + ", ") : ''}
                                                {value.programaAlumno !== undefined  ? (value.programaAlumno + ", ") : ''}
                                                {value.institucionAlumno !== undefined  ? (value.institucionAlumno + "") : ''}
                                            </div>
                                        </> 
                                    : '' : ''}
                                    </div>
                                </>
                                : location.pathname.endsWith('code') ?
                                value.NAME !== undefined ? (value.NAME + ", " + value.NAME) + '' :
                                <>
                                    {/* si no es ninguno de los anteriores, solo muestra el texto*/}
                                    {value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT + ":"+value.DATE+":") + ', ' : ''}
                                    {value.EDITORTEXT !== undefined ? parse(value.EDITORTEXT) : ''}
                                    <label className='columnas-contenido'>
                                        <label className='informacion-link'>
                                            <a href={value.REPOSITORYGH} className='informacion-link-titulo'>{value.REPOSITORYGH}</a>
                                            <label className='informacion-link-descripcion'>{value.DESCRIPTIONGH}</label>
                                            <a href={value.URLGH} title="Click to view on GitHub" target="_blank"><img className="informacion-link-img" src={`data:image/jpg;base64,${value.IMAGEGH}`} /></a>
                                        </label>
                                    </label>
                                    {/* {value.IMAGE !== undefined ? <a className='columnas-contenido-img' href={value.GITHUB} title="Click to view on GitHub" target="_blank"><img className="imagenGithub" src={`data:image/jpg;base64,${value.IMAGE}`} /></a> : ''} */}
                                </>
                                : <>
                                    {/* si no es ninguno de los anteriores, solo muestra el texto*/}
                                </> }
                                { location.pathname.startsWith("/agregar/") ?
                                    <>
                                        <br/>
                                        <button className="botonEditar" key={"editar"} id={value.id} value="editar" onClick={mostrarOpciones}>Editar</button>
                                        <button className="botonEliminar" key={"eliminar"} id={value.id} value="eliminar" onClick={mostrarOpciones}>Eliminar</button>
                                    </>
                                    : ''
                                }
                                
                            </p>,
                        ]
                        ))}
                </div>,
            ]
        }
    }

    return [
        textoFormateado(),
        //mostramos sección derecha con navegador por años
        <SeccionesDerecha key={2}/>
    ];
};

export default MostrarTexto;