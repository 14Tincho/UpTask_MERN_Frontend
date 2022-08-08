import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        if ( password !== repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            })
            return
        }
        if ( password.length < 6) {
            setAlerta({
                msg: 'Las contraseñas debe tener al menos 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
            const {data} = await clienteAxios.post(`/usuarios`, { nombre, email, password})
            setAlerta({
                msg: data.msg,
                error: false
            });

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            return
        }

    }

    const { msg } = alerta

  return (
    <>
      <h1 className="font-black text-6xl text-sky-600 capitalize">Crea Tu Cuenta y Administra tus{''}
      <span className="text-slate-700">Proyectos</span></h1>

        { msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit} 
        className="my-10 bg-white shadow rounded-lg px-10 py-5">

          {/* ##############NOMBRE############## */}
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
              <input 
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 rounded-xl bg-gray-100"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
          </div>

          {/* ##############EMAIL############## */}
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
              <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 rounded-xl bg-gray-100"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
          </div>

          {/* ##############PASSWORD############## */}
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Contraseña</label>
              <input 
                    id="password"
                    type="password"
                    placeholder="Contraseña de Registro"
                    className="w-full mt-3 p-3 rounded-xl bg-gray-100"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                />
          </div>

           {/* ##############REPETIR-PASSWORD############## */}
           <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Contraseña</label>
              <input
                    id="password2"
                    type="password"
                    placeholder="Repetir Tu Contraseña"
                    className="w-full mt-3 p-3 rounded-xl bg-gray-100"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)} 
                />
          </div>

          <input type="submit" value="Crear Cuenta" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />

      </form>

      <nav className="lg:flex lg:justify-between">
          <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
              Ya tengo una cuenta
          </Link>

          <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>
              Olvide mi Contraseña
          </Link>
      </nav>
    </>
  )
}

export default Registrar