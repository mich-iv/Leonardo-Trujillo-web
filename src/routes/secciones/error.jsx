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
                       
                <div className='texto' style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', textAlign:'center', alignContent:'center'}}>
                    {/* texto en ingles de Página no encontrada */}
                    <h2 className='subtitulos'>Page not found</h2>
                    <FontAwesomeIcon className="fas fa-exclamation-circle" icon={faExclamationCircle} color='#64af9f'/>
                    
                    {/* button para regresar al inicio */}
                    <br/>
                    <br/>
                    <button className='' onClick={()=>{window.location.href = '/'}}>Regresar al inicio</button>
                </div>

            </div>
                
        </>
    )
}