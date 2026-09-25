import type { TourPackage } from "../types";

const packageModules = import.meta.glob("../../data/packages/*.json", {
  eager: true,
}) as Record<string, { default: TourPackage }>;

export const packages: TourPackage[] = Object.values(packageModules)
  .map((module) => module.default)
  .filter(Boolean);
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
