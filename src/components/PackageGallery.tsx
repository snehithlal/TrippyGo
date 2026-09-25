import { useEffect, useState } from "react";
import { getPackages } from "../services/packageRepository";
import type { TourPackage } from "../types";
import Packages from "./Packages";

const PackageGallery = () => {
  const [items, setItems] = useState<TourPackage[]>([]);

  useEffect(() => {
    void getPackages().then(setItems);
  }, []);

  return <Packages items={items} />;
};

export default PackageGallery;
