// Simulación de una base de datos de gastos
let gastos = [];

// Función para obtener todos los gastos
const getAllGastos = async () => {
    return gastos; // Retorna el array de gastos
};

// Función para agregar un nuevo gasto
const addGasto = async (gasto) => {
    // Validar que el gasto tenga los datos necesarios
    if (gasto && gasto.nombre && typeof gasto.monto === 'number' && gasto.monto >= 0) {
        gastos.push(gasto); // Agrega el gasto al array
        return gasto; // Retorna el gasto agregado
    } else {
        throw new Error('Datos del gasto inválidos'); // Lanza un error si los datos son inválidos
    }
};

// Exporta las funciones para ser utilizadas en otros módulos
module.exports = {
    getAllGastos,
    addGasto
};
