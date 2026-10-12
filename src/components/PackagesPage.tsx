import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Instagram,
  MoveUpRight,
  Infinity as InfinityIcon,
} from "lucide-react";
import { packages, sortPackages } from "../data/packages";
import { site } from "../data/content";
import { cx } from "../styles";
import Packages from "./Packages";

const Brand = () => {
  return (
    <Link className={cx("brand")} to="/" aria-label="TrippyGo home">
      <img
        className={cx("brand-logo")}
        src={site.logo}
        alt=""
        width="46"
        height="46"
      />
      <span className={cx("brand-words")}>
        <span>
          TrippyGo
          <InfinityIcon className={cx("brand-infinity")} size={23} />
        </span>
        <small>{site.tagline}</small>
      </span>
    </Link>
  );
};

const PackagesPage = () => {
  const contact = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi TrippyGo! I'd love to plan a trip.")}`
    : site.instagram;

  return (
    <>
      <a className={cx("skip-link")} href="#main">
        Skip to content
      </a>
      <header className={cx("header")} id="home">
        <div className={cx("container", "nav-wrap")}>
          <Brand />
          <nav className={cx("navigation")} aria-label="Main navigation">
            <Link
              to="/"
              className="text-base font-semibold transition-colors hover:text-[#a27113]"
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-base font-semibold transition-colors hover:text-[#a27113]"
            >
              All packages
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#c6cca0] bg-[#fffefa] px-3 py-2 text-xs font-semibold text-[#536142] transition-colors hover:border-forest hover:bg-forest hover:text-cream"
              aria-label="Back to home page"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <a
              className={cx("button", "button-green", "nav-cta")}
              href={contact}
              target="_blank"
              rel="noreferrer"
            >
              Let’s plan a trip <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </header>
      <main id="main">
        <Packages items={sortPackages(packages)} isInnerPage={true} />
      </main>
      <footer className={cx("container", "footer")}>
        <div className={cx("footer-top")}>
          <div>
            <Brand />
            <p>Where every trip feels special.</p>
          </div>
          <div className={cx("footer-links")}>
            <Link to="/">Home</Link>
            <Link to="/packages">Our packages</Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="TrippyGo on Instagram"
            >
              <Instagram size={19} />
            </a>
            <a href="#home" aria-label="Back to top">
              <MoveUpRight size={22} />
            </a>
          </div>
        </div>
        <div className={cx("footer-bottom")}>
          <span>
            © {new Date().getFullYear()} TrippyGo. Made for the memories.
          </span>
          <span>
            With a little love & a lot of wanderlust <Heart size={12} />
          </span>
        </div>
      </footer>
    </>
  );
};

export default PackagesPage;
