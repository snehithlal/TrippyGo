import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Plane,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { formatPrice } from "../data/packages";
import { site } from "../data/content";
import type { TourPackage } from "../types";
import { cx } from "../styles";

const Packages = ({
  items,
  isInnerPage = false,
}: {
  items: TourPackage[];
  isInnerPage?: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const packageCategories = useMemo(() => {
    const filterNames = new Map<string, string>();
    [
      ...items.map((item) => item.category),
      ...items.flatMap((item) => item.tags ?? []),
    ]
      .map((name) => name.trim())
      .filter(
        (name) =>
          name &&
          !["india", "international", "couples"].includes(
            name.toLocaleLowerCase(),
          ),
      )
      .forEach((name) => {
        const normalized = name.toLocaleLowerCase();
        if (!filterNames.has(normalized)) filterNames.set(normalized, name);
      });
    return [
      "All trips",
      "India",
      "International",
      ...filterNames.values(),
      "Couples",
    ];
  }, [items]);

  const [category, setCategory] = useState(() => {
    if (!isInnerPage) return "All trips";
    const param = searchParams.get("category") || categorySlug;
    if (!param) return "All trips";
    const normalized = decodeURIComponent(param)
      .toLowerCase()
      .replace(/-/g, " ");
    return (
      packageCategories.find((cat) => cat.toLowerCase() === normalized) ??
      "All trips"
    );
  });
  const [selected, setSelected] = useState<TourPackage | null>(null);
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [customise, setCustomise] = useState(false);
  const [requests, setRequests] = useState("");
  const [flightOptions, setFlightOptions] = useState<Record<string, boolean>>(
    {},
  );
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isInnerPage) return;
    const param = searchParams.get("category") || categorySlug;
    if (!param) {
      setCategory("All trips");
      return;
    }
    const normalized = decodeURIComponent(param)
      .toLowerCase()
      .replace(/-/g, " ");
    const matched =
      packageCategories.find((cat) => cat.toLowerCase() === normalized) ??
      "All trips";
    setCategory(matched);
  }, [searchParams, categorySlug, isInnerPage, packageCategories]);

  const handleCategorySelect = (item: string) => {
    setCategory(item);
    if (isInnerPage) {
      if (item === "All trips") {
        setSearchParams({});
      } else {
        setSearchParams({ category: item });
      }
    }
  };

  const getFilterCount = (filterName: string) => {
    const norm = filterName.toLowerCase();
    return items.filter(
      (item) =>
        filterName === "All trips" ||
        (filterName === "India" && (item.region ?? "India") === "India") ||
        (filterName === "International" && item.region === "International") ||
        (filterName === "Couples" && item.forCouples === true) ||
        (!["all trips", "india", "international", "couples"].includes(norm) &&
          (item.category.toLowerCase() === norm ||
            item.tags?.some((t) => t.toLowerCase() === norm))),
    ).length;
  };

  const getCategoryPhoto = (filterName: string, fallback: string) => {
    const norm = filterName.toLowerCase();
    const match = items.find(
      (item) =>
        (filterName === "India" && (item.region ?? "India") === "India") ||
        (filterName === "International" && item.region === "International") ||
        (filterName === "Couples" && item.forCouples === true) ||
        item.category.toLowerCase() === norm ||
        item.tags?.some((t) => t.toLowerCase() === norm),
    );
    return match?.image || fallback;
  };

  const mobileCategories = [
    {
      name: "Nature",
      count: getFilterCount("Nature"),
      image: getCategoryPhoto(
        "Nature",
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "Beach",
      count: getFilterCount("Beach"),
      image: getCategoryPhoto(
        "Beach",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "India",
      count: getFilterCount("India"),
      image: getCategoryPhoto(
        "India",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "International",
      count: getFilterCount("International"),
      image: getCategoryPhoto(
        "International",
        "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "Couples",
      count: getFilterCount("Couples"),
      image: getCategoryPhoto(
        "Couples",
        "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "Adventure",
      count: getFilterCount("Adventure"),
      image: getCategoryPhoto(
        "Adventure",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "Culture",
      count: getFilterCount("Culture"),
      image: getCategoryPhoto(
        "Culture",
        "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=800&q=80",
      ),
    },
    {
      name: "City",
      count: getFilterCount("City"),
      image: getCategoryPhoto(
        "City",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      ),
    },
  ].filter((c) => c.count > 0);

  const selectedFilter = category.toLocaleLowerCase();
  const isSystemFilter = [
    "all trips",
    "india",
    "international",
    "couples",
  ].includes(selectedFilter);
  const visible = items.filter(
    (item) =>
      category === "All trips" ||
      (category === "India" && (item.region ?? "India") === "India") ||
      (category === "International" && item.region === "International") ||
      (category === "Couples" && item.forCouples === true) ||
      (!isSystemFilter &&
        (item.category.toLocaleLowerCase() === selectedFilter ||
          item.tags?.some(
            (tag) => tag.toLocaleLowerCase() === selectedFilter,
          ))),
  );
  const flightIncluded = (item: TourPackage) => flightOptions[item.id] ?? false;
  const displayedRate = (item: TourPackage) =>
    category === "Couples"
      ? (item.coupleStartingPrice ?? null)
      : flightIncluded(item)
        ? (item.flightIncludedPrice ?? item.price)
        : item.price;
  const rateUnit = category === "Couples" ? "couple" : "person";
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const close = () => {
    dialog.current?.close();
    setSelected(null);
    setDate("");
    setTravellers("2");
    setCustomise(false);
    setRequests("");
  };

  const enquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const message = `Hi TrippyGo! I'm interested in "${selected.title}" (${selected.days} days / ${selected.nights} nights).\nTravellers: ${travellers}\nPreferred departure: ${date || "Flexible"}\nPackage price: ${formatPrice(displayedRate(selected))} per ${rateUnit}${selected.flightIncludedPrice != null ? `\nFlights: ${flightIncluded(selected) ? "Included" : "Not included"}` : ""}\nPlan: ${customise ? "Customised package" : "Standard package"}${customise ? `\nRequested changes: ${requests || "Please help me personalise this trip."}` : ""}\n${customise ? "Please share the revised itinerary and price for these changes." : "Please confirm availability and booking details for the standard package."}`;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="packages" className={cx("packages-section")}>
      <div className={cx("container")}>
        {isInnerPage && (
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/#packages"
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd1c0] bg-[#fffefa] px-4 py-2 text-xs font-semibold text-[#546244] transition-colors hover:border-forest hover:bg-forest hover:text-cream"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <span className="text-xs text-[#727d65]">
              Showing <strong>{visible.length}</strong> {category} packages
            </span>
          </div>
        )}
        <div className={cx("section-heading")} data-reveal>
          <div>
            <span className={cx("eyebrow")}>
              {isInnerPage
                ? "CURATED ITINERARIES"
                : "GOOD THINGS COME IN PACKAGES"}
            </span>
            <h2>
              {isInnerPage ? (
                category === "All trips" ? (
                  <>
                    All Curated
                    <br />
                    <em>trip packages.</em>
                  </>
                ) : (
                  <>
                    {category}
                    <br />
                    <em>escapes & itineraries.</em>
                  </>
                )
              ) : (
                <>
                  A few days away.
                  <br />
                  <em>A whole new feeling.</em>
                </>
              )}
            </h2>
          </div>
          <p>
            Thoughtful routes, lovely stays, and room for you.
            <br />
            Pick a package, or customise one to suit you.
          </p>
        </div>

        {!isInnerPage && (
          <div className="mb-8 block md:hidden">
            <Link
              to="/packages"
              className="group mb-5 flex items-center justify-between rounded-2xl bg-gold px-6 py-4.5 text-forest shadow-[0_4px_16px_#bd881622] transition-transform active:scale-[0.98]"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#694f17]">
                  Complete Collection
                </span>
                <span className="text-lg font-bold text-forest">
                  Explore our packages
                </span>
              </div>
              <span className="grid size-9 place-items-center rounded-full bg-forest text-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={19} />
              </span>
            </Link>

            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[1.4px] text-[#677252]">
                Explore by category
              </span>
              <span className="text-xs font-medium text-[#717b62]">
                {mobileCategories.length} categories
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-2">
              {mobileCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/packages?category=${encodeURIComponent(cat.name)}`}
                  className="group relative flex h-[148px] flex-col justify-end overflow-hidden rounded-2xl border border-[#d6d4c5] bg-[#1a2d1f] p-3.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102014f2] via-[#10201460] to-transparent" />
                  <span className="absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={13} />
                  </span>
                  <div className="relative z-10 text-left">
                    <span className="font-display block text-[21px] font-normal leading-tight text-[#fffbf2]">
                      {cat.name}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-[#dce5cb]">
                      {cat.count} {cat.count === 1 ? "trip" : "trips"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div
          className={`${cx("package-toolbar")} ${!isInnerPage ? "hidden md:flex" : "flex"}`}
        >
          <div
            className={`${cx("filters")} ${isInnerPage ? "max-md:w-full max-md:flex-nowrap max-md:overflow-x-auto max-md:pb-1" : ""}`}
            aria-label="Filter packages"
          >
            {packageCategories.map((item) => (
              <button
                key={item}
                className={`${cx("filter")} ${isInnerPage ? "shrink-0 whitespace-nowrap" : ""}`}
                aria-pressed={category === item}
                onClick={() => handleCategorySelect(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className={cx("package-count")} aria-live="polite">
            <SlidersHorizontal size={14} />
            {visible.length} curated trip ideas
          </span>
        </div>
        <div
          className={`${cx("packages-grid")} ${!isInnerPage ? "hidden md:grid" : "grid"}`}
        >
          {visible.map((item, index) => (
            <article
              className={cx("package-card")}
              key={item.id}
              style={{ animationDelay: `${index * 65}ms` }}
            >
              <button
                className={cx("package-cover")}
                onClick={() => setSelected(item)}
                aria-label={`View ${item.title} package`}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className={cx("package-badge")}>{item.badge}</span>
                <span className={cx("package-place")}>
                  <MapPin size={14} />
                  {item.destination}
                </span>
                <span className={cx("package-cover-arrow")}>
                  <ArrowUpRight size={20} />
                </span>
              </button>
              <div className={cx("package-content")}>
                <div className={cx("package-meta")}>
                  <span>
                    <Clock3 size={13} />
                    {item.days} days / {item.nights} nights
                  </span>
                  <span>{item.category}</span>
                </div>
                <h3>
                  <button onClick={() => setSelected(item)}>
                    {item.title}
                  </button>
                </h3>
                <p className={cx("package-route")}>{item.route}</p>
                <p className={cx("package-description")}>{item.description}</p>
                <div className={cx("package-features")}>
                  {item.features.map((feature) => (
                    <span key={feature}>
                      <Check size={12} />
                      {feature}
                    </span>
                  ))}
                </div>
                <div className={cx("package-price-row")}>
                  <div>
                    {category !== "Couples" &&
                      item.flightIncludedPrice != null && (
                        <div
                          className={cx("package-flight-options")}
                          role="group"
                          aria-label={`${item.title} flight option`}
                        >
                          <button
                            type="button"
                            className={cx("package-flight-option")}
                            aria-pressed={!flightIncluded(item)}
                            onClick={() =>
                              setFlightOptions((current) => ({
                                ...current,
                                [item.id]: false,
                              }))
                            }
                          >
                            Land only
                          </button>
                          <button
                            type="button"
                            className={cx("package-flight-option")}
                            aria-pressed={flightIncluded(item)}
                            onClick={() =>
                              setFlightOptions((current) => ({
                                ...current,
                                [item.id]: true,
                              }))
                            }
                          >
                            <Plane size={12} /> Included
                          </button>
                        </div>
                      )}
                    <small>
                      {item.flightIncludedPrice != null &&
                      category !== "Couples"
                        ? flightIncluded(item)
                          ? "FLIGHTS INCLUDED · PER PERSON"
                          : "LAND ONLY · PER PERSON"
                        : category === "Couples"
                          ? "COUPLE OFFER · TOTAL FOR TWO"
                          : category === "International"
                            ? "RATES START FROM · PER PERSON"
                            : "STANDARD PACKAGE · PER PERSON"}
                    </small>
                    <strong className="currency-amount">
                      {formatPrice(displayedRate(item))}
                    </strong>
                    {(category === "Couples" || category === "International") &&
                      item.rateNote && <small>{item.rateNote}</small>}
                  </div>
                  <button
                    className={cx("package-detail-button")}
                    onClick={() => setSelected(item)}
                  >
                    View trip <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={cx("custom-package")} data-reveal>
          <div>
            <span className={cx("custom-package-icon")}>
              <SlidersHorizontal size={23} />
            </span>
            <div>
              <h3>Have a different trip in mind?</h3>
              <p>
                Change the stays, duration, or experiences. We’ll price your
                custom plan separately.
              </p>
            </div>
          </div>
          <a href="#contact" className={cx("text-link")}>
            Customise a package <ArrowRight size={17} />
          </a>
        </div>
        <p className={cx("sample-note")}>
          Starting rates are per person unless a Couples offer is shown. Trips
          marked “On request” are quoted based on dates and availability.
        </p>
      </div>
      <dialog
        className={cx("package-dialog")}
        ref={dialog}
        aria-labelledby="package-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        {selected && (
          <>
            <button
              className={cx("dialog-close")}
              onClick={close}
              aria-label="Close package details"
            >
              <X size={21} />
            </button>
            <div className={cx("package-dialog-cover")}>
              <img src={selected.image} alt={selected.alt} />
              <span>
                {selected.destination} / {selected.days} days
              </span>
            </div>
            <div className={cx("package-dialog-body")}>
              <span className={cx("eyebrow")}>A TRIP TO MAKE YOUR OWN</span>
              <h2 id="package-dialog-title">{selected.title}</h2>
              <p className={cx("package-dialog-intro")}>
                {selected.fullDescription || selected.description}
              </p>
              <div className={cx("package-dialog-facts")}>
                <span>
                  <Clock3 size={15} />
                  {selected.days} days · {selected.nights} nights
                </span>
                <span>
                  <MapPin size={15} />
                  {selected.destination}
                </span>
                <strong className="currency-amount">
                  {formatPrice(displayedRate(selected))}{" "}
                  <small>/ {rateUnit}</small>
                </strong>
              </div>
              <h3>Your days, beautifully unhurried</h3>
              <ol className={cx("package-timeline")}>
                {selected.itinerary.map((day, index) => (
                  <li key={day.title}>
                    <span className={cx("timeline-day")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4>{day.title}</h4>
                      <p>{day.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={cx("package-inclusions")}>
                <h3>A clear price. Room to make it yours.</h3>
                <p>
                  The displayed amount is a starting rate for the selected
                  listing. Couple offers show a total for two travellers; other
                  rates are per person. Prefer a different stay, more days, or
                  extra experiences? Choose customisation below for a revised
                  itinerary and price. We’ll confirm inclusions, occupancy,
                  travel dates, taxes, and additional charges before booking.
                  Flights and optional activities are not assumed to be
                  included.
                </p>
              </div>
              <form className={cx("package-enquiry")} onSubmit={enquiry}>
                <h3>Make this your next trip</h3>
                <p>No payment here. Just a conversation about your plans.</p>
                <div className={cx("enquiry-fields")}>
                  <label>
                    Preferred departure <span>(optional)</span>
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                  <label>
                    Travellers
                    <select
                      value={travellers}
                      onChange={(event) => setTravellers(event.target.value)}
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
                        (value) => (
                          <option key={value}>{value}</option>
                        ),
                      )}
                    </select>
                  </label>
                </div>
                <label className={cx("customise-toggle")}>
                  <input
                    type="checkbox"
                    checked={customise}
                    onChange={(event) => setCustomise(event.target.checked)}
                  />
                  <span>
                    <strong>I’d like to customise this package</strong>
                    <small>
                      Changes to the standard plan are priced separately.
                    </small>
                  </span>
                </label>
                {customise && (
                  <label className={cx("customise-request")}>
                    What would you like to change?
                    <textarea
                      value={requests}
                      onChange={(event) => setRequests(event.target.value)}
                      maxLength={1000}
                      rows={3}
                      placeholder="A different stay, an extra night, particular activities…"
                    />
                  </label>
                )}
                <button className={cx("button", "button-green")} type="submit">
                  {customise
                    ? "Discuss my custom trip"
                    : "Enquire about this package"}{" "}
                  <MessageCircle size={18} />
                </button>
                <small>
                  Opens WhatsApp with your trip details. Send when you’re ready.
                </small>
              </form>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
};

export default Packages;
