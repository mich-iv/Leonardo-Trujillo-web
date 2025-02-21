import { React, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// import parse from 'html-react-parser';

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
import 'tinymce/plugins/accordion';
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
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/save';
import 'tinymce/plugins/autoresize';

export function EditorTexto({initialValue}) {
    const editorRef = useRef(null);

    return (
      <>
        <Editor className='root'
            id='edit'
            inline={false}
            tinymceScriptSrc={'tinymce/tinymce.min.js'}
            initialValue={initialValue}
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
                selector: "textarea#editorMCE",
                resize: 'both',
                forced_root_block: 'texto',
                newline_behavior: 'linebreak',
                promotion: false,
                content_css: "tinymce/skins/content/default/content.min.css, tinymce/skins/ui/oxide/content.min.css",
                content_style: "body { padding: 0 1rem !important;}",
                object_resizing: true,
                image_advtab: true,
                image_title: true,
                image_caption: true,
                image_class_list: [
                    { title: 'None', value: '' },
                    { title: 'No border', value: 'img_no_border' },
                    { title: 'Green border', value: 'img_green_border' },
                    { title: 'Blue border', value: 'img_blue_border' },
                    { title: 'Red border', value: 'img_red_border' }
                ],
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
                min_height: 200,
                max_height: 450,
                width: '100%',
                min_width: 200,
                max_width: 200,
                menubar: true,
                statusbar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'accordion', 'autoresize'
                ],
                toolbar:[
                    { name: 'Historial', items: [ 'undo', 'redo' ] },
                    { name: 'Title', items: [ 'customCodeButton' ] },
                    { name: 'Formato', items: [ 'styles', 'fontsizeinput', 'bold', 'italic', 'forecolor', 'backcolor' ] },
                    { name: 'Insertar', items: [ 'link', 'image', 'table', 'accordion' ] },
                    { name: 'Alinear', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                    { name: 'Listas', items: [ 'bullist', 'numlist', 'checklist' ] },
                    { name: 'Opciones', items: [ 'removeformat', 'help' ] }
                ],
                setup: (editor) => {
                    editor.ui.registry.addButton('customCodeButton', {
                        text: 'Title',
                        icon: 'bookmark',
                        tooltip: 'Select text to mark as a title',
                        onAction: () => {
                            const selectedContent = tinymce.activeEditor.selection.getContent( );
                            const formateoFinal = selectedContent.replace(/&#39/g, '&apos').replace(/&amp;/g, '&');
                            //removemos acentos y caracteres especiales
                            
                            let textoId = formateoFinal.replace(/\s/g, '');
                            //reemplazamos caractares &aaute; por a, etc
                            textoId = textoId.replace(/&aacute;/g, 'a');
                            textoId = textoId.replace(/&eacute;/g, 'e');
                            textoId = textoId.replace(/&iacute;/g, 'i');
                            textoId = textoId.replace(/&oacute;/g, 'o');
                            textoId = textoId.replace(/&uacute;/g, 'u');
                            textoId = textoId.replace(/&ntilde;/g, 'n');
                            textoId = textoId.replace(/&Aacute;/g, 'A');
                            textoId = textoId.replace(/&Eacute;/g, 'E');
                            textoId = textoId.replace(/&Iacute;/g, 'I');
                            textoId = textoId.replace(/&Oacute;/g, 'O');
                            textoId = textoId.replace(/&Uacute;/g, 'U');
                            textoId = textoId.replace(/&Ntilde;/g, 'N');

                            const wrappedContent = `<h2 id="titulo${(textoId)}" class="subtitulos">${(formateoFinal)}</h2>`;
                            
                            editor.selection.setContent(wrappedContent);
                        }
                    });
                }
            }}
        /> 
      </>
    );
}

