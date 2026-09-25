import type { TourPackage } from "../types";

// Package concepts: confirm operational details before publishing fixed offers.
// price is the standard per-person package amount in INR, not a negotiable starting rate.
// Initial amounts are design placeholders; update them with the business’s final rates.
// The public UI displays prices without sample badges, as requested.
export const packages: TourPackage[] = [
  {
    id: "kerala-slow-trail",
    title: "The Kerala slow trail",
    destination: "Kerala",
    category: "Nature",
    days: 5,
    nights: 4,
    badge: "Hills meet backwaters",
    route: "Munnar → Alleppey → Kochi",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1100&q=85",
    alt: "Green Kerala landscape with palm-lined waterways",
    description:
      "Tea-scented mornings, a day on the water, and a little old-world charm. A gentle introduction to Kerala.",
    features: ["Scenic stays", "Private transfers", "Local experiences"],
    itinerary: [
      {
        title: "The road to the hills",
        text: "Arrive in Kochi and travel to Munnar, with scenic stops along the way.",
      },
      {
        title: "A slower shade of green",
        text: "Explore tea gardens and viewpoints, with time for an unhurried afternoon.",
      },
      {
        title: "Down to the backwaters",
        text: "Travel to Alleppey. Discuss a houseboat or waterside stay when planning your trip.",
      },
      {
        title: "A little Kochi magic",
        text: "Return to Kochi for heritage streets, cafés, and a relaxed waterfront evening.",
      },
      {
        title: "Until next time",
        text: "Breakfast and your return transfer, arranged around your onward journey.",
      },
    ],
  },
  {
    id: "wayanad-weekend",
    title: "A cabin in the green",
    destination: "Wayanad",
    category: "Nature",
    days: 3,
    nights: 2,
    badge: "A little closer to nature",
    route: "Wayanad · Forest stays · Scenic trails",
    price: 5999,
    image: "./images/woodland-stay.webp",
    alt: "A-frame cabin surrounded by lush greenery",
    description:
      "Switch off the notifications. Wake up to birdsong, explore the green outdoors, and let the weekend breathe.",
    features: ["Nature stays", "Flexible pace", "Scenic drives"],
    itinerary: [
      {
        title: "Check in. Tune out.",
        text: "Arrive at your selected stay and spend the evening settling into the surroundings.",
      },
      {
        title: "Follow the green",
        text: "Plan a day of viewpoints and nature walks, subject to weather and local access.",
      },
      {
        title: "One more slow morning",
        text: "Enjoy breakfast and a little time outdoors before your journey home.",
      },
    ],
  },
  {
    id: "goa-coast",
    title: "Saltwater state of mind",
    destination: "Goa",
    category: "Beach",
    days: 4,
    nights: 3,
    badge: "For the sunset seekers",
    route: "Goa · Beaches · Colourful lanes",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85",
    alt: "Clear ocean water and a sunlit beach",
    description:
      "Beach mornings, colourful neighbourhoods, and evenings with nowhere else to be. Take the coast at your own pace.",
    features: ["Coastal stays", "Leisure time", "Local exploring"],
    itinerary: [
      {
        title: "Hello, sea breeze",
        text: "Arrive, settle into your stay, and head out for a sunset stroll.",
      },
      {
        title: "Find your favourite beach",
        text: "Choose a relaxed beach day or ask us about available activities.",
      },
      {
        title: "Beyond the shoreline",
        text: "Explore local neighbourhoods and cafés, with free time for your own discoveries.",
      },
      {
        title: "A last look at the sea",
        text: "Take a slow morning before checking out and travelling home.",
      },
    ],
  },
  {
    id: "manali-mountains",
    title: "Meet me in the mountains",
    destination: "Manali",
    category: "Adventure",
    days: 6,
    nights: 5,
    badge: "Take the high road",
    route: "Manali · Mountain valleys · Village walks",
    price: 16999,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=85",
    alt: "Dramatic mountain peaks beneath clouds",
    description:
      "Crisp air, winding roads, and mountain mornings. Build a Himalayan escape around the season and your sense of adventure.",
    features: ["Mountain stays", "Valley drives", "Seasonal activities"],
    itinerary: [
      {
        title: "Into the mountains",
        text: "Arrive in Manali and take time to rest after your journey.",
      },
      {
        title: "Wander a little",
        text: "Explore village lanes and local cafés at an easy pace.",
      },
      {
        title: "Valley views",
        text: "Plan a scenic valley excursion based on weather and road conditions.",
      },
      {
        title: "Your kind of adventure",
        text: "Choose from locally available activities; costs and suitability are confirmed separately.",
      },
      {
        title: "Leave room for the unexpected",
        text: "Keep a flexible day for another excursion or a relaxed mountain morning.",
      },
      {
        title: "Carry the mountains home",
        text: "Check out and begin your onward journey.",
      },
    ],
  },
];

export const packageCategories = [
  "All trips",
  ...new Set(packages.map((item) => item.category)),
];
export const formatPrice = (value: number | null) =>
  value == null
    ? "On request"
    : `₹${new Intl.NumberFormat("en-IN").format(value)}`;
