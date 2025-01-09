import express from 'express';
import cors from 'cors';
import { AssemblyAI } from 'assemblyai';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { swaggerSpec } from './swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

if (!process.env.ASSEMBLYAI_API_KEY) {
  throw new Error('ASSEMBLYAI_API_KEY is required');
}else {
  console.log(process.env.ASSEMBLYAI_API_KEY);
}

const aaiClient = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });
const app = express();

app.use(express.json());
app.use(cors());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /token:
 *   get:
 *     summary: Get a temporary AssemblyAI token
 *     description: Creates a temporary token for AssemblyAI real-time transcription
 *     responses:
 *       200:
 *         description: Successful response with token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/token', async (req, res) => {
  try {
    const token = await aaiClient.realtime.createTemporaryToken({ expires_in: 3600 });
    console.log("Generated Token :", token)
    res.json({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

const PORT = process.env.PORT || 8000;
app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
  const address = server.address();
  const port = typeof address === 'string' ? address : address?.port;
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;