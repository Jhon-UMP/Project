const express = require('express');
const router = express.Router();
const gastosService = require('../services/gastosService'); // Importamos el servicio de gastos

// Ruta para obtener todos los gastos
router.get('/', async (req, res) => {
    try {
        const gastos = await gastosService.getAllGastos(); // Asegúrate de que getAllGastos sea asincrónico si es necesario
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los gastos' });
    }
});

// Ruta para crear un nuevo gasto
router.post('/', async (req, res) => {
    const nuevoGasto = req.body; // Obtener datos del nuevo gasto desde el frontend
    try {
        await gastosService.addGasto(nuevoGasto); // Asegúrate de que addGasto sea asincrónico
        res.status(201).json({ message: 'Gasto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el gasto' });
    }
});

module.exports = router;
