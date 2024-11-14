import React, { useEffect, useState , useRef } from 'react'

import { useNavigate, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { bd, collection, doc, getDocs, deleteDoc } from '../../../firebase.jsx';
import { setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {EditorTexto} from '../../routes/secciones/EditorTexto.jsx';

import '../../estilos/Menu.css';

import '../../estilos/Paginas.css';

import parse from 'bibtex-parser';
import MostrarTexto from '../../Components/MostrarTexto.jsx';

import {agregar} from '../../Components/opcionesRegistros.js';

import parseReact from 'html-react-parser';

import tinymce from 'tinymce/tinymce.min.js';
import { set, update } from 'firebase/database';

export default function Route(){
    //obtenemos la ruta actual del url
    const { ubicacion } = useParams();

    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [nombre, setNombre] = useState("");

    const sesion = getAuth();

    var resultMap = {};

    const [doiLabel, setDOILabel] = useState("");
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
    const [institutcionAlumno, setInstitucionAlumno] = useState("");

    const [textoExtraido, setTextoExtraido] = useState("");

    var doiEncontrado = false;

    var respuesta;
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
                doiEncontrado = true;
                
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

        console.log(nombreAlumno + 
            gradoAlumno + 
            fechaInicioAlumno + 
            fechaGraduacionAlumno + 
            tituloTesisAlumno + 
            programaAlumno + 
            institutcionAlumno);
        
        
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const fechaNueva = new Date(textoDate);
        console.log(fechaNueva.getDate());
        
        console.log(month[fechaNueva.getMonth()]);

        if(ubicacion == 'bookChapters' || ubicacion == 'journalPublications' || ubicacion == 'conferencePapers' || ubicacion == 'books'){
            if(doiLabel != '' && doiEncontrado == false){
                console.log(doiEncontrado);
                console.log("DOI:"+DOI+":");
                alert('A DOI was entered, but it was not found or the button to obtain it has not been clicked');
            }else{
                resultMap["DOI"] = doiLabel;
            }
        }else if(ubicacion == 'students'){
            if(nombreAlumno == '' || gradoAlumno == '' || fechaInicioAlumno == '' || fechaGraduacionAlumno == '' || tituloTesisAlumno == '' || programaAlumno == '' || institutcionAlumno == ''){
                alert('There is no information to add');
            }else{
                resultMap["NAME"] = nombreAlumno;
                resultMap["DEGREE"] = gradoAlumno;
                resultMap["STARTDATE"] = fechaInicioAlumno;
                resultMap["GRADUATIONDATE"] = fechaGraduacionAlumno;
                resultMap["THESISTITLE"] = tituloTesisAlumno;
                resultMap["PROGRAM"] = programaAlumno;
                resultMap["INSTITUTION"] = institutcionAlumno;
            }

        }else if(ubicacion == 'code'){
            if(textoEditor == ''){
                alert('There is no information to add');
            }else{
                resultMap["TEXT"] = textoEditor;
            }
        }else{

        }

        if(doiLabel == '' && (textoYear == '' && textoMonth == '' && textoEditor == '')){
            alert('There is no information to add');
        }else if(doiLabel != '' && doiEncontrado == false){
            console.log(doiEncontrado);
            console.log("DOI:"+DOI+":");
            alert('A DOI was entered, but it was not found or the button to obtain it has not been clicked');
        }else if((textoYear == '' || textoMonth == '' || textoEditor == '') && doiLabel == ''){
            alert('Faltan campos');
        }else{
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
                    setDoc(documento, resultMap
                    ).then(() => {
                        alert('Updated information')
                        location.reload();
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }catch (error) {
                console.error(error);
            }
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
        doiEncontrado = false;
        setDOILabel(event.target.value);
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
                <h1 className='titulos'>
                    Add {ubicacion}
                </h1>
                
                <h2>Update information</h2>

                {ubicacion == 'code' ? 
                <>
                    <EditorTexto/>
                    <textarea
                        name='editorTinyMCE'
                        id="editorTinyMCE"
                        hidden
                    />
                    {/* Date<br/>
                    <input
                        type="date"
                        className="inputTexto" 
                        id="dateTexto"
                        onChange={updateDate}
                        title='Select date'
                    />
                    <br/>

                    Year<br/>
                    <input
                        className="inputTexto" 
                        id="yearTexto" 
                        title="Write year"
                        placeholder="Year"
                        onChange={updateYear}
                    />
                    <br/>

                    Month
                    <br/>
                    <input
                        className="inputTexto" 
                        id="monthTexto" 
                        title="Write month"
                        placeholder="Month"
                        onChange={updateMonth}
                    />
                    <br/> */}
                     
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
                    <input
                        type="option"
                        className="inputTexto" 
                        id="gradoAlumno"
                        onChange={updateGradoAlumno}
                        title='Enter grade'
                    />
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
                        id="graduadoAlumno"
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