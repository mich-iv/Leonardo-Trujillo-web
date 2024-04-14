import React, { useEffect, useState , useRef } from 'react'

import { useParams } from 'react-router-dom';
import { bd, collection, addDoc, doc, getDocs } from '../../firebase.jsx';
import { updateDoc } from 'firebase/firestore';

import { Editor } from '@tinymce/tinymce-react';

import Frame from 'react-frame-component';

// TinyMCE so the global var exists
/* eslint-disable-next-line no-unused-vars */
import tinymce from 'tinymce/tinymce.min.js';
window.tinymce = tinymce;
// Toolbar icons
import 'tinymce/icons/default';
// Theme
import 'tinymce/themes/silver';
import 'tinymce/models/dom';

// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help/';
import 'tinymce/plugins/help/plugin.js';
import 'tinymce/plugins/help/js/i18n/keynav/en.js';
import 'tinymce/plugins/help/js/i18n/keynav/es_MX.js';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/save';

import '../estilos/Paginas.css';

export default function Route(){
    var idioma = "es_MX";

    const [initialValue, setInitialValue] = useState(undefined);

    const [id, setId] = useState("");

    const editorRef = useRef(null);

    //obtenemos la ruta actual del url
    const { ubicacion } = useParams();

    const submit = (e) => {
        //traemos los datos del editor
        const textoFinal = editorRef.current.getContent();
        e.preventDefault();
        try{
            /*
            - aquí el truco está en "bd, UBICACION", donde
            ubicación es la ruta que le da el nombre de 
            la colección, para así no generar un .jsx para
            cada sección.
            - Además, el id lo obtenemos de la base para actualizar el mismo registro
            */
            console.log("4.- antes de updateDoc");
            console.log("4.1.- textoFinal"+textoFinal);
            updateDoc(doc(bd, ubicacion, id), {
                texto : textoFinal
                // titulo: tituloForm,
                // descripcion: descripcionForm,
                // url: urlForm,
                // anio: anioForm
            });
            console.log("5.- saliendo de updateDoc");
        }catch (error) {
            console.log(error);
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
            const prueba = valor;
            setTimeout(() => setInitialValue(prueba[0].texto), 1);
            setTimeout(() => setId(prueba[0].id), 1);
        });
    }, []);
    
   
    

    return(
        <div>
            <div  className='root'>
                <h1 className='titulos'>
                    Agregar {ubicacion}
                </h1>

                
                <h2>Actualizar información</h2>
                {/* <Frame
                initialContent='<div></div>'
                style={{
                    width: "100%",
                    margin: '0 auto',
                    border: '0',
                    backgroundColor: 'transparent',
                    scrollbarColor: 'auto',
                    minHeight: '100%',
                    maxHeight: '100%',
                }}
                > */}
                
                    <Editor className='root'
                        inline={false}
                        tinymceScriptSrc={'tinymce/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={initialValue}
                        init={{
                            content_css: "tinymce/skins/content/default/content.min.css, tinymce/skins/ui/oxide/content.min.css",
                            object_resizing: true,
                            image_advtab: true,
                            image_title: true,
                            /* enable automatic uploads of images represented by blob or data URIs*/
                            automatic_uploads: true,
                            /*
                            URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                            images_upload_url: 'postAcceptor.php',
                            here we add custom filepicker only to Image dialog
                            */
                            file_picker_types: 'image',
                            /* and here's our custom image picker*/
                            file_picker_callback: (cb, value, meta) => {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                        
                            input.addEventListener('change', (e) => {
                                const file = e.target.files[0];
                        
                                const reader = new FileReader();
                                reader.addEventListener('load', () => {
                                /*
                                    Note: Now we need to register the blob in TinyMCEs image blob
                                    registry. In the next release this part hopefully won't be
                                    necessary, as we are looking to handle it internally.
                                */
                                const id = 'blobid' + (new Date()).getTime();
                                const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                const base64 = reader.result.split(',')[1];
                                const blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);
                        
                                /* call the callback and populate the Title field with the file name */
                                cb(blobInfo.blobUri(), { title: file.name });
                                });
                                reader.readAsDataURL(file);
                            });
                        
                            input.click();
                            },
                            license_key: 'gpl',
                            language: ""+idioma+"",
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar:[
                                { name: 'Historial', items: [ 'undo', 'redo' ] },
                                { name: 'Estilos', items: [ 'casechange', 'blocks' ] },
                                { name: 'Formato', items: [ 'bold', 'italic', 'forecolor', 'backcolor', 'link', 'image' ] },
                                { name: 'Alinear', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                                { name: 'Listas', items: [ 'bullist', 'numlist', 'checklist' ] },
                                { name: 'Sangría', items: [ 'outdent', 'indent' ] },
                                { name: 'Opciones', items: [ 'removeformat', 'indent' ] },
                                { name: 'EXtras', items: [  'code', 'table', 'help' ] }
                                
                            ],
                            
                            //   toolbar1:
                            //   'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help ',
                            content_style: ''
                        }}
                    />
                {/* </Frame> */}
                {/* <button onClick={log}>Log editor content</button> */}
                <button onMouseUp={submit}>Agregar</button>
            </div>
        </div>
    )
}