import { matchOfferToCandidate, rankCandidatesForOffer, rankOffersForCandidate } from './candidate-offer-matching';
import { Candidate } from '@app/features/candidates/models/candidate.model';
import { Offer } from '@app/features/offers/models/offer.model';

function makeCandidate(): Candidate {
  return {
    id: 1,
    name: 'Test Candidate',
    email: 'test@example.com',
    avatar: '',
    titleKey: 'frontend_engineer',
    location: 'Madrid',
    tags: ['Angular', 'TypeScript']
  };
}

function makeOffer(): Offer {
  return {
    id: 201,
    titleKey: 'frontend_engineer',
    description: 'Test description',
    company: 'Test Company',
    location: 'Madrid',
    tags: ['Angular', 'UI', 'TypeScript'],
    experienceYears: 2,
    employmentType: 'full_time'
  };
}

describe('matchOfferToCandidate', () => {
  it('should calculate score with title and matching tags', () => {
    // ARRANGE
    const candidate = makeCandidate();
    const offer = makeOffer();
    // ACT
    const result = matchOfferToCandidate(offer, candidate);
    // ASSERT
    expect(result.score.titleMatch).toBe(true);
    expect(result.score.tagMatches).toBe(2);
    expect(result.score.totalScore).toBe(7);
  });
});

describe('rankOffersForCandidate', () => {
  it('should calculate score of an offer for a candidate', () => {
    // ARRANGE
    const candidate = makeCandidate();
    const offer = makeOffer();
    // ACT
    const result = rankOffersForCandidate([offer], candidate);
    // ASSERT
    expect(result).toHaveLength(1);
    expect(result[0].score.totalScore).toBe(7);
  });
});

describe('rankCandidatesForOffer', () => {
  it('should calculate score of a candidate for an offer', () => {
    // ARRANGE
    const candidate = makeCandidate();
    const offer = makeOffer();
    // ACT
    const result = rankCandidatesForOffer([candidate], offer);
    // ASSERT
    expect(result).toHaveLength(1);
    expect(result[0].score.totalScore).toBe(7);
  });
});