import { Queue, Worker, QueueScheduler } from 'bullmq';

/**
 * Setup queues for triage, decision and verification. Uses Redis by default.
 * In local development, Redis is optional – the workers will idle when Redis is unavailable.
 */

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

export const triageQueue = new Queue('triage', { connection });
export const decisionQueue = new Queue('decision', { connection });
export const verifierQueue = new Queue('verifier', { connection });

// Schedulers are required to enable delayed jobs and retries
new QueueScheduler('triage', { connection });
new QueueScheduler('decision', { connection });
new QueueScheduler('verifier', { connection });