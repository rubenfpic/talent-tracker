import { CANONICAL_TAGS } from '../constants/tags';

const CANONICAL_TAG_MAP = new Map(
  CANONICAL_TAGS.map((tag) => [normalizeTag(tag), tag])
);

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function canonicalizeTags(tags?: string[]): string[] | undefined {
  if (!tags) {
    return tags;
  }

  return tags.map((tag) => CANONICAL_TAG_MAP.get(normalizeTag(tag)) ?? tag);
}
