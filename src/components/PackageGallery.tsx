import { packages as builtPackages, sortPackages } from "../data/packages";
import Packages from "./Packages";

const PackageGallery = () => <Packages items={sortPackages(builtPackages)} />;

export default PackageGallery;
