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

import './estilos/App.css';
import { HelmetProvider } from 'react-helmet-async'

function App() {

  return(
    <HelmetProvider>
      <div className='secciones'>
        <div className='cabecera'>
          <Menu/>
        </div>

        <div className='cuerpo'>
          <Outlet/>
        </div>

        <div className='pie'>

        </div>
      </div>
    </HelmetProvider>
  )
}

export default App
