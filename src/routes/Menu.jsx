import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import '../estilos/Menu.css'

export default function Menu() {
  var habilitar = true;
  const location = useLocation();
  console.log(location.pathname);
  
  const [value, setValue] = useState('')
    useEffect(()=>{
      setValue(localStorage.getItem('email'))
      setValue(localStorage.getItem('nombre'))
      setValue(localStorage.getItem('foto'))
  })

  const correo = localStorage.getItem("email");
  const nombre = localStorage.getItem("nombre");
  const foto = localStorage.getItem("foto");

  return (
    <div>
      <header>
        aaaaa
      </header>
      <div>
        siaaaa
      </div>
      <div className="menu">
        <Link to={'/'}>Home</Link> 
        <Link to={'/awards'}>Awards</Link>
        <Link to="/bookChapters">Book Chapters</Link>
        <Link to="/journalPublications">Journal Publications</Link>
        <Link to="/conferencePapers">Select Conference Papers</Link>
        <Link to="/projects">Projects</Link>
        {
          // mostrar el botón solo si la ruta es diferente de "agregar"
          // porque de no evaluar, podríamos entrar en un loop de
          // /agregar/agregar/books/ al dejarnos dar click en la misma seccion
          !value ? '':
          !location.pathname.startsWith('/agregar/') ? <Link to={'/agregar'+location.pathname+''}>Agregar</Link> :
          habilitar = false
        }
        <div className='izquierda'>
          {!value ? '' :
            <button onClick={
              ()=>{
                console.log('si');
                localStorage.clear();
                window.location.reload();
              }
            }>
              <img alt = "foto" referrerPolicy="no-referrer" src={foto}/>
              Cerrar sesión
              <p>{nombre}</p>
          </button>
          }
          
        </div>
      </div>
      <div className='cuerpo'>
        <Outlet/>
      </div>
    </div>
  )
}