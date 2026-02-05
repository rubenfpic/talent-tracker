import { countTagMatches } from './tag-matching';

export interface MatchScore {
  titleMatch: boolean;
  tagMatches: number;
  totalScore: number;
}

export function scoreMatch(
  offerTitleKey: string,
  candidateTitleKey: string,
  offerTags?: readonly string[],
  candidateTags?: readonly string[]
): MatchScore {
  const titleWeight = 4;
  const titleMatch = offerTitleKey === candidateTitleKey;
  const tagMatches = countTagMatches(candidateTags, offerTags);
  const totalScore = (titleMatch ? titleWeight : 0) + (tagMatches * (tagMatches + 1) / 2);

  return {
    titleMatch,
    tagMatches,
    totalScore
  };
}
