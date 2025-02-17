import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { useState } from 'react';
import Informacion from './informacion.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default function Route(){
    const [abrir, setAbrir] = useState(false);
    return(
        <>
            <h1 className='titulos'>
                Leonardo Trujillo
            </h1>

            <div key={99898} className='item-home'>
                <MostrarTexto key={73841234}></MostrarTexto>
            </div>

            <div className='informacion'>
                <div className='informacion-boton-abrir' onClick={() => setAbrir(true)}>
                    <FontAwesomeIcon className="informacion-boton-abrir-faInfo" icon={faInfo}/>
                </div>
            </div>
            <Informacion abrir={abrir} cerrar = {() => setAbrir(false)}/>
        </>
    )
}