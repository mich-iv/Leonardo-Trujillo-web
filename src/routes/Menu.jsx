import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import '../estilos/Menu.css'
import '../estilos/Paginas.css'

export default function Menu() {
  var habilitar = true;
  const location = useLocation();

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [token, setToken] = useState("");

  //método para obtener datos del usuario con sesión iniciada
  const sesion = getAuth();
  useEffect(() => {
    onAuthStateChanged(sesion, (usuario) => {
      if (usuario) {
        setCorreo(usuario.email);       //asignamos datos obtenidos a las variables
        setNombre(usuario.displayName);
        setFoto(usuario.photoURL);
        setToken(usuario.accessToken);
      }
    })
  }, []) 

  return (
    <div>
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
          !token ? '':
          !location.pathname.startsWith('/agregar/') ? <Link to={'/agregar'+location.pathname+''}>Agregar</Link> :
          habilitar = false
        }
        <div className='izquierda'>
          {/*POR FIN ENTENDÍ ESTA FUNCIÓN 
            ordenemos; condición ? entonces : si no
            - condición: por ejemplo, 10 es mayor que 5?
              ?
            - entonces: si condición es verdad (true), entonces haz //lo que sea
              :
            - si no: si condición es falso (false), entonces haz //otra cosa */}
          {token ? 
            <button type='submit' id="cerrarSesion" onClick={()=>{
                signOut(sesion);
                window.location.reload();
            }}>
              <img alt = "foto" referrerPolicy="no-referrer" src={foto}/>
                Cerrar sesión
                <p>{nombre}</p>
            </button>
            : 'Login'
          }
          
        </div>
      </div>
      <div className='cuerpo'>
        <Outlet/>
      </div>
    </div>
  )
}