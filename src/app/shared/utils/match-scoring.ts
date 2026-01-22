import { countTagMatches } from './tag-matching';

export interface MatchScore {
  titleMatch: boolean;
  tagMatches: number;
  totalScore: number;
}

export function scoreMatch(
  titleKey: string,
  candidateTitleKey: string,
  candidateTags?: readonly string[],
  offerTags?: readonly string[],
  titleWeight = 3
): MatchScore {
  const titleMatch = titleKey === candidateTitleKey;
  const tagMatches = countTagMatches(candidateTags, offerTags);
  const totalScore = (titleMatch ? titleWeight : 0) + tagMatches;

  return {
    titleMatch,
    tagMatches,
    totalScore
  };
}
