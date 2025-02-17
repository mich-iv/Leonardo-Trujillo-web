import React from 'react';
import ReactDom from 'react-dom';

import MostrarTexto from '../../Componentes/MostrarTexto.jsx';

export default function Informacion({abrir, children, cerrar}){
    if(!abrir){ return null }
    return ReactDom.createPortal(
        <>
            <div className='informacion'>
                <button onClick={cerrar}>Cerrar</button>
                {children}
            </div>
        </>,
        document.getElementById('informacion')
    )
}