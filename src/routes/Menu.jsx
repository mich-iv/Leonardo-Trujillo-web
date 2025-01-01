import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import '../estilos/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Menu() {
  var habilitar = true;
  //método para obtener datos del usuario con sesión iniciada
  const sesion = getAuth(); // Obtiene la sesión de autenticación

  // Variables de estado para almacenar los datos del usuario
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState('');
  const [token, setToken] = useState('');

  const [mostrarBoton, setMostrarBoton] = useState(false);

  const handleKeyboard = ({ repeat, metaKey, ctrlKey, shiftKey , key, KeyM }) => {
    if (repeat) return
  
    // Handle both, `ctrl` and `meta`.
    if (((metaKey || ctrlKey) && shiftKey) && key === 'Insert') setMostrarBoton(prev => !prev)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
  
    // Important to remove the listeners.
    return () => document.removeEventListener('keydown', handleKeyboard)
  })

  // Obtiene los datos del usuario al iniciar sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(sesion, (usuario) => {
      if (usuario) {
        setCorreo(usuario.email);       //asignamos datos obtenidos a las variables
        setNombre(usuario.displayName);
        setFoto(usuario.photoURL);
        setToken(usuario.accessToken);
      }
    });

    // Limpia el effect cuando se desmonta el componente
    return () => unsubscribe();
  }, [sesion]); // Dependencia de effect: solo se ejecuta si cambia la sesión
  //Es decir si la sesion cambia cambia el componente xd

  const location = useLocation(); // Obtiene la ubicación actual

  //cada que se haga click en un link, se cerrará el menú
  document.querySelectorAll('.menu-secciones').forEach(item => {
  item.addEventListener('click', () => {
      document.getElementById('check').checked = false;
      });
  });
  
  return (
    <>
      <div className="menu">
        <input type="checkbox" id="check"></input>
        <label for="check" className="checkbtn">
          {/* <FontAwesomeIcon icon="bars" /> */}
          <i className="fas fa-bars"></i>
        </label>

        <nav className='menu-desplegar'>
          <Link className="menu-secciones" to="/">Home</Link>
          <Link className="menu-secciones" to="/awards">Awards</Link>
          <Link className="menu-secciones" to="/bookChapters">Book Chapters</Link>
          <Link className="menu-secciones" to="/journalPublications">Journal Publications</Link>
          <Link className="menu-secciones" to="/conferencePapers">Select Conference Papers</Link>
          <Link className="menu-secciones" to="/projects">Projects</Link>
          <Link className="menu-secciones" to="/books">Books</Link>
          <Link className="menu-secciones" to="/students">Students</Link>
          <Link className="menu-secciones" to="/code">Code</Link>
          
          <div className="derecha">
            {/*POR FIN ENTENDÍ ESTA FUNCIÓN  *ternaria
              ordenemos; condición ? entonces : si no
              - condición: por ejemplo, 10 es mayor que 5?
                ?
              - entonces: si condición es verdad (true), entonces haz //lo que sea
                :
              - si no: si condición es falso (false), entonces haz //otra cosa */}
            {/* Botón de inicio de sesión/cierre de sesión */}
            {token ? (
              <button
                className='derecha'
                type="submit"
                id="cerrarSesion"
                onClick={() => {
                  signOut(sesion);
                  window.location.reload(); // Recarga la página al cerrar sesión
                }}
              >
                <img alt="foto" referrerPolicy="no-referrer" src={foto} />
                <p>Log out</p>
              </button>
            ) : (
              <Link className='derecha' to="/login" hidden={!mostrarBoton}>Login</Link> // Enlace a la página de inicio de sesión si no hay token
            )}
          </div>
          {
            // mostrar el botón solo si la ruta es diferente de "agregar"
            // porque de no evaluar, podríamos entrar en un loop de
            // /agregar/agregar/books/ al dejarnos dar click en la misma seccion
            !token ? '':
            !location.pathname.startsWith('/agregar/') ? 
            <Link className="agregar" to={(location.pathname.endsWith('/')) ? 'agregar/home' : '/agregar'+location.pathname}><p className='agregarMas' title='Agregar información'>+</p></Link> :
            habilitar = false
          }
        </nav>
      </div>
    </>
  );
}