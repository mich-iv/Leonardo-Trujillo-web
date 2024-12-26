import React, { useEffect, useState , useRef } from 'react'

import { useNavigate, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { bd, collection, doc, getDocs, deleteDoc } from '../../../firebase.jsx';
import { setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {EditorTexto} from '../../routes/secciones/EditorTexto.jsx';

import '../../estilos/Menu.css';

import '../../estilos/Paginas.css';

import parse from 'bibtex-parser';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

import {editar} from '../../Componentes/opcionesRegistros.js';

import parseReact from 'html-react-parser';

import tinymce from 'tinymce/tinymce.min.js';
import { set, update } from 'firebase/database';
// import { randomInt } from 'firebase-tools/lib/utils.js';

export default function Route(){
    //obtenemos la ruta actual del url
    const { ubicacion } = useParams();

    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [nombre, setNombre] = useState("");

    const sesion = getAuth();

    var resultMap = {};

    const [doiLabel, setDOILabel] = useState("");
    const [linkLabel, setLinkLabel] = useState("");
    const [textoDate, setTextoDate] = useState("");
    const [textoYear, setTextoYear] = useState("");
    const [textoMonth, setTextoMonth] = useState("");
    const [textoCampo, setTextoCampo] = useState("");

    const [nombreAlumno, setNombreAlumno] = useState("");
    const [gradoAlumno, setGradoAlumno] = useState("");
    const [fechaInicioAlumno, setFechaInicioAlumno] = useState("");
    const [fechaGraduacionAlumno, setFechaGraduacionAlumno] = useState("");
    const [tituloTesisAlumno, setTituloTesisAlumno] = useState("");
    const [programaAlumno, setProgramaAlumno] = useState("");
    const [institucionAlumno, setInstitucionAlumno] = useState("");

    const [textoExtraido, setTextoExtraido] = useState("");

    var informacionEncontrada = false;

    var imagenBase64 = '';
    var repositoryGH = '';
    var descriptionGH = '';
    var urlGH = '';

    var respuesta;

    String.prototype.hashCode = function() {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    const getInfoGitHub = (link) => {
        var usuarioGH = link.split('/')[3];
        var repositorioGH = link.split('/')[4];
        var numeroHash = usuarioGH.hashCode() + (Math.floor(Math.random() * 10000000) + 1);
        console.log(usuarioGH);
        console.log(repositorioGH);
        console.log(numeroHash);
        
        // https://opengraph.githubassets.com/
        const apiUrl = `https://opengraph.githubassets.com/${numeroHash}/${usuarioGH}/${repositorioGH}`;
        
        // URL de la API de GitHub para obtener información del repositorio
        const repoUrl = `https://api.github.com/repos/${usuarioGH}/${repositorioGH}`;


        fetch(apiUrl, {
            headers:{
                "Accept": "image/png"
            }
        })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                setDOILabel('');
                document.getElementById("textoMostrar").innerHTML = '';
                document.getElementById("confirmacion").style.color = 'red'; 
                document.getElementById("confirmacion").innerHTML = "Image not found";
            throw new Error('Error en la solicitud');
            }
            informacionEncontrada = true;
            
            // Convertir la respuesta a JSON
            console.log(response);
            
            return response.blob();
        })
        .then(blob => {
            // Convertir el blob a base64
            const reader = new FileReader();
            reader.onloadend = () => {
                let base64data = reader.result;
                
                // Mostrar la imagen en el elemento con id "imagenMostrar"
                const imgElement = document.createElement("img");
                imgElement.src = base64data;
                imgElement.alt = "Fetched Image";
                imgElement.style.maxWidth = "100%";
                
                const imagenMostrar = document.getElementById("imagenMostrar");
                imagenMostrar.innerHTML = ''; // Limpiar contenido anterior
                imagenMostrar.appendChild(imgElement);

                // Eliminar el prefijo "data:image/png;base64,"
                base64data = base64data.replace(/^data:image\/(png|jpg);base64,/, '');
    
                imagenBase64 = base64data;
                // resultMap["IMAGE"] = base64data;
                
                document.getElementById("confirmacion").innerHTML = "Image found:";
                document.getElementById("confirmacion").style.color = 'green';
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
        });

        // Fetch para obtener la información del repositorio
        fetch(repoUrl, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Mostrar la información del repositorio en el elemento con id "textoMostrar"
            const textoMostrar = document.getElementById("textoMostrar");
            textoMostrar.innerHTML = `
                <p><strong>Repository Name:</strong> ${data.name}</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Stars:</strong> ${data.stargazers_count}</p>
                <p><strong>Forks:</strong> ${data.forks_count}</p>
                <p><strong>Open Issues:</strong> ${data.open_issues_count}</p>
                <p><strong>URL:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            `;

            // Guardar la información en variables globales
            repositoryGH = data.name;
            descriptionGH = data.description;
            urlGH = data.html_url;
            // resultMap["STARS"] = data.stargazers_count;
            // resultMap["FORKS"] = data.forks_count;
            // resultMap["ISSUES"] = data.open_issues_count;

        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
        });
    }
    
    const getFicha = (doi) => {
        const apiUrl = `https://doi.org/${doi}`;
        
        fetch(apiUrl, {
            headers:{
                "Accept": "application/x-bibtex; style=ieee"
            }
        })
            .then(response => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    setDOILabel('');
                    document.getElementById("textoMostrar").innerHTML = '';
                    document.getElementById("confirmacion").style.color = 'red'; 
                    document.getElementById("confirmacion").innerHTML = "DOI not found";
                    throw new Error('Error en la solicitud');
                }
                informacionEncontrada = true;
                
                // Convertir la respuesta a JSON
                return response.text();
            })
            .then(data => {
                document.getElementById("textoMostrar").innerHTML = '';
                // Procesar los datos de la respuesta
                let horaActual = new Date();
                var mes;
                var anio;
                var fecha;
                respuesta = parse(data);
                
                for (const [key, value] of Object.entries(respuesta)) {
                    for (let [llave, valor] of Object.entries(value)) {
                        if(llave == 'MONTH'){
                            mes = valor;
                        }
                        if(llave == 'YEAR'){
                            anio = valor;
                        }

                        fecha = (mes + " 01, " + anio + " 5:00 AM");

                        if(mes != undefined && anio != undefined){
                            var fechaFormateada = new Date(fecha);
                            resultMap["DATE"] = fechaFormateada;
                        }

                        resultMap[llave] = valor;

                        document.getElementById("textoMostrar").innerHTML += llave +": "+ valor + "." + "<br/>";
                        document.getElementById("textoMostrar").innerHTML += "\n";
                    }
                }
                resultMap["DATEADD"] = horaActual;
                document.getElementById("confirmacion").innerHTML = "DOI found:";
                document.getElementById("confirmacion").style.color = 'green'; 

                console.log(resultMap);
                
            })
            .catch(error => {
                // Manejar errores
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        onAuthStateChanged(sesion, (usuario) => {
        if (usuario) {
            setToken(usuario.accessToken);
            setNombre(usuario.displayName);
        }else{
            navigate("/");
        }
        })
    }, []) 

    const submit = (e) => {
        if(tinymce.activeEditor != null){
            var textoEditor = tinymce.activeEditor.getContent("editorTinyMCE");
        }else{
            var textoEditor = '';
        }
        
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const fechaNueva = new Date();
        
        console.log(fechaNueva);
        console.log(fechaNueva.getFullYear());
        console.log(month[fechaNueva.getMonth()]);

        if(ubicacion == 'bookChapters' || ubicacion == 'journalPublications' || ubicacion == 'conferencePapers' || ubicacion == 'books'){
            if(doiLabel != '' && informacionEncontrada == false){
                alert('A DOI was entered, but it was not found or the button to obtain it has not been clicked');
            }else{
                resultMap["DOI"] = doiLabel;
            }
        }else if(ubicacion == 'students'){
            if(nombreAlumno == '' || gradoAlumno == '' || fechaInicioAlumno == '' || fechaGraduacionAlumno == '' || tituloTesisAlumno == '' || programaAlumno == '' || institucionAlumno == ''){
                alert('There is no information to add');
            }else{
                resultMap["nombreAlumno"] = nombreAlumno;
                resultMap["gradoAlumno"] = gradoAlumno;
                resultMap["fechaInicioAlumno"] = fechaInicioAlumno;
                resultMap["fechaGraduacionAlumno"] = fechaGraduacionAlumno;
                resultMap["tituloTesisAlumno"] = tituloTesisAlumno;
                resultMap["programaAlumno"] = programaAlumno;
                resultMap["institucionAlumno"] = institucionAlumno;
                resultMap["DATE"] = fechaNueva;
            }
        }else if(ubicacion == 'code'){
            if(textoEditor == ''){
                alert('There is no information to add');
            }else{
                resultMap["DATE"] = fechaNueva;
                resultMap["YEAR"] = fechaNueva.getFullYear();
                resultMap["EDITORTEXT"] = textoEditor;
                resultMap["REPOSITORYGH"] = repositoryGH;
                resultMap["DESCRIPTIONGH"] = descriptionGH;
                resultMap["URLGH"] = urlGH;
                resultMap["IMAGEGH"] = imagenBase64;
            }
        }else{

        }
        
        if(textoYear != '' && textoMonth != '' && textoEditor != ''){
            var fecha = (textoMonth + " 01, " + textoYear + " 5:00 AM");
            var fechaFormateada = new Date(fecha);

            resultMap["YEAR"] = textoYear;
            resultMap["MONTH"] = textoMonth;
            resultMap["TEXT"] = textoEditor;
            resultMap["DATE"] = fechaNueva;
            resultMap["EDITORTEXT"] = textoEditor;
            // resultMap["DATE"] = textoDate;
        }

        e.preventDefault();
        try{
            /*
            - aquí el truco está en "bd, UBICACION", donde
            ubicación es la ruta que le da el nombre de 
            la colección, para así no generar un .jsx para
            cada sección.
            - Además, el id lo obtenemos de la base para actualizar el mismo registro
            */
            const documento = doc(collection(bd, ubicacion));
            if(Object.keys(resultMap).length === 0){
                alert('Error al agregar');
                throw new Error('Error al agregar');
            }else{
                if(document.getElementById('banderaOpcion').value == 'editar'){
                    var id = document.getElementById('id').value;
                    
                    const documentoActualizado = doc(bd, ubicacion, id);
                    
                    delete resultMap["DATE"];

                    updateDoc(documentoActualizado, resultMap)
                    .then(() => {
                        alert('Información actualizada');
                        // location.reload();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                }else{
                    setDoc(documento, resultMap
                    ).then(() => {
                        alert('Updated information')
                        location.reload();
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
        }catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        async function docSnap(){
            // const response = await firebase.firestore().collection('awards').get();
            var response = await getDocs(collection(bd, ubicacion));
            const docs = response.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            return docs;
        }
        docSnap().then(valor => {
            const temporal = valor;
            if(temporal.length>0){
                //setTimeout(() => setInitialValue(temporal[0].texto), 200);
            }
        });
    }, []);

    const updateDOI = (event) => {
        informacionEncontrada = false;
        setDOILabel(event.target.value);
        // document.getElementById();
    }

    const updateLink = (event) => {
        informacionEncontrada = false;
        setLinkLabel(event.target.value);
        // document.getElementById();
    }

    const updateDate = (event) => {
        setTextoDate(event.target.value);
        // document.getElementById();
    }

    const updateYear = (event) => {
        setTextoYear(event.target.value);
        // document.getElementById();
    }
    const updateMonth = (event) => {
        setTextoMonth(event.target.value);
        // document.getElementById();
    }

    const updateCampoTexto = (event) => {
        setTextoCampo(event.target.value);
        // document.getElementById();
    }

    const updateNombreAlumno = (event) => {
        console.log('ACTUALIZ�OOOO');
        
        setNombreAlumno(event.target.value);
    }
    
    const updateGradoAlumno = (event) => {
        setGradoAlumno(event.target.value);
    }
    
    const updateFechaInicioAlumno = (event) => {
        setFechaInicioAlumno(event.target.value);
    }
    
    const updateFechaGraduacionAlumno = (event) => {
        setFechaGraduacionAlumno(event.target.value);
    }
    
    const updateTituloTesisAlumno = (event) => {
        setTituloTesisAlumno(event.target.value);
    }
    
    const updateProgramaAlumno = (event) => {
        setProgramaAlumno(event.target.value);
    }
    
    const updateInstitucionAlumno = (event) => {
        setInstitucionAlumno(event.target.value);
    }
    
    return(
        <div>
            <div  className='root'>
                <input id='banderaOpcion' type="hidden"/>
                <input id='id' type="hidden"/>

                <h1 className='titulos'>
                    Add {ubicacion}
                </h1>
                
                <h2>Update information</h2>

                {ubicacion == 'code' ? 
                <>
                    GitHub link
                    <br/>
                    <input
                        className="inputTexto" 
                        id="githubLink" 
                        title="Paste GitHub link"
                        placeholder="Example: https://github.com/mich-iv/Leonardo-Trujillo-web"
                        onChange={updateLink}
                    />
                    <label id="prueba"></label> 

                    <button className="botonForma" onClick={()=>{if(linkLabel != ''){getInfoGitHub(linkLabel)}}} title='Click to get information from GitHub'>Get information</button>
                    <br/>
                    <label id="confirmacion" style={{scale: '50%'}}></label>
                    <blockquote id='imagenMostrar'></blockquote>
                    <br/>
                    Adittional information
                    <EditorTexto/>
                    <textarea
                        name='editorTinyMCE'
                        id="editorTinyMCE"
                        hidden
                    />
                </>
                : ubicacion == 'bookChapters' || ubicacion == 'journalPublications' || ubicacion == 'conferencePapers' || ubicacion == 'books' ? 
                <>
                    DOI
                    <br/>
                    <input
                        className="inputTexto" 
                        id="DOI" 
                        title="Write or paste DOI"
                        placeholder="Search DOI"
                        onChange={updateDOI}
                    />
                    <label id="prueba"></label> 

                    <button className="botonForma" onClick={()=>{if(doiLabel != ''){getFicha(doiLabel)}}} title='Click to get DOI'>Get DOI</button>
                    <br/>
                    <label id="confirmacion" style={{fontWeight: 'bold'}}></label>
                </>
                : ubicacion == 'students' ? 
                <>
                    <br/>
                    Name<br/>
                    <input
                        type="text"
                        className="inputTexto" 
                        id="nombreAlumno"
                        onChange={updateNombreAlumno}
                        title='Enter name'
                    />
                    <br/>
                    Degree<br/>
                    <select name="gradoAlumno" id="gradoAlumno" className="inputTexto" onChange={updateGradoAlumno}>
                        <option value=""></option>
                        <option value="1">College degree</option>
                        <option value="2">Master’s degree</option>
                        <option value="3">Postgraduate degree</option>
                        <option value="4">PhD</option>
                    </select>
                    <br/>
                    Start Date<br/>
                    <input
                        type="date"
                        className="inputTexto" 
                        id="fechaInicioAlumno"
                        onChange={updateFechaInicioAlumno}
                        title='Select start date'
                    />
                    <br/>
                    Graduation Date<br/>
                    <input
                        type="date"
                        className="inputTexto" 
                        id="fechaGraduacionAlumno"
                        onChange={updateFechaGraduacionAlumno}
                        title='Select graduation date'
                    />
                    <br/>
                    Thesis Title<br/>
                    <input
                        type="text"
                        className="inputTexto" 
                        id="tituloTesisAlumno"
                        onChange={updateTituloTesisAlumno}
                        title='Enter thesis title'
                    />
                    <br/>
                    Program<br/>
                    <input
                        type="text"
                        className="inputTexto" 
                        id="programaAlumno"
                        onChange={updateProgramaAlumno}
                        title='Enter program'
                    />
                    <br/>
                    Institution<br/>
                    <input
                        type="text"
                        className="inputTexto" 
                        id="institucionAlumno"
                        onChange={updateInstitucionAlumno}
                        title='Enter institution'
                    />
                </>
                : ''}
                <blockquote id='textoMostrar'></blockquote>
                
                <MostrarTexto></MostrarTexto>
                <a className="listo" onMouseUp={submit} title='Click to add information'><img className="" alt="listo" src="../../listo.svg"/></a>
            </div>
        </div>
    )
}