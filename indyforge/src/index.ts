import fastify from 'fastify';
import dotenv from 'dotenv';
import routes from './routes';

// Load environment variables from .env file for local development
dotenv.config();

const app = fastify({ logger: true });

// Register routes
app.register(routes);

// Health check endpoint
app.get('/health', async () => {
  return { status: 'ok' };
});

// Start the server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`IndyForge server listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();