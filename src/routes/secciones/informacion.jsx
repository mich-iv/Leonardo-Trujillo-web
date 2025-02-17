import React from 'react';
import ReactDom from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Informacion({abrir, cerrar}){

    const handleOutsideClick = (e) => {
        if (e.target.className === 'informacion-ventana') {
            cerrar();
        }
    };

    if(!abrir){ return null }
    return ReactDom.createPortal(
        <>
            <div className='informacion-ventana' onClick={handleOutsideClick}>
                <div className='informacion-fondo' onClick={(e) => e.stopPropagation()}>
                    <div className='informacion-fondo-contenido'>
                        <h2>
                            About
                        </h2>
                        <label>Developed by <a href='https://github.com/mich-iv' target="_blank">Michelle Ivan</a></label>
                        <label>Site inspiration: <a href="https://alburycatalina.github.io/projects.html" target="_blank">Catalina Albury</a></label>

                        <h3>Icons</h3>
                            <label><a href="https://www.flaticon.com/free-icon/book_6535611" title="history icons" target="_blank">Book icon</a> created by Freepik - Flaticon</label>
                        <h3>Fonts</h3>
                            <label><a href="https://fonts.google.com/specimen/Roboto" target="_blank">Roboto</a> by Google Fonts</label>
                        <h3>Libraries and frameworks</h3>
                            <label><a href="https://reactjs.org/" target="_blank">React</a></label>
                            <label><a href="https://reactrouter.com/" target="_blank">React Router</a></label>
                            <label><a href="https://firebase.google.com/" target="_blank">Firebase</a></label>
                            <label><a href="https://vitejs.dev/" target="_blank">Vite</a></label>
                            <label><a href="https://www.tiny.cloud/" target="_blank">TinyMCE</a></label>
                            <label><a href="https://parseplatform.org/" target="_blank">Parse</a></label>
                            <label><a href="https://github.com/ORCID/bibtex-parser" target="_blank">bibtex-parser</a></label>
                            <label><a href="https://fontawesome.com/" target="_blank">Font Awesome</a></label>
                            <label><a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a></label>
                            <label><a href="https://www.npmjs.com/package/fs-extra" target="_blank">fs-extra</a></label>
                            <label><a href="https://www.npmjs.com/package/eslint" target="_blank">ESLint</a></label>
                            <label><a href="https://www.npmjs.com/package/@vitejs/plugin-react" target="_blank">@vitejs/plugin-react</a></label>
                            <label><a href="https://www.npmjs.com/package/eslint-plugin-react" target="_blank">eslint-plugin-react</a></label>
                            <label><a href="https://www.npmjs.com/package/eslint-plugin-react-hooks" target="_blank">eslint-plugin-react-hooks</a></label>
                            <label><a href="https://www.npmjs.com/package/eslint-plugin-react-refresh" target="_blank">eslint-plugin-react-refresh</a></label>
                            <label><a href="https://www.npmjs.com/package/@types/react" target="_blank">@types/react</a></label>
                            <label><a href="https://www.npmjs.com/package/@types/react-dom" target="_blank">@types/react-dom</a></label>
                            <label><a href="https://www.npmjs.com/package/react-helmet" target="_blank">react-helmet</a></label>
                            <label><a href="https://www.npmjs.com/package/react-helmet-async" target="_blank">react-helmet-async</a></label>
                            <label><a href="https://www.npmjs.com/package/react-router-hash-link" target="_blank">react-router-hash-link</a></label>
                            <label><a href="https://www.npmjs.com/package/firebase-admin" target="_blank">firebase-admin</a></label>
                            <label><a href="https://www.npmjs.com/package/firebase-tools" target="_blank">firebase-tools</a></label>
                    </div>
                </div>
                    <div className='informacion-boton-cerrar' onClick={cerrar}>
                        <FontAwesomeIcon className='informacion-boton-cerrar-faXmark' icon={faXmark}/>
                    </div>
            </div>
        </>,
        document.getElementById('informacion')
    )
}