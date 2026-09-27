export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  category: string;
  days: number;
  nights: number;
  badge: string;
  route: string;
  /** Starting package price in INR per person, or null when quoted on request. */
  price: number | null;
  region?: "India" | "International";
  forCouples?: boolean;
  /** Starting total in INR for two travellers, or null when quoted on request. */
  coupleStartingPrice?: number | null;
  rateNote?: string;
  tags?: string[];
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
