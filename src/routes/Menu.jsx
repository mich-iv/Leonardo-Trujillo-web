import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import '../estilos/Menu.css'

export default function Menu() {
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
      <div className="menu">
        <Link to={'/'}>Home</Link> 
        <Link to={'/awards'}>Awards</Link>
        <Link to="/bookChapters">Book Chapters</Link>
        <Link to="/journalPublications">Journal Publications</Link>
        <Link to="/conferencePapers">Select Conference Papers</Link>
        <Link to="/projects">Projects</Link>
        <div className='izquierda'>
          <img src={foto}/>
          <Link to="">
              Cerrar sesión
              <p>{nombre}</p>
            
          </Link>
        </div>
      </div>
      
      <Outlet/>
    </div>
  )
}