import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'AssemblyAI Token API',
    version: '1.0.0',
    description: 'API for generating AssemblyAI temporary tokens'
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local development server'
    }
  ],
  paths: {
    '/token': {
      get: {
        summary: 'Get a temporary AssemblyAI token',
        description: 'Creates a temporary token for AssemblyAI real-time transcription',
        responses: {
          '200': {
            description: 'Successful response with token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};