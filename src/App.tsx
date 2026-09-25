import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Mountain,
  MapPin,
  Compass,
  Leaf,
  Heart,
  Clock3,
  Check,
  Instagram,
  MoveUpRight,
  SlidersHorizontal,
  Infinity,
  Phone,
  Mail,
  BedDouble,
  Car,
  Plane,
  MessageCircle,
} from "lucide-react";
import { site, trips, faqs, gallery } from "./data/content";
import type { Destination } from "./types";
import { cx } from "./styles";

import Packages from "./components/Packages";
import usePageMotion from "./hooks/usePageMotion";

function Brand() {
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
          <Infinity className={cx("brand-infinity")} size={23} />
        </span>
        <small>{site.tagline}</small>
      </span>
    </a>
  );
}
function App() {
  usePageMotion();
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All escapes");
  const [destination, setDestination] = useState("Anywhere sounds good");
  const [style, setStyle] = useState("Any kind of escape");
  const [selected, setSelected] = useState<Destination | null>(null);
  const [copied, setCopied] = useState<boolean | "failed">(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = trips.filter(
    (t) =>
      (filter === "All escapes" || t.category === filter) &&
      (destination === "Anywhere sounds good" || t.destination === destination),
  );
  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  const contact = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi TrippyGo! I'd love to plan ${selected ? `the ${selected.destination} escape` : "a trip"}.`)}`
    : site.instagram;
  function explore(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFilter(style === "Any kind of escape" ? "All escapes" : style);
    document.getElementById("escapes")?.scrollIntoView({ behavior: "smooth" });
  }
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
            {[
              ["Packages", "packages"],
              ["Destinations", "escapes"],
              ["Our story", "about"],
            ].map(([text, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {text}
              </a>
            ))}
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
          <Infinity size={26} />
          <span>LET’S TRIP TOGETHER</span>
          <span aria-hidden="true">✳</span>
        </div>
        <div className={cx("container", "search-container")}>
          <form className={cx("trip-search")} onSubmit={explore}>
            <div className={cx("search-intro")}>
              <Compass size={23} />
              <strong>
                Your next
                <br />
                “let’s go” moment.
              </strong>
            </div>
            <label>
              <span>
                <MapPin size={14} /> WHERE TO?
              </span>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option>Anywhere sounds good</option>
                {trips.map((t) => (
                  <option key={t.id}>{t.destination}</option>
                ))}
              </select>
            </label>
            <label>
              <span>
                <Leaf size={14} /> YOUR KIND OF TRIP
              </span>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option>Any kind of escape</option>
                <option>Mountains</option>
                <option>Backwaters</option>
                <option>Beaches</option>
              </select>
            </label>
            <button className={cx("button", "button-green")} type="submit">
              Explore escapes <ArrowRight size={18} />
            </button>
          </form>
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
        <Packages />
        <section id="escapes" className={cx("section", "container")}>
          <div className={cx("section-heading")}>
            <div>
              <span className={cx("eyebrow")}>FOLLOW YOUR CURIOSITY</span>
              <h2>
                Where do you
                <br />
                <em>want to wake up?</em>
              </h2>
            </div>
            <p>
              For the long weekends, the spontaneous plans,
              <br className={cx("desktop-break")} /> and the “we really needed
              this” getaways.
            </p>
          </div>
          <div className={cx("filter-row")}>
            <div className={cx("filters")} aria-label="Filter escapes">
              {["All escapes", "Mountains", "Backwaters", "Beaches"].map(
                (f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    className={cx("filter")}
                    onClick={() => {
                      setFilter(f);
                      setDestination("Anywhere sounds good");
                    }}
                  >
                    {f === "All escapes" && <Compass size={15} />} {f}
                  </button>
                ),
              )}
            </div>
            <span className={cx("trip-count")} aria-live="polite">
              {visible.length} places to disconnect
            </span>
          </div>
          <div className={cx("trip-grid")}>
            {visible.map((t) => (
              <article className={cx("trip-card")} key={t.id}>
                <button
                  className={cx("trip-photo")}
                  onClick={() => setSelected(t)}
                  aria-label={`Explore ${t.destination}`}
                >
                  <img src={t.image} alt={t.alt} loading="lazy" />
                  <span className={cx("photo-tag")}>{t.tag}</span>
                  <span className={cx("poster-destination")}>
                    {t.destination}
                  </span>
                  <span className={cx("photo-location")}>
                    <MapPin size={14} />
                    {t.region}, India
                  </span>
                  <span className={cx("photo-arrow")}>
                    <ArrowUpRight size={21} />
                  </span>
                </button>
                <div className={cx("trip-body")}>
                  <span className={cx("trip-duration")}>
                    <Clock3 size={13} />
                    {t.duration}
                    <span>·</span>
                    {t.category}
                  </span>
                  <h3>
                    <button onClick={() => setSelected(t)}>{t.title}</button>
                  </h3>
                  <p>{t.description}</p>
                  <div className={cx("trip-card-bottom")}>
                    <span>
                      Made for you <small>Get a personalised quote</small>
                    </span>
                    <button
                      aria-label={`View ${t.destination} itinerary`}
                      onClick={() => setSelected(t)}
                    >
                      <ArrowUpRight size={21} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className={cx("empty-state")}>
              <Compass size={32} />
              <h3>A different kind of escape?</h3>
              <p>
                No trip ideas match those filters. Explore all escapes or ask us
                to plan something personal.
              </p>
              <button
                className={cx("button", "button-green")}
                onClick={() => {
                  setFilter("All escapes");
                  setDestination("Anywhere sounds good");
                }}
              >
                Show all escapes <ArrowRight size={17} />
              </button>
            </div>
          )}
          <p className={cx("sample-note")}>
            A little inspiration for your next trip. Itineraries are
            customisable; availability and final pricing are confirmed on
            enquiry.
          </p>
        </section>
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
        <section className={cx("about-section")} id="about">
          <div className={cx("container", "about-grid")}>
            <div className={cx("about-art")}>
              <img
                src="./images/sunset-stay.webp"
                alt="A TrippyGo holiday stay under a golden evening sky"
                loading="lazy"
              />
              <div className={cx("photo-note")}>
                Let’s trip
                <br />
                <em>together!</em>
                <span>↗</span>
              </div>
              <div className={cx("small-stamp")}>
                <Mountain size={24} />
                <span>
                  GO SLOW.
                  <br />
                  FEEL MORE.
                </span>
              </div>
            </div>
            <div className={cx("about-copy")}>
              <span className={cx("eyebrow")}>SMALL TEAM. BIG WANDERLUST.</span>
              <h2>
                Thoughtfully planned.
                <br />
                <em>Entirely yours.</em>
              </h2>
              <p>
                We believe the best trips leave you with stories, not a to-do
                list. TrippyGo is here to bring a little more ease, a little
                more discovery, and a whole lot of heart to your next getaway.
              </p>
              <div className={cx("value-item")}>
                <span>
                  <Compass size={21} />
                </span>
                <div>
                  <h3>Your trip, your rhythm</h3>
                  <p>Early starts or slow mornings? We plan around you.</p>
                </div>
              </div>
              <div className={cx("value-item")}>
                <span>
                  <Leaf size={21} />
                </span>
                <div>
                  <h3>Good places, thoughtfully picked</h3>
                  <p>Nature, local experiences, and room to simply be.</p>
                </div>
              </div>
              <div className={cx("value-item")}>
                <span>
                  <Heart size={21} />
                </span>
                <div>
                  <h3>A real person, a conversation away</h3>
                  <p>Talk to the people helping bring your trip to life.</p>
                </div>
              </div>
              <a href="#contact" className={cx("text-link")}>
                Get to know your next adventure <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section
          className={cx("section", "container", "how-section")}
          id="notes"
        >
          <span className={cx("eyebrow")}>FROM “SOMEDAY” TO “LET’S GO”</span>
          <div className={cx("section-heading")}>
            <h2>
              From a little daydream
              <br />
              <em>to a great escape.</em>
            </h2>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className={cx("text-link")}
            >
              Say hello on Instagram <ArrowUpRight size={18} />
            </a>
          </div>
          <div className={cx("steps")}>
            {[
              [
                "01",
                "Tell us your daydream",
                "A place, a mood, a weekend. Give us a little idea of what you have in mind.",
              ],
              [
                "02",
                "We make it a plan",
                "Together, we’ll work out the places, pace, and little details that feel right.",
              ],
              [
                "03",
                "You make the memories",
                "Once your plan is confirmed, pack your bags. There’s a world waiting outside.",
              ],
            ].map(([n, h, p]) => (
              <div key={n}>
                <span className={cx("step-number")}>{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
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
            <a href="#about">Our story</a>
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
      <dialog
        ref={dialog}
        aria-label={
          selected ? `${selected.destination} trip details` : "Trip details"
        }
        className={cx("trip-dialog")}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
        onClose={() => {
          setSelected(null);
          setCopied(false);
        }}
      >
        {selected && (
          <>
            <button
              className={cx("dialog-close")}
              aria-label="Close itinerary"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>
            <img
              className={cx("dialog-image")}
              src={selected.image}
              alt={selected.alt}
            />
            <div className={cx("dialog-body")}>
              <span className={cx("eyebrow")}>
                {selected.destination} · {selected.duration}
              </span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <div className={cx("highlights")}>
                {selected.highlights.map((h) => (
                  <span key={h}>
                    <Check size={14} />
                    {h}
                  </span>
                ))}
              </div>
              <h3>Your trip could look like this</h3>
              <ol className={cx("itinerary")}>
                {selected.itinerary.map((day, i) => (
                  <li key={day}>
                    <strong>Day {i + 1}</strong>
                    <span>{day}</span>
                  </li>
                ))}
              </ol>
              <p className={cx("sample-note")}>
                Suggested itinerary. Stays, transport, activities, availability,
                and pricing will be confirmed in your personal quote.
              </p>
              <a
                className={cx("button", "button-green")}
                href={contact}
                target="_blank"
                rel="noreferrer"
              >
                Ask us about this escape <ArrowUpRight size={18} />
              </a>
              <button
                className={cx("copy-button")}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `Hi TrippyGo! I’m interested in your ${selected.destination} escape (${selected.duration}). Can you help me plan a trip?`,
                    );
                    setCopied(true);
                  } catch {
                    setCopied("failed");
                  }
                }}
              >
                {copied === true
                  ? "Copied! Paste it into your message."
                  : copied === "failed"
                    ? "Copy unavailable — mention this destination in your message."
                    : "Copy a trip enquiry to send"}{" "}
              </button>
              <span className={cx("sr-only")} role="status">
                {copied === true ? "Trip enquiry copied" : ""}
              </span>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
export default App;
