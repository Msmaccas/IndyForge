import { Worker } from 'bullmq';
import { prisma } from '../prisma';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

/**
 * Decision worker: enriches DecisionCards produced by the triage worker.
 * In a full implementation, this worker would call LLMs or domain-specific algorithms to propose options and actions.
 */
export const decisionWorker = new Worker(
  'decision',
  async job => {
    const { cardId } = job.data as { cardId: number };
    const card = await prisma.decisionCard.findUnique({ where: { id: cardId } });
    if (!card) return;
    // Example: add a simple options field based on domain
    let options = '';
    let nextAction = '';
    let approvalAction = '';
    if (card.domain === 'trading') {
      options = 'WATCH, BUY, SELL';
      nextAction = 'WATCH';
    } else if (card.domain === 'real-estate') {
      options = 'INSPECT, OFFER, IGNORE';
      nextAction = 'INSPECT';
      approvalAction = 'OFFER';
    } else if (card.domain === 'software') {
      options = 'DEBUG, TRIAGE, DOCUMENT';
      nextAction = 'TRIAGE';
    }
    await prisma.decisionCard.update({
      where: { id: cardId },
      data: {
        options,
        nextAction,
        approvalAction,
      },
    });
  },
  { connection }
);