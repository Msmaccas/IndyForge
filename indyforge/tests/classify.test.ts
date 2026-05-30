import { describe, it, expect } from 'vitest';
import { classifyDomain } from '../src/classify';

describe('classifyDomain', () => {
  it('detects trading domain keywords', () => {
    expect(classifyDomain('This stock ticker looks interesting')).toBe('trading');
  });
  it('detects real estate keywords', () => {
    expect(classifyDomain('Review property listing for rental income')).toBe('real-estate');
  });
  it('detects software keywords', () => {
    expect(classifyDomain('Repo failing build on CI')).toBe('software');
  });
  it('defaults to unknown when no keyword matches', () => {
    expect(classifyDomain('Just saying hello')).toBe('unknown');
  });
});