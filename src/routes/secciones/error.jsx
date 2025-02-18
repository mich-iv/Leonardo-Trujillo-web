import React from 'react'
import MostrarTexto from '../../Componentes/MostrarTexto.jsx';
import { Helmet } from 'react-helmet';
import Menu from '../../routes/Menu.jsx';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Route(){
    return(
        <>
        <Helmet>
            <title>Error 404</title>
            <meta property="og:description" content="Error 404"></meta>
        </Helmet>
            <div className='cabecera'>
                <Menu/>   
            </div>
            <div className='cuerpo'>
                <br/>
                <br/>
                <br/>
                <h1 className='titulos'>
                    Error 404
                </h1>
                       
                <div className='texto' style={{textAlign:'center', alignContent:'center'}}>
                    {/* texto en ingles de Página no encontrada */}
                    <h2 className='subtitulos'>Page not found</h2>
                    <FontAwesomeIcon icon={faExclamationCircle} size='10x' color='#64af9f'/>
                </div>
            </div>
                
        </>
    )
}