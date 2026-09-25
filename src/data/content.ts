import type { Destination, GalleryPhoto, SiteContent } from "../types";

// Edit this file to update the site. Images can also be local files in public/images/.
// These are sample trip ideas, not confirmed offers. Add approved pricing when ready.
export const site: SiteContent = {
  name: "TrippyGo",
  instagram: "https://www.instagram.com/_trippy_go/",
  handle: "@_trippy_go",
  whatsapp: "918075295734",
  phones: [
    { label: "+91 80752 95734", value: "+918075295734" },
    { label: "+91 70251 93391", value: "+917025193391" },
  ],
  email: "trippygo.in@gmail.com",
  tagline: "Pack your Dreams",
  logo: "./images/trippygo-logo.webp",
  heroImage: "./images/forest-treehouse.webp",
};
export const trips: Destination[] = [
  {
    id: "munnar",
    title: "Lost in the tea gardens",
    destination: "Munnar",
    region: "Kerala",
    category: "Mountains",
    duration: "3 days · 2 nights",
    tag: "A breath of fresh air",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80",
    alt: "Green tea plantations across the hills of Munnar",
    description:
      "Misty mornings, winding hill roads, and a slower kind of weekend. Find a little peace in the lush hills of Munnar.",
    highlights: ["Tea garden walks", "Scenic viewpoints", "Time to unwind"],
    itinerary: [
      "Arrive in Munnar, settle in, and take a gentle evening walk.",
      "Explore tea gardens and scenic viewpoints at your own pace.",
      "Enjoy a slow breakfast before your journey home.",
    ],
  },
  {
    id: "alleppey",
    title: "Life in the slow lane",
    destination: "Alleppey",
    region: "Kerala",
    category: "Backwaters",
    duration: "2 days · 1 night",
    tag: "Just go with the flow",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    alt: "Palm-lined Kerala backwaters and peaceful waterways",
    description:
      "Trade the rush for palm-fringed waterways, village life, and golden evenings by the water.",
    highlights: ["Backwater scenery", "Local flavours", "Golden-hour views"],
    itinerary: [
      "Arrive in Alleppey and explore the backwaters. Ask us about houseboat options.",
      "Wake up by the water, enjoy breakfast, and head home refreshed.",
    ],
  },
  {
    id: "varkala",
    title: "Chasing coastal sunsets",
    destination: "Varkala",
    region: "Kerala",
    category: "Beaches",
    duration: "3 days · 2 nights",
    tag: "Salt in the air",
    image:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=900&q=80",
    alt: "Sunlit tropical beach beside the ocean",
    description:
      "Barefoot days, cliffside cafés, and sunsets worth staying a little longer for. Your coastal reset starts here.",
    highlights: ["Beach time", "Cliffside cafés", "Sunset strolls"],
    itinerary: [
      "Arrive and settle into the easy rhythm of the coast.",
      "Spend the day exploring beaches and cliffside cafés.",
      "One last seaside breakfast, then your return journey.",
    ],
  },
  {
    id: "wayanad",
    title: "Into the quieter wild",
    destination: "Wayanad",
    region: "Kerala",
    category: "Mountains",
    duration: "3 days · 2 nights",
    tag: "The green escape",
    image: "./images/wayanad-wildlife.webp",
    alt: "Elephants in the green forests of Wayanad, from TrippyGo’s Instagram",
    description:
      "Forest trails, fresh air, and unhurried days surrounded by green. A refreshing escape for your favourite people.",
    highlights: ["Forest surroundings", "Nature walks", "Scenic drives"],
    itinerary: [
      "Arrive, check in, and enjoy the green surroundings.",
      "Explore local viewpoints and nature trails, subject to access.",
      "Relax over breakfast before heading back.",
    ],
  },
];
export const faqs: [question: string, answer: string][] = [
  [
    "Can I customise my trip?",
    "Absolutely. Tell us your destination, dates, group size, and the things you love. We’ll help shape an itinerary around you.",
  ],
  [
    "How do I book with TrippyGo?",
    "Start a conversation with us on WhatsApp, give us a call, or send an Instagram message. We’ll discuss your plans and share availability, the final itinerary, and a quote before you decide.",
  ],
  [
    "Are stays and transport included?",
    "Inclusions depend on your customised plan. We’ll confirm accommodation, transport, meals, and activities in your quote so you know exactly what you’re booking.",
  ],
  [
    "Can you plan a trip for a group?",
    "Yes—share your group size and the kind of trip you have in mind, from a friends’ getaway to a family holiday.",
  ],
];

// Photographs cropped from the Instagram screenshots supplied by the owner.
export const gallery: GalleryPhoto[] = [
  {
    image: "./images/woodland-stay.webp",
    alt: "A-frame stay surrounded by tropical greenery",
    label: "Wake up somewhere new",
    type: "STAYS WITH CHARACTER",
  },
  {
    image: "./images/wayanad-wildlife.webp",
    alt: "Elephants at the forest edge in Wayanad",
    label: "A little closer to the wild",
    type: "WAYANAD DIARIES",
  },
  {
    image: "./images/sunset-stay.webp",
    alt: "Warm sunset above a countryside holiday stay",
    label: "Stay for the golden hour",
    type: "THE SLOW LIFE",
  },
];
