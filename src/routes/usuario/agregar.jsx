import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bd, collection, doc, getDocs } from '../../../firebase.jsx';
import { setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {EditorTexto} from '../../routes/secciones/EditorTexto.jsx';

import '../../estilos/Menu.css';

import '../../estilos/Paginas.css';

import parse from 'bibtex-parser';
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

import tinymce from 'tinymce/tinymce.min.js';
//importamos js para convertir a base64
import { convertirBase64 } from '../../Componentes/convertirBase64.js';

export default function Route(){
    //obtenemos la ruta actual del url
    const { ubicacion } = useParams();
    let tituloUbicacion = useLocation();

    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [nombre, setNombre] = useState("");

    const sesion = getAuth();

    var resultMap = {};

    const [doiLabel, setDOILabel] = useState("");
    const [linkLabel, setLinkLabel] = useState("");

    const [nombreAlumno, setNombreAlumno] = useState("");
    const [gradoAlumno, setGradoAlumno] = useState("");
    const [fechaInicioAlumno, setFechaInicioAlumno] = useState("");
    const [fechaGraduacionAlumno, setFechaGraduacionAlumno] = useState("");
    const [tituloTesisAlumno, setTituloTesisAlumno] = useState("");
    const [programaAlumno, setProgramaAlumno] = useState("");
    const [institucionAlumno, setInstitucionAlumno] = useState("");

    var informacionEncontrada = false;

    var imagenBase64 = '';
    var repositoryGH = '';
    var descriptionGH = '';
    var urlGH = '';

    var respuesta;

    //ignoramos la dirección de /agregar/ para tener solamente la dirección final
    //por ejemplo, /agregar/awards se convierte en awards
    tituloUbicacion = tituloUbicacion.pathname.split('/')[2];


    if (tituloUbicacion === '/') {
        tituloUbicacion = 'Home';
    } else if (tituloUbicacion === 'awards') {
        tituloUbicacion = 'Awards';
    } else if (tituloUbicacion === 'bookChapters') {
        tituloUbicacion = 'Book Chapters';
    } else if (tituloUbicacion === 'journalPublications') {
        tituloUbicacion = 'Journal Publications';
    } else if (tituloUbicacion === 'conferencePapers') {
        tituloUbicacion = 'Select Conference Papers';
    } else if (tituloUbicacion === 'projects') {
        tituloUbicacion = 'Projects';
    } else if (tituloUbicacion === 'books') {
        tituloUbicacion = 'Books';
    } else if (tituloUbicacion === 'students') {
        tituloUbicacion = 'Students';
    } else if (tituloUbicacion === 'code') {
        tituloUbicacion = 'Code';
    }

    //para subir la foto de perfil
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files[0]);

        let imagen = e.target.files[0];
        
        setFile(e.target.files[0]);

        convertirBase64(imagen).then(base64 => {
            console.log(base64);
            resultMap["IMAGENPERFIL"] = base64;
        }).catch(error => {
            console.error('Error:', error);
        });
    }
    
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
        
        // https://opengraph.githubassets.com/
        const apiUrl = `https://opengraph.githubassets.com/${numeroHash}/${usuarioGH}/${repositorioGH}`;
        
        // URL de la API de GitHub para obtener información del repositorio
        const repoUrl = `https://api.github.com/repos/${usuarioGH}/${repositorioGH}`;

        document.getElementById("infoGitMostrar").innerHTML = '';
        console.log(link);
        

        // Fetch para obtener la información del repositorio
        fetch(repoUrl, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if(response.status === 404){
                document.getElementById("textoMostrar").innerHTML = '';
                document.getElementById("imagenMostrar").innerHTML = '';
                document.getElementById("confirmacion").style.color = 'red'; 
                document.getElementById("confirmacion").innerHTML = "Information not found";
                throw new Error('Error en la solicitud');

            }else if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar la información del repositorio en el elemento con id "textoMostrar"
            // const textoMostrar = document.getElementById("textoMostrar");
            infoGitMostrar.innerHTML = `
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
            
            fetch(apiUrl, {
                headers:{
                    "Accept": "image/png"
                }
            })
            .then(response => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    document.getElementById("textoMostrar").innerHTML = '';
                    document.getElementById("confirmacion").style.color = 'red'; 
                    document.getElementById("confirmacion").innerHTML = "Information not found";
                throw new Error('Error en la solicitud');
                }
                // Convertir la respuesta a JSON
                return response.blob();
            })
            .then(blob => {
                // Convertir la imagen a base64
                return convertirBase64(blob);
            }).then(base64data => {
                // Mostrar la imagen en el elemento con id "imagenMostrar"
                const imgElement = document.createElement("img");
                imgElement.src = `data:image/png;base64,${base64data}`;
                imgElement.alt = "Fetched Image";
                imgElement.style.maxWidth = "100%";
                
                const imagenMostrar = document.getElementById("imagenMostrar");
                imagenMostrar.innerHTML = ''; // Limpiar contenido anterior
                imagenMostrar.appendChild(imgElement);
            
                imagenBase64 = base64data;
                document.getElementById("confirmacion").innerHTML = "Image found:";
                document.getElementById("confirmacion").style.color = 'green';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => {
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
                    throw new Error('Error in the request');
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

                        resultMap[llave] = valor;

                        document.getElementById("textoMostrar").innerHTML += llave +": "+ valor + "." + "<br/>";
                        document.getElementById("textoMostrar").innerHTML += "\n";
                    }
                }
                resultMap["DATEADD"] = horaActual;
                document.getElementById("confirmacion").innerHTML = "DOI found:";
                document.getElementById("confirmacion").style.color = 'green'; 
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

    // Función para enviar la información a la base de datos
    const submit = (e) => {
        // Obtener el contenido del editor de texto
        if(tinymce.activeEditor != null){
            var textoEditor = tinymce.activeEditor.getContent("editorTinyMCE");
        }else{
            var textoEditor = '';
        }
        
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const fechaNueva = new Date();

        if(ubicacion == 'bookChapters' || ubicacion == 'journalPublications' || ubicacion == 'conferencePapers' || ubicacion == 'books'){ 
            // si la ubicación es diferente de code y students
            
            // si el doi es diferente de vacío y no se ha encontrado la información,
            // entonces se muestra un mensaje de error
            if(document.getElementById('banderaOpcion').value === 'editar'){
                resultMap["DOI"] = document.getElementById('DOI').value;
            }else{
            }

            if(doiLabel != '' && informacionEncontrada == false){
                alert('A DOI was entered, but it was not found or the button to obtain it has not been clicked');
            }else{
                resultMap["DOI"] = doiLabel;
            }
        }else if(ubicacion == 'students'){ 
            // si la bandera es editar, entonces se actualiza la información
            if (document.getElementById('banderaOpcion').value === 'editar') {
                resultMap["nombreAlumno"] = document.getElementById('nombreAlumno').value;
                resultMap["gradoAlumno"] = document.getElementById('gradoAlumno').value;
                resultMap["fechaInicioAlumno"] = document.getElementById('fechaInicioAlumno').value;
                resultMap["fechaGraduacionAlumno"] = document.getElementById('fechaGraduacionAlumno').value;
                resultMap["tituloTesisAlumno"] = document.getElementById('tituloTesisAlumno').value;
                resultMap["programaAlumno"] = document.getElementById('programaAlumno').value;
                resultMap["institucionAlumno"] = document.getElementById('institucionAlumno').value;
            }else{ 
                // si no, se obtiene la información de los campos
                // si alguno de los campos está vacío, entonces se muestra un mensaje de error
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
                    resultMap["DATEADD"] = fechaNueva;
                }
            }
        }else if(ubicacion == 'code'){
            // si la ubicación es code y no se ha encontrado la información, entonces se muestra un mensaje de error
            
            //si la bandera es editar, no es necesario obtener la información de GitHub o el texto introducido
             // si la bandera no es editar, entonces preguntamos si el link de GitHub no está vacío y si se encontró la información
            if(document.getElementById('banderaOpcion').value === 'editar'){
                if(linkLabel != '' && informacionEncontrada == false){
                    // si el link de GitHub no está vacío y no se encontró la información
                    alert('A GitHub link was entered, but it was not found or the button to obtain it has not been clicked');
                }else if(linkLabel != '' && informacionEncontrada == true){
                    // si el link de GitHub no está vacío y se encontró la información
                    resultMap["REPOSITORYGH"] = repositoryGH;
                    resultMap["DESCRIPTIONGH"] = descriptionGH;
                    resultMap["URLGH"] = urlGH;
                    resultMap["IMAGEGH"] = imagenBase64;
                    textoEditor != "" ? resultMap["EDITORTEXT"] = textoEditor : ""
                }else{
                    textoEditor != "" ? resultMap["EDITORTEXT"] = textoEditor : ""
                }
            }else{
                if(linkLabel != '' && informacionEncontrada == false){
                    alert('A GitHub link was entered, but it was not found or the button to obtain it has not been clicked');
                }else if(linkLabel != '' && informacionEncontrada == true){
                    resultMap["DATEADD"] = fechaNueva;
                    resultMap["YEAR"] = fechaNueva.getFullYear();
                    textoEditor != "" ? resultMap["EDITORTEXT"] = textoEditor : ""
                    resultMap["REPOSITORYGH"] = repositoryGH;
                    resultMap["DESCRIPTIONGH"] = descriptionGH;
                    resultMap["URLGH"] = urlGH;
                    resultMap["IMAGEGH"] = imagenBase64;
                }
            }
        }else if(ubicacion == 'home'){
            console.log(document.getElementById('banderaOpcion').value);
            
            // si la ubicación es home, entonces se obtiene la información del editor de texto
            resultMap["EDITORTEXT"] = textoEditor;

            //obtenemos la imagen del input file para luego convertirla a base64
            if(file){
                console.log('es archivo?');

                
            }
        }

        e.preventDefault(); // Evitar que se recargue la página

        try{
            /*
            - aquí el truco está en "bd, UBICACION", donde
            ubicación es la ruta que le da el nombre de 
            la colección, para así no generar un .jsx para
            cada sección.
            - Además, el id lo obtenemos de la base para actualizar el mismo registro
            */

            const documento = doc(collection(bd, ubicacion));

            // si no hay información, entonces se muestra un mensaje de error
            if(Object.keys(resultMap).length === 0){
                alert('There is no information to add');
                throw new Error('Error al agregar');
            }else{
                if(document.getElementById('banderaOpcion').value == 'editar'){
                    var id = document.getElementById('id').value;
                    
                    const documentoActualizado = doc(bd, ubicacion, id);
                    
                    delete resultMap["DATEADD"];
                    console.log(resultMap);

                    updateDoc(documentoActualizado, resultMap)
                    .then(() => {
                        alert('Updated information');
                        // location.reload();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                }else{
                    setDoc(documento, resultMap).then(() => {
                        alert('Information added')
                        // location.reload();
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
    }

    const updateLink = (event) => {
        informacionEncontrada = false;
        setLinkLabel(event.target.value);
    }

    const updateNombreAlumno = (event) => {
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

                <h2 style={{fontSize: '2rem', color: 'black'}}>
                    Add information to "{tituloUbicacion}"
                </h2>
                
                {/* <h2>Update information</h2> */}

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
                    
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <div style={{maxWidth: '450px'}} id='infoGitMostrar'></div>
                        <div>
                            <label id="confirmacion" style={{maxWidth: '450px'}}></label>
                            <div style={{maxWidth: '450px', border: '1px solid'}} id='imagenMostrar'></div>
                        </div>
                        
                    </div>
                    <br/>
                    Adittional information
                    <EditorTexto/>
                    <textarea
                        name='editorMCE'
                        id="editorMCE"
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
                    <select defaultValue={""} name="gradoAlumno" id="gradoAlumno" className="inputTexto" onChange={updateGradoAlumno} title='Select degree'>
                        <option value="" disabled hidden>Select degree</option>
                        <option value="1">Engineering</option>
                        <option value="2">Master's degree</option>
                        <option value="3">Doctorate</option>
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
                : ubicacion == 'home' ?
                <>
                    <EditorTexto/>
                    <textarea
                        name='editorMCE'
                        id="editorMCE"
                        hidden
                    />
                    {/* subir imagen para convertir a base64 */}
                    <input type="file" onChange={handleChange}/>
                    <img src={file}/>
                    <br/>
                </> 
                : ''}
                <blockquote id='textoMostrar'></blockquote>
                
                <div className='teto'>
                    {/* { ubicacion == 'home' ? null : <MostrarTexto/> } */}
                    <MostrarTexto/>
                </div>

                <a className="listo" onMouseUp={submit} title='Click to add information'><i className="fas fa-check"/></a>
            </div>
        </div>
    )
}