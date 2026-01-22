import { normalizeTag } from './tag-normalizer';

export function countTagMatches(
  sourceTags?: readonly string[],
  targetTags?: readonly string[]
): number {
  if (!sourceTags?.length || !targetTags?.length) {
    return 0;
  }

  const sourceSet = new Set(sourceTags.map((tag) => normalizeTag(tag)));
  const targetSet = new Set(targetTags.map((tag) => normalizeTag(tag)));
  let matches = 0;

  for (const tag of sourceSet) {
    if (targetSet.has(tag)) {
      matches += 1;
    }
  }

  return matches;
}
