import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e =>  {
        e.preventDefault();

        if (email === '' || email < 6) {
            setAlerta({
                msg:'El email es obligatorio',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password`, { email })
            setAlerta({
                msg: data.msg,
                error: false
            });
            setEmail('')
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
        <h1 className="font-black text-6xl text-sky-600 capitalize">Recuperar tu acceso y no pierdas tus {''}
            <span className="text-slate-700">Proyectos</span>
        </h1>

        { msg && <Alerta alerta={alerta} />}

        <form 
            onSubmit={handleSubmit} 
            className="my-10 bg-white shadow rounded-lg px-10 py-5">

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

            <input 
                type="submit" value="Recuperar contraseña" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />

        </form>

        <nav className="lg:flex lg:justify-between">
            <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                Iniciar Sesion
            </Link>

            <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                ¿No tienes una cuenta? Regístrate
            </Link>
        </nav>
    </>
  )
}

export default OlvidePassword