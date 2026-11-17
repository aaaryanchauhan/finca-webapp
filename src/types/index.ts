export interface Amenity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  instructions: string;
  insiderTip: string;
  bestTime: string;
  location: string;
  image: string;
  photos?: string[];
}

export interface AmenityCategoryItem {
  name: string;
  detail?: string;
}

export interface AmenityCategory {
  id: string;
  title: string;
  icon: string;
  items: AmenityCategoryItem[];
}

export interface Bedroom {
  id: string;
  name: string;
  pdfName: string;
  subtitle: string;
  capacity: string;
  bedType: string;
  description: string;
  photos: string[];
  bathroomPhotos?: string[];
  features: string[];
}

export interface ExploreCategory {
  id: string;
  label: string;
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  name: string;
  note: string;
  distance: string;
  address?: string;
  quote: string;
  image: string;
  instagram?: string;
  bestTimes?: string[];
  reservations?: string;
  highlights?: string[];
  actionText?: string;
  tag?: string;
  mapUrl?: string;
  hideDirections?: boolean;
}

export interface ItineraryDay {
  day: string;
  label: string;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface ItineraryPace {
  id: string;
  label: string;
  description: string;
}

export interface Resident {
  id: string;
  name: string;
  species: string;
  description: string;
  image: string;
}

export interface PropertyStorySection {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
}

export interface CollagePlacement {
  /** CSS grid-column value, e.g. "2 / span 6" */
  col: string;
  /** CSS grid-row value, e.g. "1 / span 4" */
  row: string;
}

export interface CollageMobile {
  /** Columns taken on the two-column phone grid. */
  span: 1 | 2;
  /** CSS aspect-ratio for photos on phones, e.g. "4 / 3". */
  ar?: string;
}

interface CollageItemBase {
  /** Desktop placement on the 12-column board. Tiles never overlap. */
  d: CollagePlacement;
  /** Phone layout. */
  m: CollageMobile;
}

export interface CollagePhoto extends CollageItemBase {
  kind: 'photo';
  src: string;
  alt: string;
  caption?: string;
}

export interface CollageText extends CollageItemBase {
  kind: 'text';
  title: string;
  /** Second clause, set in champagne italics. */
  em?: string;
  body?: string;
  size?: 'md' | 'lg' | 'xl';
}

export type CollageItem = CollagePhoto | CollageText;

export interface CollageChapter {
  id: string;
  name: string;
  /** Amenity ids that should open the tour at this chapter. */
  amenityIds?: string[];
  items: CollageItem[];
}

export interface MemoryEntry {
  id: string;
  quote: string;
  author: string;
  image: string;
}

export interface ConciergeRequest {
  id: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

export interface GuestbookEntry {
  id: string;
  best_meal: string | null;
  best_experience: string | null;
  discovered: string | null;
  must_do: string | null;
  quote: string | null;
  author_name: string | null;
  created_at: string;
}
