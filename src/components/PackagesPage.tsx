import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Instagram,
  Menu,
  MoveUpRight,
  X,
  Infinity as InfinityIcon,
} from "lucide-react";
import { packages, sortPackages } from "../data/packages";
import { site } from "../data/content";
import { cx } from "../styles";
import Packages from "./Packages";
import usePageMotion from "../hooks/usePageMotion";

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
  usePageMotion();
  const [menu, setMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const currentCat = searchParams.get("category") || categorySlug;
  const categoryHeading =
    currentCat && currentCat.toLowerCase() !== "all trips"
      ? decodeURIComponent(currentCat).replace(/-/g, " ")
      : null;

  const displayCategory = categoryHeading
    ? categoryHeading.charAt(0).toUpperCase() + categoryHeading.slice(1)
    : null;

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
          <nav
            id="navigation"
            className={cx("navigation", menu && "is-open")}
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-base font-semibold text-[#e8e0cc] transition-colors hover:text-gold"
              onClick={() => setMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-base font-semibold text-gold transition-colors"
              onClick={() => setMenu(false)}
            >
              Packages
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#e8e0cc] backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-forest"
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
            <button
              className={cx("menu-button")}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className={cx("hero")} aria-labelledby="packages-hero-title">
          <div className={cx("container", "packages-hero-layout")}>
            <div className="max-w-2xl animate-hero-arrive">
              <div className={cx("hero-label")}>
                <span /> WHERE EVERY TRIP FEELS SPECIAL
              </div>
              <h1 id="packages-hero-title" className="mt-2">
                <span className={cx("handwritten")}>Handpicked journeys.</span>
                <span className={cx("dream-title")}>
                  {displayCategory ? (
                    <>
                      {displayCategory}
                      <br />
                      <em>itineraries.</em>
                    </>
                  ) : (
                    <>
                      All curated
                      <br />
                      <em>packages.</em>
                    </>
                  )}
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-[13px] leading-[1.95] text-[#c5ccb9] md:text-sm">
                Wake up somewhere wonderful. Thoughtfully planned trips,
                beautiful stays, and all the little moments in between. Pick
                your favorite or let us customize one just for you.
              </p>
            </div>
          </div>
        </section>
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
