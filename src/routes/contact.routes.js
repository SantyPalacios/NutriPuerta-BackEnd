import { Router } from 'express';

const router = Router();

router.post('/contact', async (req, res) => {
  const { name, email, question, source, areas, calculations } = req.body;

  if (!name || !email || !question) {
    return res.status(400).json({ error: 'Name, email, and question are required fields.' });
  }

  // Print simulated email log to backend console
  console.log('\n==================================================');
  console.log('✉️  [SIMULACIÓN DE CORREO ENVIADO A TU CASILLA PERSONAL]');
  console.log(`Para: ${name} <${email}>`);
  console.log(`De: consultas@nutripuerta.com`);
  console.log(`Asunto: Tu Consulta y Datos Guardados - NutriPuerta`);
  console.log('--------------------------------------------------');
  console.log(`Áreas de Interés Seleccionadas: ${areas && areas.length > 0 ? areas.join(', ') : 'Ninguna especificada'}`);
  console.log(`¿Cómo nos conoció?: ${source}`);
  console.log('--------------------------------------------------');
  console.log(`Tu Pregunta de Interés:\n"${question}"`);
  console.log('--------------------------------------------------');
  
  if (calculations) {
    console.log('Informe Nutricional Adjunto:');
    console.log(`- Peso: ${calculations.weight} kg  |  Altura: ${calculations.height} cm`);
    console.log(`- Edad: ${calculations.age} años |  Sexo Biológico: ${calculations.sex}`);
    console.log(`- IMC: ${calculations.imc} (${calculations.imcCategory})`);
    console.log(`- RED: ${calculations.red} kcal / día`);
    if (calculations.carbs) {
      console.log(`- Distribución de Macronutrientes sugerida:`);
      console.log(`  * Carbohidratos (45-65%): ${calculations.carbs.min}g - ${calculations.carbs.max}g`);
      console.log(`  * Proteínas (10-35%): ${calculations.protein.min}g - ${calculations.protein.max}g`);
      console.log(`  * Grasas (20-35%): ${calculations.fats.min}g - ${calculations.fats.max}g`);
    }
  } else {
    console.log('No se calcularon datos nutricionales previos.');
  }
  console.log('==================================================\n');

  // Return success response
  res.status(201).json({
    status: 'success',
    message: 'Simulated email sent and logged successfully.'
  });
});

export default router;
