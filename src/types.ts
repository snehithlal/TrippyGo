export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  category: string;
  days: number;
  nights: number;
  badge: string;
  route: string;
  /** Standard package price in INR per person. */
  price: number;
  /** Lower values appear earlier in the public package list. */
  displayOrder?: number;
  image: string;
  alt: string;
  description: string;
  fullDescription?: string;
  features: string[];
  itinerary: { title: string; text: string }[];
}

export interface Destination {
  id: string;
  title: string;
  destination: string;
  region: string;
  category: string;
  duration: string;
  tag: string;
  image: string;
  alt: string;
  description: string;
  highlights: string[];
  itinerary: string[];
}

export interface SiteContent {
  name: string;
  instagram: string;
  handle: string;
  whatsapp: string;
  phones: { label: string; value: string }[];
  email: string;
  tagline: string;
  logo: string;
  heroImage: string;
}

export interface GalleryPhoto {
  image: string;
  alt: string;
  label: string;
  type: string;
}
