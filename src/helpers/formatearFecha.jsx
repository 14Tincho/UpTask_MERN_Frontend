
export const formatearFecha = fecha => {

    // Asi es como funciona el new Date() no trates de encontrarle explicacion, es medio raro
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
    
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
