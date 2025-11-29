export interface Candidate {
  id: number;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  /**
   * Optional translation key for non-geographic locations (e.g., remote).
   * When present, the UI should prefer translating this key over the raw location text.
   */
  locationKey?: string;
  /**
   * Keyword tags that describe the candidate's skills or focus areas.
   */
  tags?: string[];
  /**
   * Brief bio split across soft skills and technical focus.
   */
  about?: CandidateAbout;
}

export interface CandidateAbout {
  soft: string;
  tech: string;
}
