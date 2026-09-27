import { describe, expect, it } from "vitest";
import { formatPrice, sortPackages } from "./data/packages";
import { validatePackageDraft } from "./admin/packageValidation";
import type { TourPackage } from "./types";

const packageDraft = (overrides: Partial<TourPackage> = {}): TourPackage => ({
  id: "sample-trip",
  title: "A sample getaway",
  destination: "Kerala",
  category: "Nature",
  days: 1,
  nights: 0,
  badge: "A quiet escape",
  route: "Kerala · Backwaters",
  price: 12000,
  region: "India",
  displayOrder: 1,
  image: "./images/sample.webp",
  alt: "A green landscape beside the water",
  description: "A quiet getaway with time to explore the local landscape.",
  features: ["Scenic stay"],
  itinerary: [{ title: "Arrive", text: "Check in and settle into your stay." }],
  ...overrides,
});

describe("package catalog", () => {
  it("formats INR prices and unquoted rates", () => {
    expect(formatPrice(24499)).toBe("₹24,499");
    expect(formatPrice(null)).toBe("On request");
  });

  it("orders packages and keeps one record per ID", () => {
    const later = packageDraft({
      id: "later",
      title: "Later",
      displayOrder: 2,
    });
    const earlier = packageDraft({
      id: "earlier",
      title: "Earlier",
      displayOrder: 1,
    });
    const duplicate = packageDraft({
      id: "earlier",
      title: "Updated earlier",
      displayOrder: 1,
    });

    expect(
      sortPackages([later, earlier, duplicate]).map((item) => item.title),
    ).toEqual(["Updated earlier", "Later"]);
  });
});

describe("package validation", () => {
  it("accepts an on-request rate and valid flight/couples starting rates", () => {
    const errors = validatePackageDraft(
      packageDraft({
        price: null,
        flightIncludedPrice: 52000,
        forCouples: true,
        coupleStartingPrice: 52000,
      }),
    );

    expect(errors).toEqual({});
  });

  it("rejects non-positive optional rates", () => {
    const errors = validatePackageDraft(
      packageDraft({ flightIncludedPrice: 0, coupleStartingPrice: 0 }),
    );

    expect(errors).toHaveProperty("flightIncludedPrice");
    expect(errors).toHaveProperty("coupleStartingPrice");
  });
});
