/**
 * DecisionCard represents the output of the triage and decision workers.
 * Each card summarises a messy input and contains fields used to rank and act upon it.
 *
 * Fields mirror the Prisma model defined in prisma/schema.prisma.
 */
export interface DecisionCard {
  id?: number;
  source: string;
  domain: string;
  urgency: string;
  reversibility: string;
  riskTier: string;
  missingData: string;
  options: string;
  nextAction: string;
  approvalAction: string;
  createdAt?: Date;
  updatedAt?: Date;
}