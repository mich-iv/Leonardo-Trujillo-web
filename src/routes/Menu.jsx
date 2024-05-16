import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import '../estilos/App.css';

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

  useEffect(() => {
    document.querySelector('.menu-desplegar')
    .addEventListener('click', desplegarMenu);
  })
  
  function desplegarMenu() {
    console.log('funcionó kask');
    const navs = document.querySelectorAll('.menuSecciones')
    navs.forEach(nav => nav.classList.toggle('menu-desplegar'));
  }
  
  return (
    <>
      <nav className='menu'>
        <Link className="menuSecciones" to="/">Home</Link>
        <div class="menu-desplegar">
          E
        </div>
        <Link className="menuSecciones" to="/awards">Awards</Link>
        <Link className="menuSecciones" to="/bookChapters">Book Chapters</Link>
        <Link className="menuSecciones" to="/journalPublications">Journal Publications</Link>
        <Link className="menuSecciones" to="/conferencePapers">Select Conference Papers</Link>
        <Link className="menuSecciones" to="/projects">Projects</Link>

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
              <p>Cerrar sesión</p>
            </button>
          ) : (
            <Link to="/login" hidden={!mostrarBoton}>Login</Link> // Enlace a la página de inicio de sesión si no hay token
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
    </>
  );
}
