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

export interface TourStop {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  details?: string;
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
