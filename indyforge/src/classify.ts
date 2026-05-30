/**
 * classifyDomain is a simple heuristic classifier that guesses the domain
 * of an incoming message based on keywords. Replace this with a more
 * sophisticated classifier or LLM integration as needed.
 * @param content raw input content
 * @returns a domain string
 */
export function classifyDomain(content: string): string {
  if (/stock|equity|ticker|chart/i.test(content)) {
    return 'trading';
  }
  if (/property|real estate|rent|tenant/i.test(content)) {
    return 'real-estate';
  }
  if (/repo|issue|pull request|build|compile|error/i.test(content)) {
    return 'software';
  }
  if (/research|study|clinical|patient|medical|trial/i.test(content)) {
    return 'research-medical';
  }
  if (/brand|marketing|content|social media/i.test(content)) {
    return 'brand-content';
  }
  return 'unknown';
}