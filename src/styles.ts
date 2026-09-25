/** Shared Tailwind utility presets. Literal classes keep production scanning reliable. */
export const styles = {
  container:
    "mx-auto w-[calc(100%-40px)] max-w-[1200px] md:w-[calc(100%-96px)]",
  section: "py-14 md:py-[85px]",
  button:
    "inline-flex items-center justify-center gap-4 rounded-lg border border-transparent px-5 py-4 text-xs font-bold transition duration-200 hover:-translate-y-0.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5 md:gap-5 md:px-6",
  "button-green": "bg-forest text-cream hover:bg-[#405335]",
  "button-yellow": "bg-gold text-forest hover:bg-[#f1cb8c]",
  "button-cream": "bg-gold text-forest hover:bg-[#f1cb8c]",
  eyebrow:
    "mb-4 block text-[9px] font-bold tracking-[1.3px] text-[#677252] md:text-[10px] md:tracking-[1.8px]",
  "text-link":
    "inline-flex items-center gap-4 border-b border-[#8f997b] pb-2 text-xs font-semibold [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5 md:text-[13px]",
  "skip-link": "fixed -top-24 left-5 z-50 bg-white p-4 focus:top-2.5",
  header:
    "sticky top-0 z-20 border-b border-[#e0e4d8]/70 bg-cream/95 backdrop-blur-xl",
  "nav-wrap":
    "flex h-[73px] items-center justify-between gap-3 md:h-[83px] md:gap-6",
  brand: "inline-flex items-center gap-2 md:gap-2.5",
  "brand-logo": "h-[37px] w-[37px] rounded-full md:h-[46px] md:w-[46px]",
  "brand-words":
    "[&>span]:flex [&>span]:items-center [&>span]:gap-0.5 [&>span]:text-[21px] [&>span]:font-bold [&>span]:leading-tight [&>span]:tracking-[-1px] md:[&>span]:text-[25px] [&>small]:mt-1 [&>small]:block [&>small]:text-[7px] [&>small]:tracking-[.7px] md:[&>small]:text-[9px] md:[&>small]:tracking-[1px]",
  "brand-infinity": "w-5 -rotate-[18deg] text-[#bd8816] md:w-[23px]",
  navigation:
    "absolute left-5 right-5 top-[68px] hidden flex-col gap-6 rounded-md border border-line bg-[#fff9ec] p-6 text-sm shadow-lg md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0 md:text-xs md:shadow-none [&_a:hover]:text-[#a27113]",
  "is-open": "max-md:!flex",
  "nav-cta":
    "ml-auto !gap-1.5 !px-3 !py-2.5 !text-[9px] max-[370px]:hidden md:ml-0 md:!gap-4 md:!px-4 md:!py-3 md:!text-xs max-md:[&_svg]:w-3.5",
  "menu-button":
    "grid h-[38px] w-[30px] shrink-0 place-items-center max-[370px]:ml-auto md:hidden",
  hero: "relative overflow-hidden bg-[radial-gradient(ellipse_at_83%_25%,#e9e9dccc,transparent_56%)]",
  "hero-layout":
    "grid items-center gap-6 py-10 md:min-h-[620px] md:grid-cols-[1.05fr_1fr] md:gap-8 md:pb-[67px] md:pt-[62px] xl:min-h-[660px] xl:gap-11",
  "hero-copy":
    "animate-hero-arrive [&>p]:max-w-[345px] [&>p]:text-[13px] [&>p]:leading-[1.95] [&>p]:text-muted",
  "hero-label":
    "flex items-center gap-2 text-[8px] font-semibold tracking-[1.3px] text-[#70805f] md:text-[9px] md:tracking-[1.8px] [&>span]:h-[7px] [&>span]:w-[7px] [&>span]:rounded-full [&>span]:bg-[#c89012]",
  handwritten:
    "mb-2 block font-display text-[22px] font-normal italic leading-snug text-[#8b986f] xl:text-[23px]",
  "dream-title":
    "block font-display text-[clamp(64px,16vw,86px)] font-normal leading-[1.01] tracking-[-2px] md:text-[63px] lg:text-[72px] xl:text-[88px] xl:tracking-[-3px] [&_em]:font-normal [&_em]:text-[#82916a]",
  "hero-actions":
    "mt-6 flex flex-wrap items-center gap-5 md:mt-[30px] md:gap-[22px]",
  "hero-chat":
    "inline-flex items-center gap-2 border-b border-[#a2a68c] pb-1 text-[11px]",
  "hero-footnote":
    "mt-5 flex items-center gap-4 text-[9px] leading-[1.9] text-[#737860] md:mt-7 [&_strong]:font-medium",
  "route-doodle": "font-serif text-[39px] text-[#9a9e7c] md:text-[53px]",
  "hero-collage":
    "group relative mx-auto mt-1.5 h-[410px] w-full max-w-[420px] min-w-0 animate-hero-arrive [animation-delay:120ms] max-[370px]:h-[385px] md:mt-0 md:h-[450px] md:max-w-none xl:h-[500px]",
  "hero-polaroid":
    "absolute rounded-md bg-[#fffdf5] px-2.5 pt-2.5 shadow-[0_15px_40px_#26372819] transition-transform duration-500 [&_img]:w-full [&_img]:rounded-sm [&_img]:object-cover [&_figcaption]:flex [&_figcaption]:items-center [&_figcaption]:justify-between [&_figcaption]:px-1 [&_figcaption]:pb-3 [&_figcaption]:pt-2.5 [&_figcaption]:font-handwritten [&_figcaption]:text-base md:[&_figcaption]:text-lg xl:[&_figcaption]:text-[22px]",
  "main-polaroid":
    'right-2 top-2 w-[70%] rotate-[4deg] group-hover:translate-y-[-5px] group-hover:rotate-2 md:right-0 md:top-3 md:w-3/4 [&_img]:h-[290px] max-[370px]:[&_img]:h-[265px] md:[&_img]:h-[300px] xl:[&_img]:h-[358px] before:absolute before:left-[36%] before:-top-3 before:h-[29px] before:w-[100px] before:-rotate-[10deg] before:bg-[#dfc995aa] before:content-[""]',
  "small-polaroid":
    "bottom-0 left-0 w-[44%] -rotate-[8deg] group-hover:translate-y-[3px] group-hover:-rotate-[5deg] md:-bottom-1 md:-left-2.5 md:w-[49%] xl:w-[44%] [&_img]:h-[162px] md:[&_img]:h-[185px] xl:[&_img]:h-[213px] [&_figcaption]:!justify-center [&_figcaption]:!text-sm xl:[&_figcaption]:!text-lg",
  "travel-stamp":
    "absolute left-0.5 top-1.5 flex h-[75px] w-[75px] -rotate-[14deg] flex-col items-center justify-center gap-1 rounded-full border border-dashed border-[#75815b] text-[6px] tracking-wider md:-left-3 md:top-0 md:h-20 md:w-20 xl:h-[101px] xl:w-[101px] xl:text-[8px] max-md:[&_svg]:w-6",
  "collage-note":
    "absolute -bottom-1 right-7 -rotate-[7deg] font-handwritten text-[23px] leading-none md:right-3 xl:text-[27px] [&>span]:absolute [&>span]:-right-6 [&>span]:-top-4 [&>span]:font-serif [&>span]:text-[30px] xl:[&>span]:text-[40px]",
  "adventure-strip":
    "flex flex-wrap items-center justify-center gap-4 bg-[#eaece1] px-3 py-5 text-[8px] font-medium tracking-[.8px] text-[#71805c] md:gap-8 md:text-[10px] md:tracking-[1.8px] xl:gap-11 [&>span:nth-child(even)]:text-[17px] [&>span:nth-child(even)]:text-[#a0aa8b] [&>svg]:w-6 max-md:[&>span:nth-child(n+6)]:hidden max-md:[&>svg]:hidden",
  "search-container": "mt-6 md:mt-[35px]",
  "trip-search":
    "grid grid-cols-1 items-center gap-[18px] rounded-xl border border-[#d9d5c3] bg-[#fffdf7] p-[22px] shadow-[0_6px_25px_#203c2505] md:grid-cols-[1fr_1fr_auto] md:gap-4 md:p-6 xl:grid-cols-[1fr_1.35fr_1.3fr_auto] xl:gap-6 [&>label]:min-w-0 [&>label]:border-b [&>label]:border-line [&>label]:pb-3 md:[&>label]:border-b-0 md:[&>label]:border-l md:[&>label]:pb-0 md:[&>label]:pl-6 md:[&>label:first-of-type]:border-l-0 md:[&>label:first-of-type]:pl-0 xl:[&>label:first-of-type]:border-l xl:[&>label:first-of-type]:pl-6 [&_label>span]:mb-2 [&_label>span]:flex [&_label>span]:items-center [&_label>span]:gap-2 [&_label>span]:text-[9px] [&_label>span]:tracking-wider [&_label>span]:text-muted [&_select]:min-h-[25px] [&_select]:w-full [&_select]:border-0 [&_select]:bg-transparent [&_select]:pr-4 [&_select]:text-xs",
  "search-intro":
    "hidden items-center gap-3 text-xs leading-normal xl:flex [&_svg]:text-[#8c8f5a]",
  "promise-strip":
    "flex items-start justify-between gap-4 pb-8 pt-6 text-[8px] text-[#687154] md:justify-center md:gap-8 md:text-[10px] xl:gap-16 [&>span]:flex [&>span]:flex-1 [&>span]:flex-col [&>span]:items-center [&>span]:gap-2 [&>span]:text-center [&>span]:leading-relaxed md:[&>span]:flex-none md:[&>span]:flex-row [&_svg]:h-[15px] [&_svg]:w-[15px]",
  "section-heading":
    "mb-7 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-8 [&>p]:text-xs [&>p]:leading-[1.9] [&>p]:text-muted",
  "desktop-break": "hidden md:block",
  "filter-row":
    "mb-7 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between",
  filters: "flex flex-wrap gap-1.5 md:gap-2",
  filter:
    "flex items-center gap-2 rounded-full border border-[#c9cfb8] bg-transparent px-3 py-2 text-[10px] text-[#626b50] transition-colors hover:border-forest aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-cream md:px-[18px] md:py-2.5 md:text-[11px]",
  active: "",
  "trip-count": "text-[9px] text-[#71765f] md:text-[10px]",
  "trip-grid": "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5",
  "trip-card":
    "min-w-0 overflow-hidden rounded-xl border border-line bg-[#fffdf8] transition duration-300 hover:-translate-y-1 hover:shadow-xl",
  "trip-photo":
    'group relative block h-[290px] w-full overflow-hidden bg-[#7b8969] text-left md:h-[255px] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 hover:[&>img]:scale-105 after:absolute after:inset-0 after:bg-[linear-gradient(#16241865,transparent_65%,#132816b3)] after:content-[""]',
  "photo-tag":
    "absolute left-4 top-5 z-10 rounded-full bg-[#fffdf3ed] px-2.5 py-2 text-[9px] text-forest md:text-[8px]",
  "poster-destination":
    "absolute bottom-[47px] left-4 right-2.5 z-10 font-display text-[37px] font-normal leading-none tracking-[-.5px] text-[#fff9e8] md:text-[35px] xl:text-[32px]",
  "photo-location":
    "absolute bottom-5 left-4 z-10 flex items-center gap-1.5 text-[11px] text-white md:text-[10px]",
  "photo-arrow": "absolute bottom-4 right-3 z-10 text-white",
  "trip-body":
    "p-[22px] md:px-[17px] md:py-[18px] [&_h3]:mb-2.5 [&_h3]:mt-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-normal [&_h3]:leading-snug md:[&_h3]:text-[21px] [&_h3_button]:text-left [&>p]:hidden",
  "trip-duration": "flex items-center gap-1.5 text-[9px] text-[#687255]",
  "trip-card-bottom":
    "mt-3.5 flex items-center justify-between border-t border-[#d8d7c7] pt-3.5 text-[11px] [&_small]:mt-1 [&_small]:block [&_small]:text-[9px] [&_small]:text-[#777c62] [&>button]:grid [&>button]:size-[33px] [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-gold hover:[&>button]:bg-[#ffcf63]",
  "sample-note": "mt-[22px] text-[10px] leading-[1.8] text-[#6c725b]",
  "empty-state":
    "rounded-md border border-dashed border-[#a5b18e] px-5 py-7 text-center text-xs md:p-10 [&>svg]:mx-auto [&_h3]:my-4 [&_p]:mb-5",
  "services-section":
    "pb-14 pt-0.5 md:pb-20 [&_h2]:text-[34px] md:[&_h2]:text-[40px]",
  "service-grid":
    "mt-[30px] grid grid-cols-2 gap-5 lg:grid-cols-4 [&>a]:relative [&>a]:border-t [&>a]:border-[#b5b99d] [&>a]:pb-3 [&>a]:pr-4 [&>a]:pt-6 [&>a]:transition-transform hover:[&>a]:-translate-y-1 [&_h3]:mb-2 [&_h3]:mt-[18px] [&_h3]:text-[13px] [&_h3]:font-semibold md:[&_h3]:text-sm hover:[&>a_h3]:underline [&_p]:text-[10px] [&_p]:leading-relaxed [&_p]:text-muted",
  "service-arrow": "absolute right-1 top-7",
  "about-section": "bg-[#ecefe4] py-14 md:py-[78px]",
  "about-grid":
    "grid grid-cols-1 items-center gap-11 md:grid-cols-2 md:gap-12 xl:gap-[100px]",
  "about-art":
    "relative h-[390px] pb-5 pl-3 pr-6 md:h-[500px] md:pl-0 md:pr-[35px] [&>img]:h-full [&>img]:w-full [&>img]:-rotate-2 [&>img]:rounded-[70px_7px_7px_7px] [&>img]:border-[10px] [&>img]:border-[#fff9e9] [&>img]:object-cover",
  "photo-note":
    "absolute bottom-0 right-0 rotate-[4deg] rounded-sm bg-[#e5cf9e] p-[22px] font-handwritten text-[34px] leading-none shadow-md md:px-[30px] md:py-6 [&>span]:mt-2.5 [&>span]:block [&>span]:text-right [&>span]:font-sans [&>span]:text-[25px]",
  "small-stamp":
    "absolute -left-0.5 top-7 flex size-[75px] -rotate-[12deg] flex-col items-center justify-center gap-1 rounded-full border border-dashed border-[#6c7856] bg-cream text-center text-[7px] tracking-wider md:-left-6 md:top-10 md:size-[88px] md:text-[8px]",
  "about-copy":
    "[&>p]:mb-7 [&>p]:mt-6 [&>p]:text-[13px] [&>p]:leading-[1.9] [&>p]:text-muted md:[&>p]:text-xs [&>.text-link]:mt-2",
  "value-item":
    "mb-[22px] flex items-center gap-4 [&>span]:grid [&>span]:size-[39px] [&>span]:shrink-0 [&>span]:place-items-center [&>span]:rounded-full [&>span]:border [&>span]:border-[#bfc7ad] [&>span]:text-[#63764a] [&_h3]:mb-1 [&_h3]:text-[13px] [&_h3]:font-semibold md:[&_h3]:text-xs [&_p]:text-[11px] [&_p]:leading-relaxed [&_p]:text-muted",
  "how-section": "",
  steps:
    "mt-6 grid grid-cols-1 gap-7 md:mt-11 md:grid-cols-3 md:gap-14 [&>div]:relative [&>div]:border-t [&>div]:border-[#b2b99e] [&>div]:pl-14 [&>div]:pt-[18px] md:[&>div]:pl-0 md:[&>div]:pt-[22px] [&_h3]:mb-2 [&_h3]:mt-2 [&_h3]:text-base [&_h3]:font-medium md:[&_h3]:mt-3.5 [&_p]:text-xs [&_p]:leading-[1.85] [&_p]:text-muted md:[&_p]:max-w-[290px]",
  "step-number":
    "absolute left-0 top-5 font-display text-[36px] font-normal text-[#9ca989] md:static md:text-[39px]",
  "instagram-section": "bg-[#f0eee4] py-14 md:py-[70px]",
  "social-gallery":
    "mx-auto grid max-w-[400px] grid-cols-1 gap-7 px-1.5 pt-5 md:max-w-none md:grid-cols-3 md:gap-[30px] md:px-0",
  "social-card":
    "-rotate-2 rounded-md bg-[#fffbf0] p-[11px] shadow-[0_7px_15px_#3c392b0c] transition-transform duration-300 even:rotate-2 last:-rotate-1 hover:-translate-y-1 hover:rotate-0",
  "social-image":
    "relative [&>img]:h-[330px] [&>img]:w-full [&>img]:object-cover md:[&>img]:h-[250px] xl:[&>img]:h-[305px] [&>svg]:absolute [&>svg]:right-3 [&>svg]:top-3 [&>svg]:text-white [&>svg]:drop-shadow-md",
  "social-caption":
    "relative px-1 pb-2 pt-[18px] [&>span]:text-[8px] [&>span]:tracking-[1.3px] [&>span]:text-[#70755b] [&_h3]:mt-1 [&_h3]:pr-5 [&_h3]:font-handwritten [&_h3]:text-[28px] md:[&_h3]:text-[26px] [&>svg]:absolute [&>svg]:right-0.5 [&>svg]:top-8",
  "faq-section":
    "grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.25fr] md:gap-11 xl:gap-[90px]",
  faqs: "[&_details]:border-b [&_details]:border-[#d6d8c3] [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:justify-between [&_summary]:gap-5 [&_summary]:py-[21px] [&_summary]:text-xs [&_summary]:font-medium [&_summary]:transition-colors [&_summary::-webkit-details-marker]:hidden hover:[&_summary]:text-[#8b6f39] [&_p]:pb-[22px] [&_p]:pr-6 [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-muted [&_details[open]_p]:animate-detail-open [&_details[open]_.faq-plus]:rotate-45",
  "faq-plus": "text-[22px] font-normal text-[#617449]",
  "contact-section": "pb-11 md:pb-[65px]",
  "contact-panel":
    "relative isolate overflow-hidden rounded-2xl bg-forest px-[22px] py-11 text-center text-[#fcf3df] md:px-10 md:py-[65px] [&>.eyebrow]:text-[7px] [&>.eyebrow]:tracking-[1.2px] [&>.eyebrow]:text-[#d4c491] md:[&>.eyebrow]:text-[9px] [&_h2]:text-[37px] md:[&_h2]:text-[55px] [&_h2_em]:text-[#e1cc9e] [&>p]:mb-6 [&>p]:mt-5 [&>p]:text-xs [&>p]:leading-[1.85] [&>p]:text-[#d1d7bf]",
  "contact-details":
    "mt-7 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:gap-[22px] [&_a]:flex [&_a]:items-center [&_a]:gap-2 [&_a]:text-[11px] [&_a]:text-[#e6e7cf] hover:[&_a]:underline",
  "contact-decoration":
    "absolute -bottom-[60px] -right-[75px] -z-10 rotate-[15deg] opacity-[.13]",
  footer: "",
  "footer-top":
    "flex items-start justify-between gap-6 pb-[30px] md:items-center [&_p]:mt-3 [&_p]:text-[10px] [&_p]:text-muted",
  "footer-links":
    "grid grid-cols-[1fr_auto] gap-4 text-[10px] md:flex md:items-center md:gap-7 md:text-[11px]",
  "footer-bottom":
    "flex flex-col gap-2.5 border-t border-line pb-7 pt-6 text-[8px] text-[#6c7259] md:flex-row md:justify-between md:gap-4 md:text-[9px] [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-1.5",
  "trip-dialog":
    "max-h-[90dvh] w-[calc(100%-32px)] max-w-[640px] overflow-auto rounded-lg border-0 bg-[#fff9e9] p-0 text-forest backdrop:bg-[#172a16d1] backdrop:backdrop-blur-md open:animate-detail-open",
  "dialog-close":
    "absolute right-4 top-4 z-10 grid size-[38px] place-items-center rounded-full bg-[#fff9e9]",
  "dialog-image": "h-[190px] w-full object-cover md:h-[220px]",
  "dialog-body":
    "p-6 md:p-[30px] [&_h2]:text-[32px] md:[&_h2]:text-[38px] [&>p]:mt-4 [&>p]:text-[13px] [&>p]:leading-[1.8] [&>p]:text-muted [&_h3]:mb-[18px] [&_h3]:text-[15px] [&_h3]:font-semibold [&>.sample-note]:mb-6 [&>.sample-note]:text-[11px] [&>.button]:w-full",
  highlights:
    "my-[22px] flex flex-wrap gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:rounded-sm [&>span]:bg-[#e6ead6] [&>span]:px-2 [&>span]:py-1.5 [&>span]:text-[10px]",
  itinerary:
    "grid list-none gap-4 p-0 [&_li]:grid [&_li]:grid-cols-[50px_1fr] [&_li]:gap-3.5 [&_li]:text-xs [&_li]:leading-relaxed [&_strong]:text-[#63764a]",
  "copy-button": "mt-4 block w-full text-center text-[11px] underline",
  "sr-only": "sr-only",
  "packages-section":
    "scroll-mt-[85px] border-y border-[#e1e4d9] bg-[#f1f2eb] py-14 md:py-[85px]",
  "package-toolbar":
    "mb-7 mt-8 flex flex-col items-start gap-3.5 md:flex-row md:items-center md:justify-between md:gap-5",
  "package-count": "flex items-center gap-2 text-[11px] text-[#697363]",
  "packages-grid": "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[30px]",
  "package-card":
    "animate-package-enter overflow-hidden rounded-2xl border border-[#e1e4d7] bg-[#fffefa] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_#243e2810]",
  "package-cover":
    'group relative block h-[265px] w-full overflow-hidden bg-[#788967] text-left md:h-[285px] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 hover:[&>img]:scale-[1.06] after:absolute after:inset-x-0 after:bottom-0 after:top-[45%] after:bg-gradient-to-t after:from-[#12291c99] after:to-transparent after:content-[""]',
  "package-badge":
    "absolute left-5 top-5 rounded-full bg-[#fffbeeeb] px-3 py-2 text-[10px]",
  "package-place":
    "absolute bottom-5 left-6 z-10 flex items-center gap-2 text-xs text-white",
  "package-cover-arrow":
    "absolute bottom-4 right-5 z-10 grid size-9 place-items-center rounded-full border border-white/50 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-white/10",
  "package-content":
    "p-[22px] md:px-[27px] md:pb-[23px] md:pt-[25px] [&_h3]:mb-2 [&_h3]:mt-3.5 [&_h3]:font-display [&_h3]:text-[27px] [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:tracking-[-.6px] md:[&_h3]:text-[29px] [&_h3_button]:text-left",
  "package-meta":
    "flex justify-between gap-4 text-[10px] text-[#748168] [&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:gap-1.5 [&>span:last-child]:text-[#8a6b2c]",
  "package-route": "text-[10px] text-[#7b816f]",
  "package-description":
    "mt-4 text-xs leading-[1.85] text-[#6d7565] md:min-h-[67px]",
  "package-features":
    "flex flex-wrap gap-x-3 gap-y-2 py-5 md:gap-x-3.5 [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:text-[9px] [&>span]:text-[#5f7252] md:[&>span]:text-[10px]",
  "package-price-row":
    "flex items-center justify-between gap-4 border-t border-[#e7e8df] pt-5 [&_small]:mb-1 [&_small]:block [&_small]:text-[7px] [&_small]:tracking-wider [&_small]:text-[#7b8271] [&_strong]:text-xl [&_strong]:font-medium [&_strong]:tracking-[-.5px]",
  "package-detail-button":
    "flex items-center gap-4 rounded-lg border border-[#cdd7bf] px-4 py-3 text-[11px] transition-colors hover:bg-[#edf1e4]",
  "custom-package":
    "mt-[30px] flex flex-col items-start gap-5 rounded-xl border border-dashed border-[#b6c2a6] p-[22px] md:flex-row md:items-center md:justify-between md:px-[30px] md:py-6 [&>div]:flex [&>div]:items-center [&>div]:gap-4 [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-medium [&_p]:text-[11px] [&_p]:leading-relaxed [&_p]:text-[#717b65] max-md:[&>.text-link]:ml-[62px]",
  "custom-package-icon":
    "grid size-[45px] shrink-0 place-items-center rounded-full bg-[#e3e9d7]",
  "package-dialog":
    "max-h-[92dvh] w-[calc(100%-28px)] max-w-[720px] overflow-auto rounded-2xl border-0 bg-[#fffdf6] p-0 text-[#293e30] backdrop:bg-[#14261dd1] backdrop:backdrop-blur-md open:animate-dialog-enter",
  "package-dialog-cover":
    "relative h-[195px] md:h-60 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&>span]:absolute [&>span]:bottom-5 [&>span]:left-[30px] [&>span]:rounded-md [&>span]:bg-[#fff9e9] [&>span]:px-3 [&>span]:py-2 [&>span]:text-[11px]",
  "package-dialog-body":
    "p-6 md:p-8 [&_h2]:text-[31px] [&_h2]:leading-[1.15] md:[&_h2]:text-[38px] [&_h3]:mb-5 [&_h3]:text-base [&_h3]:font-semibold",
  "package-dialog-intro": "mb-6 mt-4 text-[13px] leading-[1.8] text-[#6b7763]",
  "package-dialog-facts":
    "mb-7 flex flex-wrap items-center gap-3 border-y border-[#dce1d2] py-4 md:gap-[18px] [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:text-[11px] [&_strong]:text-sm md:[&_strong]:ml-auto [&_strong>small]:text-[11px] [&_strong>small]:font-normal",
  "package-timeline":
    'mb-6 list-none p-0 [&_li]:relative [&_li]:flex [&_li]:gap-[18px] [&_li]:pb-6 [&_li:not(:last-child)]:before:absolute [&_li:not(:last-child)]:before:bottom-0 [&_li:not(:last-child)]:before:left-4 [&_li:not(:last-child)]:before:top-[33px] [&_li:not(:last-child)]:before:border-l [&_li:not(:last-child)]:before:border-dashed [&_li:not(:last-child)]:before:border-[#bac6a8] [&_li:not(:last-child)]:before:content-[""] [&_h4]:my-2 [&_h4]:text-[13px] [&_h4]:font-semibold [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-[#6c7763]',
  "timeline-day":
    "grid size-[33px] shrink-0 place-items-center rounded-full bg-[#e7ecdb] text-[11px] text-[#536647]",
  "package-inclusions":
    "rounded-lg bg-[#f0f1e8] p-5 [&_h3]:!mb-2 [&_h3]:!text-sm [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-[#6c7763]",
  "package-enquiry":
    "mt-7 border-t border-[#dce1d2] pt-6 [&_h3]:!mb-2 [&>p]:text-xs [&>p]:text-[#718068] [&>.button]:w-full [&>small]:mt-3 [&>small]:block [&>small]:text-center [&>small]:text-[10px] [&>small]:leading-relaxed [&>small]:text-[#76836a]",
  "enquiry-fields":
    "mb-[18px] mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr] [&_label]:min-w-0 [&_label]:text-[11px] [&_label]:font-semibold [&_label>span]:font-normal [&_label>span]:text-[#7a846e] [&_input]:mt-2 [&_input]:block [&_input]:min-h-[43px] [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cbd3bf] [&_input]:bg-[#fffefb] [&_input]:p-3 [&_select]:mt-2 [&_select]:block [&_select]:min-h-[43px] [&_select]:w-full [&_select]:min-w-0 [&_select]:rounded-md [&_select]:border [&_select]:border-[#cbd3bf] [&_select]:bg-[#fffefb] [&_select]:p-3",
  "customise-toggle":
    "mb-5 flex cursor-pointer items-start gap-3 rounded-lg border border-[#d6dfc9] bg-[#edf1e5] p-4 [&_input]:mt-0.5 [&_input]:size-[17px] [&_input]:shrink-0 [&_input]:accent-forest [&_strong]:block [&_strong]:text-xs [&_strong]:font-semibold [&_small]:mt-1 [&_small]:block [&_small]:text-[10px] [&_small]:leading-relaxed [&_small]:text-[#6c7860]",
  "customise-request":
    "mb-5 block text-xs [&_textarea]:mt-2 [&_textarea]:block [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-[#cbd3bf] [&_textarea]:bg-[#fffefb] [&_textarea]:p-3 [&_textarea]:leading-relaxed",
} satisfies Record<string, string>;

/** Retain semantic hooks for scroll reveals while composing scanned Tailwind utilities. */
export const cx = (...names: (keyof typeof styles | false)[]): string =>
  names
    .filter((name): name is keyof typeof styles => name !== false)
    .map((name) => `${name} ${styles[name]}`)
    .join(" ");
