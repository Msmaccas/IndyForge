import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { triageQueue, decisionQueue, verifierQueue } from './queue';
import { prisma } from './prisma';

const ingestSchema = z.object({
  content: z.string().min(1),
});

export default async function routes(app: FastifyInstance) {
  // Ingest endpoint: accept raw input and enqueue for triage
  app.post('/ingest', async (request: FastifyRequest, reply: FastifyReply) => {
    const result = ingestSchema.safeParse(request.body);
    if (!result.success) {
      return reply.code(400).send({ error: 'Invalid input' });
    }
    const { content } = result.data;
    await triageQueue.add('triage-job', { content });
    return { status: 'queued' };
  });

  // Endpoint to trigger decision processing on a card
  app.post('/cards/:id/process', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    await decisionQueue.add('decision-job', { cardId: id });
    return { status: 'processing' };
  });

  // Endpoint to trigger verification
  app.post('/cards/:id/verify', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    await verifierQueue.add('verify-job', { cardId: id });
    return { status: 'verifying' };
  });

  // List all decision cards
  app.get('/cards', async () => {
    const cards = await prisma.decisionCard.findMany({ orderBy: { createdAt: 'desc' } });
    return { cards };
  });
}