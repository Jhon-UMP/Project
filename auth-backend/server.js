const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
require('dotenv').config(); // Para manejar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000; // Puerto en el que correrá tu backend

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'users_db' // Asegúrate de que sea el nombre correcto de tu DB
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para el login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      if (results.length > 0) {
        // Comprobar la contraseña con bcrypt
        const validPassword = await bcrypt.compare(password, results[0].password);
        if (validPassword) {
          // Generar un token JWT
          const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secreto_del_token', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      } else {
        res.status(401).json({ error: 'Usuario no encontrado' });
      }
    }
  );
});

// Ruta para el registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verificar si el correo ya está registrado
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Insertar el nuevo usuario
    connection.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword], // Guardar la contraseña encriptada
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al registrar el usuario' });
        }
        res.status(200).json({ success: true });
      }
    );
  });
});

// Ruta para cambiar la contraseña
app.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  // Encriptar la nueva contraseña
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  connection.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [hashedNewPassword, email],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cambiar la contraseña' });
      }
      res.json({ success: true });
    }
  );
});

// Ruta protegida
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secreto_del_token', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.json({ message: 'Acceso concedido', email: decoded.email });
  });
});

// Rutas para gastos
app.get('/api/gastos', (req, res) => {
  connection.query('SELECT * FROM gastos', (err, results) => {
    if (err) {
      console.error('Error al obtener los gastos:', err);
      return res.status(500).json({ error: 'Error al obtener los gastos' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/gastos', (req, res) => {
  const { nombre, monto } = req.body;

  // Validar que ambos campos estén presentes
  if (!nombre || !monto) {
    return res.status(400).json({ error: 'Nombre y monto son obligatorios' });
  }

  // Validar que el monto sea un número válido
  if (isNaN(monto) || monto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser un número válido y mayor que cero' });
  }

  // Agregar el gasto en la base de datos
  connection.query(
    'INSERT INTO gastos (nombre, monto) VALUES (?, ?)',
    [nombre, monto],
    (err, results) => {
      if (err) {
        console.error('Error al agregar el gasto en la base de datos:', err);
        return res.status(500).json({ error: 'Error al agregar el gasto' });
      }

      console.log('Gasto agregado correctamente:', results);
      res.status(201).json({ success: true, gastoId: results.insertId });
    }
  );
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
