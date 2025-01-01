import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// import './estilos/Paginas.css';
import Menu from './routes/Menu.jsx'

import {createHashRouter, Outlet, RouterProvider} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Home from './routes/secciones/home.jsx'
import Awards from './routes/secciones/awards.jsx'
import BookChapters from './routes/secciones/bookChapters.jsx'
import JournalPublications from './routes/secciones/journalPublications.jsx'
import ConferencePapers from './routes/secciones/conferencePapers.jsx'
import Projects from './routes/secciones/projects.jsx'

// import './estilos/App.css';
// import './estilos/Menu.css';
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'

// window.addEventListener("touchstart", (event) => {
//   if (event.touches.length === 3) {
//     alert('3-finger touch detected');
//   }
// });

function App() {
  return(
    <HelmetProvider>
      <div className='secciones'>
        <div className='cabecera2'>
          <Menu/>
        </div>

        <div className='cuerpo2'>
          <br/>
          <br/>
          <br/>
          <Outlet/>
        </div>

        <div className='pie'>
          {/* <p>Footer</p> */}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default App
