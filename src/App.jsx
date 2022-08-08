import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import NuevaPassword from './pages/NuevaPassword'
import OlvidePassword from './pages/OlvidePassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Proyectos from './pages/Proyectos'
import RutaProtegida from './layouts/RutaProtegida'
import NuevoProyecto from './pages/NuevoProyecto'
import Proyecto from './pages/Proyecto'
import EditarProyecto from './pages/EditarProyecto'
import NuevoColaborador from './pages/NuevoColaborador'

import { AuthProvider } from './context/AuthProviders'
import { ProyectosProvider } from './context/ProyectosProvider'


function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
            <ProyectosProvider>
                <Routes>
                    <Route path='/' element={<AuthLayout />}>
                        <Route index element={<Login/>} />
                        <Route path='registrar' element={<Registrar/>} />
                        <Route path='olvide-password' element={<OlvidePassword/>} />
                        <Route path='olvide-password/:token' element={<NuevaPassword/>} />
                        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                    </Route>

                    <Route path='/proyectos' element={<RutaProtegida/>}>
                        <Route index element={<Proyectos/>}/>
                        <Route path='crear-proyecto' element={<NuevoProyecto />} />
                        <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
                        <Route path=':id' element={<Proyecto />} />
                        <Route path='editar/:id' element={<EditarProyecto />} />
                    </Route>
                </Routes>
            </ProyectosProvider>
          </AuthProvider>
      </BrowserRouter>
  )
}

export default App