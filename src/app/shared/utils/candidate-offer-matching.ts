import { Candidate } from '@app/features/candidates/models/candidate.model';
import { Offer } from '@app/features/offers/models/offer.model';
import { scoreMatch } from './match-scoring';

export function matchOfferToCandidate(
  offer: Offer,
  candidate: Candidate
) {
  const score = scoreMatch(
    offer.titleKey,
    candidate.titleKey,
    offer.tags,
    candidate.tags
  )
  return {
    offer,
    candidate,
    score
  }
}

export function rankOffersForCandidate(
  offers: Offer[],
  candidate: Candidate
) {
  const scores = offers.map(offer => {
    return matchOfferToCandidate(offer, candidate);
  }).sort((a, b) => b.score.totalScore - a.score.totalScore);
  return scores;
}

export function rankCandidatesForOffer(
  candidates: Candidate[],
  offer: Offer
) {
  const scores = candidates.map(candidate => {
    return matchOfferToCandidate(offer, candidate);
  }).sort((a, b) => b.score.totalScore - a.score.totalScore);
  return scores;
}