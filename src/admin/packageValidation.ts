import type { TourPackage } from "../types";

export type PackageValidationErrors = Record<string, string>;

const supportedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const hasText = (value: string, minimum: number, maximum: number) =>
  value.trim().length >= minimum && value.trim().length <= maximum;

export const validatePackageDraft = (
  item: TourPackage,
  image?: File,
): PackageValidationErrors => {
  const errors: PackageValidationErrors = {};
  const add = (field: string, message: string) => {
    errors[field] = message;
  };

  if (!hasText(item.title, 3, 100))
    add("title", "Use a package name between 3 and 100 characters.");
  if (!hasText(item.destination, 2, 100))
    add("destination", "Use a location between 2 and 100 characters.");
  if (!hasText(item.category, 2, 40))
    add("category", "Use a category between 2 and 40 characters.");
  if (!hasText(item.badge, 2, 80))
    add("badge", "Add a short card badge between 2 and 80 characters.");
  if (!hasText(item.route, 3, 180))
    add("route", "Add a route between 3 and 180 characters.");
  if (!hasText(item.alt, 8, 180))
    add("alt", "Describe the cover image in 8 to 180 characters.");
  if (!hasText(item.description, 20, 240))
    add(
      "description",
      "Use a short description between 20 and 240 characters.",
    );
  if (item.fullDescription && item.fullDescription.trim().length > 2000)
    add(
      "fullDescription",
      "Keep the full description within 2,000 characters.",
    );

  if (!Number.isInteger(item.price) || item.price <= 0)
    add("price", "Enter a whole-number price greater than zero.");
  if (!Number.isInteger(item.days) || item.days < 1 || item.days > 60)
    add("days", "Use between 1 and 60 days.");
  if (
    !Number.isInteger(item.nights) ||
    item.nights < 0 ||
    item.nights >= item.days
  )
    add(
      "nights",
      "Nights must be zero or more and fewer than the number of days.",
    );
  const displayOrder = item.displayOrder;
  if (
    !Number.isInteger(displayOrder) ||
    displayOrder === undefined ||
    displayOrder < 1 ||
    displayOrder > 9999
  )
    add("displayOrder", "Use a listing priority from 1 to 9999.");

  if (item.features.length === 0 || item.features.length > 6)
    add("features", "Add between 1 and 6 highlights.");
  else if (item.features.some((feature) => !hasText(feature, 2, 80)))
    add("features", "Each highlight must contain 2 to 80 characters.");

  if (item.itinerary.length !== item.days)
    add("itinerary", "Add one complete itinerary day for every package day.");
  else if (
    item.itinerary.some(
      (day) => !hasText(day.title, 3, 100) || !hasText(day.text, 10, 500),
    )
  )
    add(
      "itinerary",
      "Each itinerary day needs a 3 to 100 character title and 10 to 500 character description.",
    );

  if (!image && !item.image.trim()) add("image", "Choose a cover image.");
  if (image && !supportedImageTypes.includes(image.type))
    add("image", "Use a JPEG, PNG, or WebP image.");
  if (image && image.size > 3 * 1024 * 1024)
    add("image", "Images must be 3 MB or smaller.");

  return errors;
};
