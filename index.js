import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Arranca el servidor
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 NutriPuerta corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
  }
};

start();
