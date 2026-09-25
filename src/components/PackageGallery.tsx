import { packages, sortPackages } from "../data/packages";
import Packages from "./Packages";

const PackageGallery = () => <Packages items={sortPackages(packages)} />;

export default PackageGallery;
