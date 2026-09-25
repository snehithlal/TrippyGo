import kerala from "../../data/packages/kerala-slow-trail.json";
import wayanad from "../../data/packages/wayanad-weekend.json";
import goa from "../../data/packages/goa-coast.json";
import manali from "../../data/packages/manali-mountains.json";
import rajasthan from "../../data/packages/rajasthan-royal-route.json";
import northeast from "../../data/packages/northeast-green-escape.json";
import type { TourPackage } from "../types";

export const packages: TourPackage[] = [
  kerala,
  wayanad,
  goa,
  manali,
  rajasthan,
  northeast,
];
export const sortPackages = (items: TourPackage[]) =>
  items
    .map((item, index) => ({ item, index }))
    .sort(
      (left, right) =>
        (left.item.displayOrder ?? Number.MAX_SAFE_INTEGER) -
          (right.item.displayOrder ?? Number.MAX_SAFE_INTEGER) ||
        left.index - right.index,
    )
    .map(({ item }) => item);
export const packageCategories = [
  "All trips",
  ...new Set(packages.map((item) => item.category)),
];
export const formatPrice = (value: number | null) =>
  value == null
    ? "On request"
    : `₹${new Intl.NumberFormat("en-IN").format(value)}`;
