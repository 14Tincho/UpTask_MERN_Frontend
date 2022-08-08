import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';



const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios.get(url)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
        })
      }
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <>
        <h1 className="font-black text-6xl text-sky-600 capitalize">Confirma tu Cuenta y Comienza a Crear Tus {''}
        <span className="text-slate-700">Proyectos</span></h1>

        <div className='mt-20 md:mt-20 shadow-lg px-5 py-5 rounded-xl bg-white'>
          { msg && <Alerta alerta={alerta} />}

          {cuentaConfirmada && (
                <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm font-bold'>
                      Inicia Sesion
                </Link>
          )}
        </div> 
    </>
  )
}

export default ConfirmarCuenta