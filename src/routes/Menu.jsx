import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import '../estilos/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
  var habilitar = true;
  //método para obtener datos del usuario con sesión iniciada
  const sesion = getAuth(); // Obtiene la sesión de autenticación

  // Variables de estado para almacenar los datos del usuario
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState('');
  const [token, setToken] = useState('');

  const [mostrarBoton, setMostrarBoton] = useState(false);

  // Para mostrar el botón de inicio de sesión, presiona Ctrl + Shift + Insert o toca la pantalla con 5 dedos

  const handleKeyboard = ({ repeat, metaKey, ctrlKey, shiftKey, key }) => {
    // Si la tecla se mantiene presionada y el evento se repite, no hacer nada
    if (repeat) return;

    // Verificar si se presionan las teclas `meta` (⌘ en Mac) o `ctrl` (en Windows/Linux) junto con `shift` y `Insert`
    if (((metaKey || ctrlKey) && shiftKey) && key === 'Insert') {
      // Alternar el estado de `mostrarBoton`
      setMostrarBoton(prev => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
  
    // Important to remove the listeners.
    return () => document.removeEventListener('keydown', handleKeyboard)
  })

  useEffect(() => {
    let touchStartTime = 0;
    let touchCount = 0;

    const handleTouchStart = (event) => {
      if (event.touches.length === 5) {
        touchStartTime = Date.now();
        touchCount++;
      }
    };

    const handleTouchEnd = (event) => {
      if (event.touches.length === 0 && touchCount === 5) {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 500) {
          setMostrarBoton(prev => !prev);
        }
        touchCount = 0;
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Obtiene los datos del usuario al iniciar sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(sesion, (usuario) => {
      if (usuario) {
        setNombre(usuario.displayName);
        setFoto(usuario.photoURL);
        setToken(usuario.accessToken);
      }
    });

    // Limpia el effect cuando se desmonta el componente
    return () => unsubscribe();
  }, [sesion]); // Dependencia de effect: solo se ejecuta si cambia la sesión
  //Es decir si la sesion cambia, cambia el componente xd

  const location = useLocation(); // Obtiene la ubicación actual

  //obtenemos la ubicacion actual desde el url 
  // y lo formateamos con espacios con la siguiente lista de secciones'

  let ubicacion = useLocation(); // Obtiene la ubicación actual

  if (ubicacion.pathname === '/') {
    ubicacion = 'Home';
  } else if (ubicacion.pathname === '/awards') {
    ubicacion = 'Awards';
  } else if (ubicacion.pathname === '/bookChapters') {
    ubicacion = 'Book Chapters';
  } else if (ubicacion.pathname === '/journalPublications') {
    ubicacion = 'Journal Publications';
  } else if (ubicacion.pathname === '/conferencePapers') {
    ubicacion = 'Select Conference Papers';
  } else if (ubicacion.pathname === '/projects') {
    ubicacion = 'Projects';
  } else if (ubicacion.pathname === '/books') {
    ubicacion = 'Books';
  } else if (ubicacion.pathname === '/students') {
    ubicacion = 'Students';
  } else if (ubicacion.pathname === '/code') {
    ubicacion = 'Code';
  }

  useEffect(() => {
    const handleClick = () => {
      document.getElementById('check').checked = false;
    };

    const menuItems = document.querySelectorAll('.menu-secciones, .menu-secciones-derecha, .cuerpo');
    menuItems.forEach(item => {
      item.addEventListener('click', handleClick);
    });

    return () => {
      menuItems.forEach(item => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);
    
  return (
    <>
      <div className="menu">
        <input type="checkbox" id="check"></input>
        <label htmlFor="check" className="checkbtn">
          <FontAwesomeIcon icon={faBars} className="fas fa-bars"/>
        </label>

        <div className='menu-desplegar'>
          <div className='menu-secciones'>
            <div className='menu-secciones-izquierda'>
              <Link className="menu-secciones-izquierda-links" to="/">Home</Link>
              <Link className="menu-secciones-izquierda-links" to="/journalPublications">Journal Publications</Link>
              <Link className="menu-secciones-izquierda-links" to="/conferencePapers">Select Conference Papers</Link>
              <Link className="menu-secciones-izquierda-links" to="/bookChapters">Book Chapters</Link>
              <Link className="menu-secciones-izquierda-links" to="/books">Books</Link>
              <Link className="menu-secciones-izquierda-links" to="/projects">Projects</Link>
              <Link className="menu-secciones-izquierda-links" to="/students">Students</Link>
              <Link className="menu-secciones-izquierda-links" to="/code">Code</Link>
              <Link className="menu-secciones-izquierda-links" to="/awards">Awards</Link>
            </div>
            <div className='menu-secciones-derecha'>
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
                    className='menu-secciones-derecha-boton'
                    type="submit"
                    id="cerrarSesion"
                    onClick={() => {
                      signOut(sesion);
                      window.location.reload(); // Recarga la página al cerrar sesión
                    }}
                  >
                    <img className='menu-secciones-derecha-boton-imagen' alt="foto" referrerPolicy="no-referrer" src={foto}/>
                    Log out
                  </button>
                ) : (
                  <Link className="menu-secciones-derecha" style={{float: 'right', display: mostrarBoton ? 'flex' : 'none'}} to="/login">Login</Link> // Enlace a la página de inicio de sesión si no hay token
                )}
              {
                // mostrar el botón solo si la ruta es diferente de "agregar"
                // porque de no evaluar, podríamos entrar en un loop de
                // /agregar/agregar/books/ al dejarnos dar click en la misma seccion
                !token ? '':
                !location.pathname.startsWith('/agregar/') ?
                <Link className="agregar" to={(location.pathname.endsWith('/')) ? 'agregar/home' : '/agregar'+location.pathname} title='Add information'><FontAwesomeIcon icon={faPen} title='Add information' className="fas fa-pen"/></Link> :
                habilitar = false
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}