import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './estilos/Paginas.css';
import Menu from './routes/Menu.jsx'

import {createHashRouter, Outlet, RouterProvider} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Home from './routes/home.jsx'
import Awards from './routes/awards.jsx'
import BookChapters from './routes/bookChapters.jsx'
import JournalPublications from './routes/journalPublications.jsx'
import ConferencePapers from './routes/conferencePapers.jsx'
import Projects from './routes/projects.jsx'

function App() {
  const [count, setCount] = useState(0)

  return(
    <div>
      <div>
        <Menu/>
      </div>
      <div className='cuerpo'>
      <Outlet/>
      </div>

    </div>
  )
}

export default App
