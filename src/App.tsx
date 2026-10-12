import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Compass,
  Leaf,
  Heart,
  Instagram,
  MoveUpRight,
  SlidersHorizontal,
  Infinity as InfinityIcon,
  Phone,
  Mail,
  BedDouble,
  Car,
  Plane,
  MessageCircle,
} from "lucide-react";
import { site, faqs, gallery } from "./data/content";
import { cx } from "./styles";
import { Route, Routes, useLocation } from "react-router-dom";
import PackageGallery from "./components/PackageGallery";
import PackagesPage from "./components/PackagesPage";
import AdminApp from "./admin/AdminApp";
import usePageMotion from "./hooks/usePageMotion";

const Brand = () => {
  return (
    <a className={cx("brand")} href="#home" aria-label="TrippyGo home">
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
    </a>
  );
};
const LandingPage = () => {
  usePageMotion();
  const [menu, setMenu] = useState(false);
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
            <a
              href="#packages"
              className="text-base font-semibold text-[#e8e0cc] transition-colors hover:text-gold md:text-base"
              onClick={() => setMenu(false)}
            >
              Packages
            </a>
          </nav>
          <a
            className={cx("button", "button-green", "nav-cta")}
            href="#contact"
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
      </header>
      <main id="main">
        <section className={cx("hero")} aria-labelledby="hero-title">
          <div className={cx("container", "hero-layout")}>
            <div className={cx("hero-copy")}>
              <div className={cx("hero-label")}>
                <span /> WHERE EVERY TRIP FEELS SPECIAL
              </div>
              <h1 id="hero-title">
                <span className={cx("handwritten")}>A little further.</span>
                <span className={cx("dream-title")}>
                  A little more
                  <br />
                  <em>alive.</em>
                </span>
              </h1>
              <p>
                Wake up somewhere wonderful. Thoughtfully planned trips,
                beautiful stays, and all the little moments in between.
              </p>
              <div className={cx("hero-actions")}>
                <a className={cx("button", "button-yellow")} href="#packages">
                  Explore our packages <ArrowUpRight size={19} />
                </a>
                <a
                  className={cx("hero-chat")}
                  href={contact}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Let’s talk travel
                </a>
              </div>
              <div className={cx("hero-footnote")}>
                <span className={cx("route-doodle")} aria-hidden="true">
                  ↝
                </span>
                <span>
                  Couples · Families · Your favourite people
                  <br />
                  <strong>You bring the dreams. We’ll bring the plan.</strong>
                </span>
              </div>
            </div>
            <div className={cx("hero-collage")}>
              <div className={cx("travel-stamp")}>
                <span>PACK YOUR</span>
                <Compass size={32} strokeWidth={1.2} />
                <span>DREAMS</span>
              </div>
              <figure className={cx("hero-polaroid", "main-polaroid")}>
                <img
                  src={site.heroImage}
                  alt="A warmly lit treehouse tucked into a green forest, from TrippyGo’s Instagram"
                  loading="eager"
                />
                <figcaption>
                  A little out of the ordinary. <Heart size={17} />
                </figcaption>
              </figure>
              <figure className={cx("hero-polaroid", "small-polaroid")}>
                <img
                  src="./images/woodland-stay.webp"
                  alt="A-frame woodland stay featured by TrippyGo"
                  loading="eager"
                />
                <figcaption>Nature. Peace. Memories.</figcaption>
              </figure>
              <span className={cx("collage-note")}>
                Your next story
                <br />
                starts here <span aria-hidden="true">↗</span>
              </span>
            </div>
          </div>
        </section>
        <div className={cx("adventure-strip")} aria-label="Travel experiences">
          <span>GOOD PEOPLE</span>
          <span aria-hidden="true">✳</span>
          <span>GREAT PLACES</span>
          <span aria-hidden="true">✳</span>
          <span>MEMORIES FOREVER</span>
          <InfinityIcon size={26} />
          <span>LET’S TRIP TOGETHER</span>
          <span aria-hidden="true">✳</span>
        </div>

        <div className={cx("container", "promise-strip")}>
          <span>
            <Leaf /> A little closer to nature
          </span>
          <span>
            <SlidersHorizontal /> Personalised to your pace
          </span>
          <span>
            <Heart /> Planned with a personal touch
          </span>
        </div>
        <PackageGallery />
        <section
          className={cx("services-section", "container")}
          aria-labelledby="services-title"
        >
          <div>
            <span className={cx("eyebrow")}>THE WHOLE TRIP, SORTED</span>
            <h2 id="services-title">
              More than <em>a getaway.</em>
            </h2>
          </div>
          <div className={cx("service-grid")}>
            {(
              [
                [Compass, "Custom packages", "Couple, family & group trips"],
                [BedDouble, "Stays & resorts", "Find your kind of hideaway"],
                [Car, "Cab services", "Make the journey part of the trip"],
                [
                  Plane,
                  "International tours",
                  "Take your dreams a little further",
                ],
              ] as const
            ).map(([Icon, title, description]) => (
              <a href={contact} key={title} target="_blank" rel="noreferrer">
                <Icon size={25} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowUpRight className={cx("service-arrow")} size={17} />
              </a>
            ))}
          </div>
        </section>

        <section className={cx("instagram-section")}>
          <div className={cx("container")}>
            <div className={cx("section-heading")}>
              <div>
                <span className={cx("eyebrow")}>
                  POSTCARDS FROM OUR CORNER OF THE WORLD
                </span>
                <h2>
                  Moments worth
                  <br />
                  <em>going somewhere for.</em>
                </h2>
              </div>
              <a
                href={site.instagram}
                className={cx("text-link")}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} />
                {site.handle}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className={cx("social-gallery")}>
              {gallery.map((item) => (
                <a
                  key={item.image}
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={cx("social-card")}
                >
                  <div className={cx("social-image")}>
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <Instagram size={19} />
                  </div>
                  <div className={cx("social-caption")}>
                    <span>{item.type}</span>
                    <h3>{item.label}</h3>
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className={cx("section", "container", "faq-section")}>
          <div>
            <span className={cx("eyebrow")}>BEFORE YOU PACK</span>
            <h2>
              Before you go.
              <br />
              <em>The little details.</em>
            </h2>
          </div>
          <div className={cx("faqs")}>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span className={cx("faq-plus")}>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={cx("contact-section", "container")} id="contact">
          <div className={cx("contact-panel")}>
            <div className={cx("contact-decoration")} aria-hidden="true">
              <Compass size={280} strokeWidth={0.5} />
            </div>
            <span className={cx("eyebrow")}>
              YOUR OUT-OF-OFFICE ERA STARTS HERE
            </span>
            <h2>
              Your next chapter
              <br />
              <em>starts somewhere new.</em>
            </h2>
            <p>
              Tell us where your mind wanders.
              <br />
              We’ll help you find your way there.
            </p>
            <a
              className={cx("button", "button-cream")}
              href={contact}
              target="_blank"
              rel="noreferrer"
            >
              Chat with us on WhatsApp <MessageCircle size={19} />
            </a>
            <div className={cx("contact-details")}>
              {site.phones.map((phone) => (
                <a key={phone.value} href={`tel:${phone.value}`}>
                  <Phone size={14} />
                  {phone.label}
                </a>
              ))}
              <a href={`mailto:${site.email}`}>
                <Mail size={14} />
                {site.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className={cx("container", "footer")}>
        <div className={cx("footer-top")}>
          <div>
            <Brand />
            <p>Where every trip feels special.</p>
          </div>
          <div className={cx("footer-links")}>
            <a href="#packages">Our packages</a>
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

const configuredAdminRoute = import.meta.env.VITE_ADMIN_ROUTE?.trim().replace(
  /^\/+|\/+$/g,
  "",
);
const adminRoute = configuredAdminRoute
  ? `/${configuredAdminRoute}`
  : undefined;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};

export const BackgroundCanvas = () => (
  <div
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <img
      src="/images/hero-bg.jpg"
      alt=""
      className="h-full w-full object-cover object-[center_30%]"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#08120b]/75 via-[#08120b]/60 via-[35%] to-[#060e08]/95" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_20%,_#060e08_90%)] opacity-70" />
  </div>
);

const App = () => (
  <>
    <BackgroundCanvas />
    <ScrollToTop />
    <Routes>
      {adminRoute && <Route path={adminRoute} element={<AdminApp />} />}
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/packages/:categorySlug" element={<PackagesPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  </>
);

export default App;
