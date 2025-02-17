import Menu from './routes/Menu.jsx'
import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import '../src/estilos/Paginas.css';

function App() {
  return(
    <HelmetProvider>
      <div className='secciones'>
        <div className='cabecera'>
          <Menu/>
        </div>

        <div className='cuerpo'>
          <br/>
          <br/>
          <br/>
          <Outlet/>
        </div>

        {/* <div className='pie'>
          <div className='pie-texto'>
          </div>
        </div> */}
      </div>
    </HelmetProvider>
  )
}

export default App
