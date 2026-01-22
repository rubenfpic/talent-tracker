export interface Offer {
  id: number;
  titleKey: string;
  company: string;
  location: string;
  /**
   * Optional translation key for non-geographic locations (e.g., remote).
   */
  locationKey?: string;
  /**
   * Keyword tags that describe the offer's focus areas.
   */
  tags?: string[];
}
