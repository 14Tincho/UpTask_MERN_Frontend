import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioProyecto = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    
    const params = useParams();
    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()

    useEffect( () => {
        if (params.id && proyecto.nombre) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            // El signo de pregunta es algo muy nuevo, eso haria q en todo caso de q haya algun tipo de error, no le de bola y no de error, sino tendriamos que agregar en el condicional del if, tambien un params cualquiera, por ejemplo params.nombre
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        //pasar los datos hacia el provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }

    const { msg } = alerta

    return (
        <form 
            // className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            className="bg-white py-10 px-5 md:w-3/4 rounded-lg shadow"
            onSubmit={handleSubmit}>

                {msg && <Alerta alerta={alerta}/>}

                {/* Nombre del proyecto */}
                <div className="mb-5">
                    <label 
                        htmlFor="nombre" 
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Nombre Proyecto</label>
                    <input 
                        id="nombre" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Nombre del proyecto"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}/>
                </div>

                {/* Descripcion */}
                <div className="mb-5">
                    <label 
                        htmlFor="descripcion" 
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Decripción</label>
                    <textarea 
                        id="descripcion" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Descripción del proyecto"
                        value={descripcion}
                        onChange={e=>setDescripcion(e.target.value)}/>
                </div>

                {/* Fecha de Entrega */}
                <div className="mb-5">
                    <label 
                        htmlFor="fecha-enterga" 
                        // Se puede poner de esta manera, pero para html es recomendable ponerlo de esta otra
                        // htmlFor="fechaEnterga" 
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Fecha de Entrega</label>
                    <input 
                        id="fecha-enterga" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="date"
                        placeholder="Fecha de Entega"
                        value={fechaEntrega}
                        onChange={e=>setFechaEntrega(e.target.value)}/>
                </div>

                {/* Nombre del Cliente */}
                <div className="mb-5">
                    <label 
                        htmlFor="cliente" 
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Nombre del Cliente</label>
                    <input 
                        id="cliente" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Nombre del cliente"
                        value={cliente}
                        onChange={e=>setCliente(e.target.value)}/>
                </div>

                <input 
                    type="submit" 
                    value={id ? "Actualizar Proyecto" : "Crear Proyecto" }
                    className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" />
        </form>
    )
}

export default FormularioProyecto