import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {bd} from '../../firebase.jsx';
import { collection, getDocs, orderBy, query} from "firebase/firestore";
import {eliminar} from './opcionesRegistros.js';
import SeccionesDerecha from './seccionesDerecha.jsx';
import parse from 'html-react-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInfo } from '@fortawesome/free-solid-svg-icons';
import { faOrcid, faResearchgate, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import 'tinymce/skins/content/default/content.min.css';

import Informacion from '../routes/secciones/informacion.jsx';

export function MostrarTexto (props) {
    const location = useLocation();
    const [abrir, setAbrir] = useState(false);
    let { ubicacion } = "";
    
    var temporal;
    let datosTemporal = {};
    const [datos, setDatos]= useState({});
    let val = [];

    //obtenemos la ubicación actual para saber qué colección de la base de datos leer.
    ubicacion = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    //aqui hay un detalle; cuando entramos a home la ubicación es vacía, por lo que no se puede leer. 
    //Asi que si la ubicación es vacía, entonces asignamos home
    ubicacion == '' ? ubicacion = 'home' : ubicacion = ubicacion;

    //saber si tinymce está inicializado
    useEffect(() => {
        if(location.pathname.startsWith("/agregar/home")){
            const interval = setInterval(() => {
                if (tinymce.activeEditor && tinymce.activeEditor.initialized) {
                    console.log("tinymce está inicializado");
                    tinymce.activeEditor.setContent(temporal[0].EDITORTEXT);
                    document.getElementById("id").value = temporal[0].id;
                    document.getElementById('banderaOpcion').value = 'editar';
                    clearInterval(interval); // Detener la verificación una vez que el contenido se ha cargado
                } else {
                  console.log("tinymce no está inicializado");
                }
              }, 500); // Verificar cada 500ms
          
              // Limpiar el intervalo al desmontar el componente
              return () => clearInterval(interval);
        }
    }, [temporal]);


    useEffect (() => {
        async function docSnap(){
            const coleccion = collection(bd, ubicacion);
            var ordenarPor;

            if(ubicacion === "students"){
                //si caemos en estudiantes, entonces ordenar por grado
                ordenarPor = query(coleccion, orderBy("DATEADD", "asc"));
            }else if (ubicacion === "home"){
                //si caemos en la página principal
                //solo mostramos la informacion completa
                ordenarPor = coleccion;
            }else if(ubicacion === "code"){
                //si caemos en la página de código, entonces ordenar por fecha de creación
                ordenarPor = query(coleccion, orderBy("DATEADD", "desc"));
            }else if(ubicacion === "projects" || ubicacion === "awards"){
                //si caemos en la página de projects o awards, entonces ordenar por fecha de creación
                ordenarPor = query(coleccion, orderBy("TITULO", "desc"));
            }else if(ubicacion === "projects"){
                //si caemos en la página de projects o awards, entonces ordenar por fecha de creación
                ordenarPor = query(coleccion, orderBy("DATEADD", "desc"));
            }else{
                //si caemos en cualquier otra página, entonces ordenar por año
                ordenarPor = query(coleccion, orderBy("YEAR", "desc"));

            }

            //obtenemos los documentos de la colección 
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
            
            //si el valor del botón es editar, entonces muestra los datos en los campos
            if(evento.target.value === 'editar'){
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const id = evento.target.id;
                const data = datos.find(d => d.id === id);

                document.getElementById("id").value = id;

                let resultMap = {};
                Object.keys(data).forEach(key => {
                    resultMap[key] = data[key];
                });

                if(ubicacion === "students"){
                    // no encontré una mejor forma de hacerlo, pero aquí se asignan los valores a los campos
                    document.getElementById("nombreAlumno").value = data.nombreAlumno;
                    document.getElementById("gradoAlumno").value = data.gradoAlumno;
                    document.getElementById("fechaInicioAlumno").value = data.fechaInicioAlumno;
                    document.getElementById("fechaGraduacionAlumno").value = data.fechaGraduacionAlumno;
                    document.getElementById("tituloTesisAlumno").value = data.tituloTesisAlumno;
                    document.getElementById("programaAlumno").value = data.programaAlumno;
                    document.getElementById("institucionAlumno").value = data.institucionAlumno;
                }else if(parent.document.getElementById('DOI')){
                    document.getElementById("DOI").value = data.DOI;
                }else if(ubicacion === "code" || ubicacion === "home"){
                    // si es la página de código o de inicio, entonces mostrar los datos
                    data.URLGH !== "" ? document.getElementById("githubLink").value = data.URLGH : document.getElementById("githubLink").value = "";
                    data.EDITORTEXT !== undefined ? tinymce.activeEditor.setContent((data.EDITORTEXT)) : tinymce.activeEditor.setContent('');
                }else if(ubicacion === "projects" || ubicacion === "awards"){
                    data.EDITORTEXT !== undefined ? tinymce.activeEditor.setContent((data.EDITORTEXT)) : tinymce.activeEditor.setContent('');
                }
                // marcamos la bandera para editar
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
            // 2030 == 2030?
            if(anioViejo == anioActual){
                //VERDADERO: entonces no agregues nada, porque al desplegar años nos saldrían dos h2 de 2030, cuando los queremos AGRUPADOS.
                contenidoAnios.push(<h2 className="subtitulos" key={""} id={""}>{""}</h2>);
            }else{//2030 == 2029?
                //FALSO: entonces agrega el nuevo año que está recorriendo; 2029
                contenidoAnios.push(<h2 className="subtitulos" key={datos[clave].YEAR} id={"year"+datos[clave].YEAR}>{datos[clave].YEAR}</h2>);
            }
            //aqui está el truco; asignamos el año viejo hasta el final para que el forEach al regresar, lea el año viejo y lo compare con el nuevo
            anioViejo = anioActual;
        });

        if (location.pathname.endsWith('students')) {
            const grados = {
                "3": "Doctorate",
                "2": "Master's degree",
                "1": "Engineering"
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
                <div id={"id"+Math.random()} key={"key"+Math.random()} className='texto-columnas'>
                    {Object.entries(alumnosPorGrado).sort(([a], [b]) => b - a).map(([grado, alumnos]) => (
                        <React.Fragment key={Math.random()}>
                            { location.pathname.startsWith("/agregar/") ?
                                <div style={{display:'flex'}} className='texto-columnas-bloque' id={'columna'+grado} key={'columna'+grado}>
                                <h2 id={"titulo"+grados[grado]} key={`titulo${grado}`} className='texto-columnas-bloque-titulos'>{grados[grado]}</h2>
                                {alumnos.map((alumno, index) => (
                                    <div id={`contenido${alumno.id}`} key={`contenido${alumno.id}`} className='texto-columnas-bloque-contenido'>
                                        {alumno.nombreAlumno !== undefined ? <h3 id={'nombre'+grado} key={'nombre'+grado} className='texto-columnas-bloque-contenido-datos'>{alumno.nombreAlumno}</h3> : ''}
                                        {alumno.fechaInicioAlumno !== undefined ? <p id={'fechaInicio'+grado} key={'fechaInicio'+grado} className='texto-columnas-bloque-contenido-datos'><b>Start date: </b>{alumno.fechaInicioAlumno}</p> : ''}
                                        {alumno.fechaGraduacionAlumno !== undefined ? <p id={'fechaGraduacion'+grado} key={'fechaGraduacion'+grado} className='texto-columnas-bloque-contenido-datos'><b>Graduation date: </b>{alumno.fechaGraduacionAlumno}</p> : ''}
                                        {alumno.tituloTesisAlumno !== undefined ? <p id={'tituloTesis'+grado} key={'tituloTesis'+grado} className='texto-columnas-bloque-contenido-datos'><b>Thesis: </b>{alumno.tituloTesisAlumno}</p> : ''}
                                        {alumno.programaAlumno !== undefined ? <p id={'programa'+grado} key={'programa'+grado} className='texto-columnas-bloque-contenido-datos'><b>Program: </b>{alumno.programaAlumno}</p> : ''}
                                        {alumno.institucionAlumno !== undefined ? <p id={'institucion'+grado} key={'institucion'+grado} className='texto-columnas-bloque-contenido-datos'><b>Institution: </b>{alumno.institucionAlumno}</p> : ''}
                                        { location.pathname.startsWith("/agregar/") ?
                                            <div className='opciones' key={`opciones${alumno.id}`}>
                                                <button className="botonEditar" key={`editar${alumno.id}`} id={alumno.id} value="editar" onClick={mostrarOpciones}>Editar</button>
                                                <button className="botonEliminar" key={`eliminar${alumno.id}`} id={alumno.id} value="eliminar" onClick={mostrarOpciones}>Eliminar</button>
                                            </div>
                                        : null
                                        }
                                        {/* // mostrar separador solo si no es el último elemento */}
                                        {index < alumnos.length - 1 && <div id={`separador${alumno.nombreAlumno}`} key={`separador${alumno.nombreAlumno}`} className='texto-columnas-bloque-contenido-separador'/>}
                                        {/* <div id={`separador${alumno.nombreAlumno}`} key={`separador${alumno.nombreAlumno}`} className='texto-columnas-bloque-contenido-separador'/> */}
                                        </div>
                                ))}
                                </div>
                            : 
                            <div id={'columna'+grado} key={'columna'+grado} className='texto-columnas-bloque'>
                                {/* aqui se cambió el color de fondo y bordes de los bloques de texto */}
                                <div id={`bloque${grado}`} key={`bloque${grado}`} style={{backgroundColor: '#f0f0f0', borderRadius: '0.5em 0.5em'}} >
                                    <h2 id={"titulo"+grados[grado]} key={`titulo${grado}`} className='texto-columnas-bloque-titulos'>{grados[grado]}</h2>
                                    {alumnos.map((alumno, index) => (
                                        <div id={`contenido${alumno.id}`} key={`contenido${alumno.id}`} className='texto-columnas-bloque-contenido'>
                                            {alumno.nombreAlumno !== undefined ? <h3 id={alumno.nombreAlumno} key={`nombre${alumno.id}`} className='texto-columnas-bloque-contenido-datos'>{alumno.nombreAlumno}</h3> : ''}
                                            {alumno.fechaInicioAlumno !== undefined ? <p id={alumno.fechaInicioAlumno} key={`fechaInicio${alumno.id}`} className='texto-columnas-bloque-contenido-datos'><b>Start date: </b>{alumno.fechaInicioAlumno}</p> : ''}
                                            {alumno.fechaGraduacionAlumno !== undefined ? <p id={alumno.fechaGraduacionAlumno} key={`fechaGraduacion${alumno.id}`} className='texto-columnas-bloque-contenido-datos'><b>Graduation date: </b>{alumno.fechaGraduacionAlumno}</p> : ''}
                                            {alumno.tituloTesisAlumno !== undefined ? <p id={alumno.tituloTesisAlumno} key={`tituloTesis${alumno.id}`} className='texto-columnas-bloque-contenido-datos'><b>Thesis: </b>{alumno.tituloTesisAlumno}</p> : ''}
                                            {alumno.programaAlumno !== undefined ? <p id={alumno.programaAlumno} key={`programa${alumno.id}`} className='texto-columnas-bloque-contenido-datos'><b>Program: </b>{alumno.programaAlumno}</p> : ''}
                                            {alumno.institucionAlumno !== undefined ? <p id={alumno.institucionAlumno} key={`institucion${alumno.id}`} className='texto-columnas-bloque-contenido-datos'><b>Institution: </b>{alumno.institucionAlumno}</p> : ''}
                                            {/* mostrar separador solo si no es el último elemento */}
                                            {index < alumnos.length - 1 && <div id={`separador${alumno.nombreAlumno}`} key={`separador${alumno.nombreAlumno}`} className='texto-columnas-bloque-contenido-separador'/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        </React.Fragment>
                    ))}
                </div>
            );
        }else if(ubicacion == "home"){
            return(
                <>
                    <div className='item-home-contenido'>
                        {datos[0] === undefined ? null : 
                        <img className='item-home-contenido-img' src={datos[0].IMAGENPERFIL}/>}
                        <div className='item-home-links'>
                            <a href='https://orcid.org/0000-0003-1812-5736' target="_blank">
                                <div className='item-home-links-individual'>
                                    {/* <img className='item-home-links-individual-img' width="16" height="16" src='https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/iconos/orcid.ico'/> */}
                                    <FontAwesomeIcon className='item-home-links-individual-img' icon={faOrcid} />
                                    <span className='item-home-links-individual-texto'>ORCID</span>
                                </div>
                            </a>
                            <a href='https://www.researchgate.net/profile/Leonardo-Trujillo-2' target="_blank">
                                <div className='item-home-links-individual'>
                                    <FontAwesomeIcon className='item-home-links-individual-img' icon={faResearchgate} />
                                    <span className='item-home-links-individual-texto'>Research Gate</span>
                                </div>
                            </a>
                            <a href='https://dblp.org/pid/62/1755.html' target="_blank">
                                <div className='item-home-links-individual'>
                                    <img className='item-home-links-individual-img' width="16" height="16" src='https://raw.githubusercontent.com/mich-iv/Leonardo-Trujillo-web/refs/heads/pruebas/src/assets/iconos/dblp.ico'/>
                                    <span className='item-home-links-individual-texto'>dblp</span>
                                </div>
                            </a>
                            <a href='https://scholar.google.com/citations?user=xXh3xRYAAAAJ' target="_blank">
                                <div className='item-home-links-individual'>
                                <FontAwesomeIcon className='item-home-links-individual-img' icon={faGoogleScholar} />
                                <span className='item-home-links-individual-texto'>Google Scholar</span>
                                </div>
                            </a>
                            <a href='mailto:leonardo.trujillo.tttl@gmail.com'>
                                <div className='item-home-links-individual'>
                                <FontAwesomeIcon className='item-home-links-individual-img' icon={faEnvelope}/>
                                <span className='item-home-links-individual-texto'>Email</span>
                                </div>
                            </a>
                        </div>
                        <div className='informacion'>
                            <div className='informacion-boton-abrir' onClick={() => setAbrir(true)}>
                                <FontAwesomeIcon className="informacion-boton-abrir-faInfo" icon={faInfo}/>
                            </div>
                            About
                        </div>
                        <Informacion abrir={abrir} cerrar = {() => setAbrir(false)}/>
                    </div>

                    <div className='item-home-texto'>
                        <h2 key={82613135}>
                            Information
                        </h2>

                        <div key={8213135} className='texto' style={{padding: "0"}} >
                            {Object.entries(datos).map(([key, value]) => (
                                <div key={`key-${value.id}`} id={value.id}>
                                    {value.EDITORTEXT !== undefined ? (parse(value.EDITORTEXT)) : null}
                                    { location.pathname.startsWith("/agregar/") ?
                                        <>
                                        <div style={{display:'flex'}} key={`opcione-s${value.id}`}>
                                            <button className="botonEditar" key={`edita-r${value.id}`} id={value.id} value="editar" onClick={mostrarOpciones}>Edit</button>
                                            <button className="botonEliminar" key={`eliminar-${value.id}`} id={value.id} value="eliminar" onClick={mostrarOpciones}>Delete</button>
                                            <br/><br/>
                                        </div>
                                        </>
                                        : null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
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
                            <h2 className="subtitulos" key={value.YEAR} id={"titulo"+contenidoAnios[key].key}><b>{contenidoAnios[key].key}</b></h2> : '',
                            //desplegamos parrafo con la información acomodada
                            <div key={value.id} id={value.id}>
                                {location.pathname.endsWith('code') || location.pathname.endsWith('projects') || location.pathname.endsWith('awards') ? null : <label>{"["+(parseInt(key)+1)+"] "}</label>}
                                {/* si traemos texto, entonces mostrar primero */}
                                {location.pathname.endsWith('bookChapters') ? 
                                <>
                                    {/* 
                                    si valor(value.AUTHOR) es diferente de vacío o undefined, entonces ("?")
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
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL} target="_blank" title={'CLick to open \"'+value.TITLE+'\" in a new tab.'}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('journalPublications') ? 
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : 'Unknown author, '}
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
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL} target="_blank" title={'CLick to open \"'+value.TITLE+'\" in a new tab.'}>{value.URL}</a>
                                    </>
                                : location.pathname.endsWith('conferencePapers') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' : 
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : 'Unknown author, '}
                                    {value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}
                                    {value.BOOKTITLE !== undefined || value.JOURNAL !== undefined ? ("in ") : ''}
                                    {/* aquí pregunto que si trae booktitle lo ponga, si no, que ponga journal */}
                                    <i>{value.BOOKTITLE !== undefined  ? (value.BOOKTITLE  + ", ") : value.JOURNAL !== undefined  ? (value.JOURNAL  + ", ") : ''}</i> 
                                    {value.LOCATION !== undefined  ? (value.LOCATION  + ", ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ", ") : '' }
                                    {value.PAGES !== undefined  ? ("pp. " + value.PAGES + ". ") : ''}
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL} target="_blank" title={'CLick to open \"'+value.TITLE+'\" in a new tab.'}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('books') ? 
                                value.TEXT !== undefined ? (value.MONTH + ", " + value.TEXT) + '' :
                                <>
                                    {value.AUTHOR !== undefined  ? (value.AUTHOR  + ", ") : 'Unknown author, '}
                                    <i>{value.TITLE !== undefined  ? ("\"" + value.TITLE + ",\" ") : ''}</i>
                                    {value.EDITION !== undefined  ? (value.EDITION  + ", ") : ''}
                                    {value.LOCATION !== undefined  ? (value.LOCATION  + ": ") : ''}
                                    {value.PUBLISHER !== undefined  ? (value.PUBLISHER + ", ") : ''}
                                    {value.YEAR !== undefined ? (value.YEAR + ". ") : '' }
                                    {/* link del DOI */}
                                    {value.TEXT !== undefined ? "" : ""}
                                    <label key={"url"+value.URL}>{value.TEXT !== undefined ? "" : "Available at: "}</label><a className="texto-link" key={value.URL} href={value.URL} target="_blank" title={'CLick to open \"'+value.TITLE+'\" in a new tab.'}>{value.URL}</a>
                                </>
                                : location.pathname.endsWith('code') ?
                                <>  
                                    <label className='columnas-contenido'>
                                        <label className='informacion-texto'>{value.EDITORTEXT !== undefined ? parse(value.EDITORTEXT) : null}</label>
                                        <label className='informacion-link'>
                                            <a href={value.URLGH} title="Click to view on GitHub" target="_blank" className='informacion-link-titulo'>{value.REPOSITORYGH}</a>
                                            <label className='informacion-link-descripcion'>{value.DESCRIPTIONGH}</label>
                                            <a href={value.URLGH} title="Click to view on GitHub" target="_blank"><img className="informacion-link-img" src={`data:image/jpg;base64,${value.IMAGEGH}`} /></a>
                                        </label>
                                    </label>
                                    {/* {value.IMAGE !== undefined ? <a className='columnas-contenido-img' href={value.GITHUB} title="Click to view on GitHub" target="_blank"><img className="imagenGithub" src={`data:image/jpg;base64,${value.IMAGE}`} /></a> : ''} */}
                                </>
                                : location.pathname.endsWith('projects') || location.pathname.endsWith('awards') ?
                                <>
                                    {value.EDITORTEXT !== undefined ? parse(value.EDITORTEXT) : null}
                                </>
                                :
                                <>
                                    {/* si no es ninguno de los anteriores, no muestres nada*/}
                                </> }
                                { 
                                    location.pathname.startsWith("/agregar/") ?
                                    <div className='opciones' key={`opciones${value.id}`}>
                                        <button className="botonEditar" key={"editar"} id={value.id} value="editar" onClick={mostrarOpciones}>Edit</button>
                                        <button className="botonEliminar" key={"eliminar"} id={value.id} value="eliminar" onClick={mostrarOpciones}>Delete</button>
                                    </div>
                                    : null
                                }
                            </div>,
                        ]
                        ))}
                </div>,
            ]
        }
    }

    return [
        textoFormateado(),
        //mostramos sección derecha con navegador por años
        ubicacion === "home" ? null :
            <SeccionesDerecha key={2453636} ubicacion={ubicacion}/>
    ];
};

export default MostrarTexto;