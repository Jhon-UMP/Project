const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000; // Puerto en el que correrá tu backend

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users_db' // Asegúrate de que sea el nombre correcto de tu DB
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
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      if (results.length > 0) {
        // Generar un token JWT
        const token = jwt.sign({ email }, 'secreto_del_token', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    }
  );
});

// Ruta para el registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

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
      [email, password],
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
app.post('/change-password', (req, res) => {
  const { email, newPassword } = req.body;

  connection.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [newPassword, email],
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

  jwt.verify(token, 'secreto_del_token', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.json({ message: 'Acceso concedido', email: decoded.email });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
