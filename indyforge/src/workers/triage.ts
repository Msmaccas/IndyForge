import { Worker } from 'bullmq';
import { prisma } from '../prisma';
import { classifyDomain } from '../classify';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

/**
 * Triage worker: takes raw input (string) and classifies it into a basic DecisionCard.
 * Replace the classification logic with your own NLP/LLM-powered classifier. For now it uses simple keywords.
 */
export const triageWorker = new Worker(
  'triage',
  async job => {
    const { content } = job.data as { content: string };
    const domain = classifyDomain(content);
    await prisma.decisionCard.create({
      data: {
        source: content,
        domain,
        urgency: 'medium',
        reversibility: 'reversible',
        riskTier: 'medium',
        missingData: '',
        options: '',
        nextAction: '',
        approvalAction: '',
      },
    });
  },
  { connection }
);