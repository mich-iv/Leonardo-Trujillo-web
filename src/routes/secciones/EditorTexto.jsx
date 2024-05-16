<Editor className='root'
                        inline={false}
                        tinymceScriptSrc={'tinymce/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={initialValue}
                        init={{
                            promotion: false,
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
                            language: ''+idioma+'',
                            height: 550,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'accordion' 
                            ],
                            toolbar:[
                                { name: 'Historial', items: [ 'undo', 'redo' ] },
                                { name: 'Formato', items: [ 'styles', 'fontsizeinput', 'bold', 'italic', 'forecolor', 'backcolor' ] },
                                { name: 'Insertar', items: [ 'link', 'image', 'table', 'accordion' ] },
                                { name: 'Alinear', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                                { name: 'Listas', items: [ 'bullist', 'numlist', 'checklist' ] },
                                { name: 'Sangría', items: [ 'outdent', 'indent' ] },
                                { name: 'Opciones', items: [ 'removeformat', 'help' ] }
                            ]
                        }}
                    /> 