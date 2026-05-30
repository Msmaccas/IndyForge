import { Worker } from 'bullmq';
import { prisma } from '../prisma';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

/**
 * Verifier worker: verifies that DecisionCards meet certain criteria before approval.
 * In a full implementation this would include human-in-the-loop checks or automated rule-based evaluations.
 */
export const verifierWorker = new Worker(
  'verifier',
  async job => {
    const { cardId } = job.data as { cardId: number };
    const card = await prisma.decisionCard.findUnique({ where: { id: cardId } });
    if (!card) return;
    // Example: mark high-risk cards as needing approval
    if (card.riskTier === 'high' || card.approvalAction) {
      // In a real system you would notify a human reviewer
      console.log(`Card ${cardId} requires human approval for: ${card.approvalAction}`);
    }
  },
  { connection }
);