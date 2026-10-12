/** Shared Tailwind utility presets. Literal classes keep production scanning reliable. */
export const styles = {
  container:
    "mx-auto w-[calc(100%-40px)] max-w-[1200px] md:w-[calc(100%-96px)]",
  section: "py-14 md:py-[85px]",
  button:
    "inline-flex items-center justify-center gap-4 rounded-lg border border-transparent px-5 py-4 text-xs font-bold transition duration-200 hover:-translate-y-0.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5 md:gap-5 md:px-6",
  "button-green": "bg-gold text-[#0a150e] hover:bg-[#f1cb8c]",
  "button-yellow": "bg-gold text-[#0a150e] hover:bg-[#f1cb8c]",
  "button-cream": "bg-gold text-[#0a150e] hover:bg-[#f1cb8c]",
  eyebrow:
    "mb-4 block text-[9px] font-bold tracking-[1.3px] text-gold/90 md:text-[10px] md:tracking-[1.8px]",
  "text-link":
    "inline-flex items-center gap-4 border-b border-gold/40 pb-2 text-xs font-semibold text-[#f5efe0] [&_svg]:text-gold [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5 hover:text-gold md:text-[13px]",
  "skip-link": "fixed -top-24 left-5 z-50 bg-[#0a150e] text-[#f5efe0] p-4 focus:top-2.5",
  header:
    "sticky top-0 z-20 border-b border-white/10 bg-[#0a150e]/85 backdrop-blur-xl",
  "nav-wrap":
    "flex h-[73px] items-center justify-between gap-3 md:h-[83px] md:gap-6",
  brand: "inline-flex items-center gap-2 md:gap-2.5",
  "brand-logo": "h-[37px] w-[37px] rounded-full md:h-[46px] md:w-[46px]",
  "brand-words":
    "[&>span]:flex [&>span]:items-center [&>span]:gap-0.5 [&>span]:text-[21px] [&>span]:font-bold [&>span]:leading-tight [&>span]:tracking-[-1px] [&>span]:text-[#f5efe0] md:[&>span]:text-[25px] [&>small]:mt-1 [&>small]:block [&>small]:text-[7px] [&>small]:tracking-[.7px] [&>small]:text-[#b0b89e] md:[&>small]:text-[9px] md:[&>small]:tracking-[1px]",
  "brand-infinity": "w-5 -rotate-[18deg] text-gold md:w-[23px]",
  navigation:
    "absolute left-5 right-5 top-[68px] hidden flex-col gap-6 rounded-md border border-white/10 bg-[#0a150e]/95 p-6 text-base font-semibold text-[#e8e0cc] shadow-2xl md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0 md:text-base md:shadow-none [&_a:hover]:text-gold [&_a]:transition-colors",
  "is-open": "max-md:!flex",
  "nav-cta":
    "ml-auto !gap-2 !px-3.5 !py-2.5 !text-xs font-semibold hidden md:inline-flex md:ml-0 md:!gap-4 md:!px-5 md:!py-3 md:!text-sm !bg-gold !text-[#0a150e] hover:!bg-[#f1cb8c]",
  "menu-button":
    "grid h-[38px] w-[30px] shrink-0 place-items-center text-[#e8e0cc] max-[370px]:ml-auto md:hidden",
  hero: "relative overflow-hidden",
  "hero-bg": "hidden",
  "hero-overlay": "hidden",
  "hero-layout":
    "relative z-10 grid items-center gap-6 py-10 md:min-h-[620px] md:grid-cols-[1.05fr_1fr] md:gap-8 md:pb-[67px] md:pt-[62px] xl:min-h-[660px] xl:gap-11",
  "packages-hero-layout": "relative z-10 py-12 md:py-16",
  "hero-copy":
    "animate-hero-arrive [&>p]:max-w-[345px] [&>p]:text-[13px] [&>p]:leading-[1.95] [&>p]:text-[#c5ccb9]",
  "hero-label":
    "flex items-center gap-2 text-[8px] font-semibold tracking-[1.3px] text-[#b9c5a8] md:text-[9px] md:tracking-[1.8px] [&>span]:h-[7px] [&>span]:w-[7px] [&>span]:rounded-full [&>span]:bg-gold",
  handwritten:
    "mb-2 block font-display text-[22px] font-normal italic leading-snug text-gold xl:text-[23px]",
  "dream-title":
    "block font-display text-[clamp(64px,16vw,86px)] font-normal leading-[1.01] tracking-[-2px] text-[#f5efe0] md:text-[63px] lg:text-[72px] xl:text-[88px] xl:tracking-[-3px] [&_em]:font-normal [&_em]:text-gold",
  "hero-actions":
    "mt-6 flex flex-wrap items-center gap-5 md:mt-[30px] md:gap-[22px]",
  "hero-chat":
    "inline-flex items-center gap-2 border-b border-[#8a9c78] pb-1 text-[11px] text-[#d0d8c3]",
  "hero-footnote":
    "mt-5 flex items-center gap-4 text-[9px] leading-[1.9] text-[#a8b299] md:mt-7 [&_strong]:font-medium [&_strong]:text-[#d4cbb0]",
  "route-doodle": "font-serif text-[39px] text-gold/60 md:text-[53px]",
  "hero-collage":
    "group relative z-10 mx-auto mt-1.5 h-[410px] w-full max-w-[420px] min-w-0 animate-hero-arrive [animation-delay:120ms] max-[370px]:h-[385px] md:mt-0 md:h-[450px] md:max-w-none xl:h-[500px]",
  "hero-polaroid":
    "absolute rounded-md bg-[#fffdf5]/95 px-2.5 pt-2.5 shadow-[0_15px_50px_#0a1a1060] transition-transform duration-500 [&_img]:w-full [&_img]:rounded-sm [&_img]:object-cover [&_figcaption]:flex [&_figcaption]:items-center [&_figcaption]:justify-between [&_figcaption]:px-1 [&_figcaption]:pb-3 [&_figcaption]:pt-2.5 [&_figcaption]:font-handwritten [&_figcaption]:text-base md:[&_figcaption]:text-lg xl:[&_figcaption]:text-[22px] text-forest",
  "main-polaroid":
    'right-2 top-2 w-[70%] rotate-[4deg] group-hover:translate-y-[-5px] group-hover:rotate-2 md:right-0 md:top-3 md:w-3/4 [&_img]:h-[290px] max-[370px]:[&_img]:h-[265px] md:[&_img]:h-[300px] xl:[&_img]:h-[358px] before:absolute before:left-[36%] before:-top-3 before:h-[29px] before:w-[100px] before:-rotate-[10deg] before:bg-[#dfc995aa] before:content-[""]',
  "small-polaroid":
    "bottom-0 left-0 w-[44%] -rotate-[8deg] group-hover:translate-y-[3px] group-hover:-rotate-[5deg] md:-bottom-1 md:-left-2.5 md:w-[49%] xl:w-[44%] [&_img]:h-[162px] md:[&_img]:h-[185px] xl:[&_img]:h-[213px] [&_figcaption]:!justify-center [&_figcaption]:!text-sm xl:[&_figcaption]:!text-lg",
  "travel-stamp":
    "absolute left-0.5 top-1.5 flex h-[75px] w-[75px] -rotate-[14deg] flex-col items-center justify-center gap-1 rounded-full border border-dashed border-gold/40 bg-[#0a150e]/70 text-[6px] tracking-wider text-[#d4cbb0] backdrop-blur-sm md:-left-3 md:top-0 md:h-20 md:w-20 xl:h-[101px] xl:w-[101px] xl:text-[8px] max-md:[&_svg]:w-6",
  "collage-note":
    "absolute -bottom-1 right-7 -rotate-[7deg] font-handwritten text-[23px] leading-none text-[#e8e0cc] drop-shadow-[0_2px_8px_#0a1a1060] md:right-3 xl:text-[27px] [&>span]:absolute [&>span]:-right-6 [&>span]:-top-4 [&>span]:font-serif [&>span]:text-[30px] xl:[&>span]:text-[40px]",
  "adventure-strip":
    "flex flex-wrap items-center justify-center gap-4 border-y border-white/10 bg-[#0a150e]/60 backdrop-blur-md px-3 py-5 text-[8px] font-medium tracking-[.8px] text-[#d5dec6] md:gap-8 md:text-[10px] md:tracking-[1.8px] xl:gap-11 [&>span:nth-child(even)]:text-[17px] [&>span:nth-child(even)]:text-gold/70 [&>svg]:w-6 [&>svg]:text-gold max-md:[&>span:nth-child(n+6)]:hidden max-md:[&>svg]:hidden",
  "search-container": "mt-6 md:mt-[35px]",
  "trip-search":
    "grid grid-cols-1 items-center gap-[18px] rounded-xl border border-white/15 bg-[#0d1c14]/85 backdrop-blur-md p-[22px] shadow-2xl md:grid-cols-[1fr_1fr_auto] md:gap-4 md:p-6 xl:grid-cols-[1fr_1.35fr_1.3fr_auto] xl:gap-6 [&>label]:min-w-0 [&>label]:border-b [&>label]:border-white/10 [&>label]:pb-3 md:[&>label]:border-b-0 md:[&>label]:border-l md:[&>label]:pb-0 md:[&>label]:pl-6 md:[&>label:first-of-type]:border-l-0 md:[&>label:first-of-type]:pl-0 xl:[&>label:first-of-type]:border-l xl:[&>label:first-of-type]:pl-6 [&_label>span]:mb-2 [&_label>span]:flex [&_label>span]:items-center [&_label>span]:gap-2 [&_label>span]:text-[9px] [&_label>span]:tracking-wider [&_label>span]:text-[#a8b897] [&_select]:min-h-[25px] [&_select]:w-full [&_select]:border-0 [&_select]:bg-transparent [&_select]:pr-4 [&_select]:text-xs [&_select]:text-[#f5efe0]",
  "search-intro":
    "hidden items-center gap-3 text-xs leading-normal xl:flex [&_svg]:text-gold text-[#c2ceb4]",
  "promise-strip":
    "flex items-start justify-between gap-4 pb-8 pt-6 text-[8px] text-[#c2ceb4] md:justify-center md:gap-8 md:text-[10px] xl:gap-16 [&>span]:flex [&>span]:flex-1 [&>span]:flex-col [&>span]:items-center [&>span]:gap-2 [&>span]:text-center [&>span]:leading-relaxed md:[&>span]:flex-none md:[&>span]:flex-row [&_svg]:h-[15px] [&_svg]:w-[15px] [&_svg]:text-gold",
  "section-heading":
    "mb-7 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-8 [&_h2]:text-[#f5efe0] [&_h2_em]:text-gold [&>p]:text-xs [&>p]:leading-[1.9] [&>p]:text-[#b4c2a5]",
  "desktop-break": "hidden md:block",
  "filter-row":
    "mb-7 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between",
  filters: "flex flex-wrap gap-1.5 md:gap-2",
  filter:
    "flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-2.5 text-xs font-medium text-[#d5dec6] transition-colors hover:border-gold hover:text-white aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-[#0a150e] md:px-5 md:py-2.5 md:text-sm",
  active: "",
  "trip-count": "text-[9px] text-[#9eb18f] md:text-[10px]",
  "trip-grid": "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5",
  "trip-card":
    "min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d1c14]/85 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-2xl",
  "trip-photo":
    'group relative block h-[290px] w-full overflow-hidden bg-[#16271c] text-left md:h-[255px] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 hover:[&>img]:scale-105 after:absolute after:inset-0 after:bg-[linear-gradient(#0a150e65,transparent_65%,#0a150eb3)] after:content-[""]',
  "photo-tag":
    "absolute left-4 top-5 z-10 rounded-full border border-white/15 bg-[#0a150e]/80 backdrop-blur-sm px-2.5 py-2 text-[9px] text-gold md:text-[8px]",
  "poster-destination":
    "absolute bottom-[47px] left-4 right-2.5 z-10 font-display text-[37px] font-normal leading-none tracking-[-.5px] text-[#fff9e8] md:text-[35px] xl:text-[32px]",
  "photo-location":
    "absolute bottom-5 left-4 z-10 flex items-center gap-1.5 text-[11px] text-white md:text-[10px]",
  "photo-arrow": "absolute bottom-4 right-3 z-10 text-white",
  "trip-body":
    "p-[22px] md:px-[17px] md:py-[18px] [&_h3]:mb-2.5 [&_h3]:mt-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-normal [&_h3]:leading-snug [&_h3]:text-[#f5efe0] md:[&_h3]:text-[21px] [&_h3_button]:text-left [&_h3_button]:text-[#f5efe0] [&>p]:hidden",
  "trip-duration": "flex items-center gap-1.5 text-[9px] text-[#9eb18f]",
  "trip-card-bottom":
    "mt-3.5 flex items-center justify-between border-t border-white/10 pt-3.5 text-[11px] [&_small]:mt-1 [&_small]:block [&_small]:text-[9px] [&_small]:text-[#9eb18f] [&>button]:grid [&>button]:size-[33px] [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-gold [&>button]:text-[#0a150e] hover:[&>button]:bg-[#ffcf63]",
  "sample-note": "mt-[22px] text-[10px] leading-[1.8] text-[#819273]",
  "empty-state":
    "rounded-md border border-dashed border-white/20 bg-white/5 px-5 py-7 text-center text-xs text-[#c2ceb4] md:p-10 [&>svg]:mx-auto [&>svg]:text-gold [&_h3]:my-4 [&_h3]:text-[#f5efe0] [&_p]:mb-5",
  "services-section":
    "pb-14 pt-0.5 md:pb-20 [&_h2]:text-[34px] md:[&_h2]:text-[40px] [&_h2]:text-[#f5efe0] [&_h2_em]:text-gold",
  "service-grid":
    "mt-[30px] grid grid-cols-2 gap-5 lg:grid-cols-4 [&>a]:relative [&>a]:rounded-xl [&>a]:border [&>a]:border-white/10 [&>a]:bg-[#0d1c14]/60 [&>a]:backdrop-blur-md [&>a]:p-6 [&>a]:transition-all hover:[&>a]:-translate-y-1 hover:[&>a]:border-gold/40 hover:[&>a]:bg-[#0d1c14]/80 [&_h3]:mb-2 [&_h3]:mt-[18px] [&_h3]:text-[13px] [&_h3]:font-semibold md:[&_h3]:text-sm [&_h3]:text-[#f5efe0] hover:[&>a_h3]:text-gold [&_p]:text-[10px] [&_p]:leading-relaxed [&_p]:text-[#a8b897] [&_svg]:text-gold",
  "service-arrow": "absolute right-4 top-6 text-gold/70",
  "about-section": "py-14 md:py-[78px]",
  "about-grid":
    "grid grid-cols-1 items-center gap-11 md:grid-cols-2 md:gap-12 xl:gap-[100px]",
  "about-art":
    "relative h-[390px] pb-5 pl-3 pr-6 md:h-[500px] md:pl-0 md:pr-[35px] [&>img]:h-full [&>img]:w-full [&>img]:-rotate-2 [&>img]:rounded-[70px_7px_7px_7px] [&>img]:border-[10px] [&>img]:border-[#0d1c14] [&>img]:object-cover",
  "photo-note":
    "absolute bottom-0 right-0 rotate-[4deg] rounded-sm bg-[#e5cf9e] p-[22px] font-handwritten text-[34px] leading-none text-forest shadow-md md:px-[30px] md:py-6 [&>span]:mt-2.5 [&>span]:block [&>span]:text-right [&>span]:font-sans [&>span]:text-[25px]",
  "small-stamp":
    "absolute -left-0.5 top-7 flex size-[75px] -rotate-[12deg] flex-col items-center justify-center gap-1 rounded-full border border-dashed border-gold/40 bg-[#0a150e]/80 text-center text-[7px] tracking-wider text-gold md:-left-6 md:top-10 md:size-[88px] md:text-[8px]",
  "about-copy":
    "[&>p]:mb-7 [&>p]:mt-6 [&>p]:text-[13px] [&>p]:leading-[1.9] [&>p]:text-[#b4c2a5] md:[&>p]:text-xs [&>.text-link]:mt-2",
  "value-item":
    "mb-[22px] flex items-center gap-4 [&>span]:grid [&>span]:size-[39px] [&>span]:shrink-0 [&>span]:place-items-center [&>span]:rounded-full [&>span]:border [&>span]:border-white/15 [&>span]:bg-white/5 [&>span]:text-gold [&_h3]:mb-1 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:text-[#f5efe0] md:[&_h3]:text-xs [&_p]:text-[11px] [&_p]:leading-relaxed [&_p]:text-[#a8b897]",
  "how-section": "",
  steps:
    "mt-6 grid grid-cols-1 gap-7 md:mt-11 md:grid-cols-3 md:gap-14 [&>div]:relative [&>div]:border-t [&>div]:border-white/15 [&>div]:pl-14 [&>div]:pt-[18px] md:[&>div]:pl-0 md:[&>div]:pt-[22px] [&_h3]:mb-2 [&_h3]:mt-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-[#f5efe0] md:[&_h3]:mt-3.5 [&_p]:text-xs [&_p]:leading-[1.85] [&_p]:text-[#a8b897] md:[&_p]:max-w-[290px]",
  "step-number":
    "absolute left-0 top-5 font-display text-[36px] font-normal text-gold/70 md:static md:text-[39px]",
  "instagram-section": "py-14 md:py-[70px]",
  "social-gallery":
    "mx-auto grid max-w-[400px] grid-cols-1 gap-7 px-1.5 pt-5 md:max-w-none md:grid-cols-3 md:gap-[30px] md:px-0",
  "social-card":
    "-rotate-2 rounded-xl border border-white/10 bg-[#0d1c14]/85 backdrop-blur-md p-[11px] shadow-[0_15px_40px_#00000070] transition-transform duration-300 even:rotate-2 last:-rotate-1 hover:-translate-y-1 hover:rotate-0 hover:border-gold/40",
  "social-image":
    "relative overflow-hidden rounded-lg [&>img]:h-[330px] [&>img]:w-full [&>img]:object-cover md:[&>img]:h-[250px] xl:[&>img]:h-[305px] [&>svg]:absolute [&>svg]:right-3 [&>svg]:top-3 [&>svg]:text-white [&>svg]:drop-shadow-md",
  "social-caption":
    "relative px-1 pb-2 pt-[18px] [&>span]:text-[8px] [&>span]:tracking-[1.3px] [&>span]:text-gold [&_h3]:mt-1 [&_h3]:pr-5 [&_h3]:font-handwritten [&_h3]:text-[28px] md:[&_h3]:text-[26px] [&_h3]:text-[#f5efe0] [&>svg]:absolute [&>svg]:right-0.5 [&>svg]:top-8 [&>svg]:text-gold",
  "faq-section":
    "grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.25fr] md:gap-11 xl:gap-[90px] [&_h2]:text-[#f5efe0] [&_h2_em]:text-gold",
  faqs:
    "[&_details]:border-b [&_details]:border-white/10 [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:justify-between [&_summary]:gap-5 [&_summary]:py-[21px] [&_summary]:text-xs [&_summary]:font-medium [&_summary]:text-[#f5efe0] [&_summary]:transition-colors [&_summary::-webkit-details-marker]:hidden hover:[&_summary]:text-gold [&_p]:pb-[22px] [&_p]:pr-6 [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-[#a8b897] [&_details[open]_p]:animate-detail-open [&_details[open]_.faq-plus]:rotate-45",
  "faq-plus": "text-[22px] font-normal text-gold",
  "contact-section": "pb-11 md:pb-[65px]",
  "contact-panel":
    "relative isolate overflow-hidden rounded-2xl border border-white/15 bg-[#0a160f]/90 backdrop-blur-xl px-[22px] py-11 text-center text-[#fcf3df] shadow-2xl md:px-10 md:py-[65px] [&>.eyebrow]:text-[7px] [&>.eyebrow]:tracking-[1.2px] [&>.eyebrow]:text-gold md:[&>.eyebrow]:text-[9px] [&_h2]:text-[37px] md:[&_h2]:text-[55px] [&_h2]:text-[#f5efe0] [&_h2_em]:text-gold [&>p]:mb-6 [&>p]:mt-5 [&>p]:text-xs [&>p]:leading-[1.85] [&>p]:text-[#c5ccb9]",
  "contact-details":
    "mt-7 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:gap-[22px] [&_a]:flex [&_a]:items-center [&_a]:gap-2 [&_a]:text-[11px] [&_a]:text-[#e6e7cf] hover:[&_a]:text-gold",
  "contact-decoration":
    "absolute -bottom-[60px] -right-[75px] -z-10 rotate-[15deg] opacity-[.08] text-gold",
  footer: "mt-12",
  "footer-top":
    "flex items-start justify-between gap-6 pb-[30px] md:items-center border-t border-white/10 pt-10 [&_p]:mt-3 [&_p]:text-[10px] [&_p]:text-[#a8b897] [&_.brand-words_span]:!text-[#f5efe0] [&_.brand-words_small]:!text-[#a8b897] [&_.brand-infinity]:!text-gold",
  "footer-links":
    "grid grid-cols-[1fr_auto] gap-4 text-[10px] md:flex md:items-center md:gap-7 md:text-[11px] [&_a]:text-[#c2ceb4] hover:[&_a]:text-gold [&_svg]:text-gold",
  "footer-bottom":
    "flex flex-col gap-2.5 border-t border-white/10 pb-7 pt-6 text-[8px] text-[#819273] md:flex-row md:justify-between md:gap-4 md:text-[9px] [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-1.5 [&_svg]:text-gold",
  "trip-dialog":
    "max-h-[90dvh] w-[calc(100%-32px)] max-w-[640px] overflow-auto rounded-2xl border border-white/15 bg-[#0b1710] p-0 text-[#f5efe0] shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md open:animate-detail-open",
  "dialog-close":
    "absolute right-4 top-4 z-10 grid size-[38px] place-items-center rounded-full bg-[#0a150e]/80 border border-white/20 text-[#f5efe0] hover:text-gold hover:border-gold backdrop-blur-md",
  "dialog-image": "h-[190px] w-full object-cover md:h-[220px]",
  "dialog-body":
    "p-6 md:p-[30px] [&_h2]:text-[32px] md:[&_h2]:text-[38px] [&_h2]:text-[#f5efe0] [&>p]:mt-4 [&>p]:text-[13px] [&>p]:leading-[1.8] [&>p]:text-[#b4c2a5] [&_h3]:mb-[18px] [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-[#f5efe0] [&>.sample-note]:mb-6 [&>.sample-note]:text-[11px] [&>.button]:w-full",
  highlights:
    "my-[22px] flex flex-wrap gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:rounded-sm [&>span]:bg-white/10 [&>span]:border [&>span]:border-white/15 [&>span]:px-2 [&>span]:py-1.5 [&>span]:text-[10px] [&>span]:text-[#d5dec6]",
  itinerary:
    "grid list-none gap-4 p-0 [&_li]:grid [&_li]:grid-cols-[50px_1fr] [&_li]:gap-3.5 [&_li]:text-xs [&_li]:leading-relaxed [&_strong]:text-gold",
  "copy-button": "mt-4 block w-full text-center text-[11px] text-gold/80 hover:text-gold underline",
  "sr-only": "sr-only",
  "packages-section":
    "scroll-mt-[85px] py-14 md:py-[85px]",
  "package-toolbar":
    "mb-7 mt-8 flex flex-col items-start gap-3.5 md:flex-row md:items-center md:justify-between md:gap-5",
  "package-count":
    "flex items-center gap-2 text-xs font-medium text-[#9eb18f] md:text-sm",
  "packages-grid": "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[30px]",
  "package-card":
    "animate-package-enter overflow-hidden rounded-2xl border border-white/10 bg-[#0d1c14]/85 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_50px_#00000080]",
  "package-cover":
    'group relative block h-[265px] w-full overflow-hidden bg-[#16271c] text-left md:h-[285px] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 hover:[&>img]:scale-[1.06] after:absolute after:inset-x-0 after:bottom-0 after:top-[45%] after:bg-gradient-to-t after:from-[#09150d] after:to-transparent after:content-[""]',
  "package-badge":
    "absolute left-5 top-5 rounded-full border border-white/15 bg-[#0a150e]/80 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-gold",
  "package-place":
    "absolute bottom-5 left-6 z-10 flex items-center gap-2 text-sm font-medium text-white md:text-[15px]",
  "package-cover-arrow":
    "absolute bottom-4 right-5 z-10 grid size-9 place-items-center rounded-full border border-white/40 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-gold group-hover:text-[#0a150e] group-hover:border-gold",
  "package-content":
    "p-6 md:px-7 md:pb-7 md:pt-7 [&_h3]:mb-2.5 [&_h3]:mt-3.5 [&_h3]:font-display [&_h3]:text-[28px] [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:tracking-[-.6px] [&_h3]:text-[#f5efe0] md:[&_h3]:text-[33px] [&_h3_button]:text-left [&_h3_button]:text-[#f5efe0]",
  "package-meta":
    "flex justify-between gap-4 text-xs font-semibold text-[#a8b897] md:text-[13px] [&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:gap-1.5 [&>span:last-child]:text-gold",
  "package-route": "text-xs font-medium text-[#9eb18f] md:text-sm",
  "package-description":
    "mt-4 text-[13px] leading-[1.85] text-[#b4c2a5] md:min-h-[67px] md:text-[15px]",
  "package-features":
    "flex flex-wrap gap-x-3.5 gap-y-2 py-5 md:gap-x-4 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:text-xs [&>span]:font-medium [&>span]:text-[#c2ceb4] [&_svg]:text-gold md:[&>span]:text-[13px]",
  "package-price-row":
    "flex items-center justify-between gap-4 border-t border-white/10 pt-5 [&_small]:mb-1 [&_small]:block [&_small]:text-[9px] [&_small]:font-semibold [&_small]:tracking-wider [&_small]:text-[#9eb18f] md:[&_small]:text-[10px] [&_strong]:text-2xl [&_strong]:font-semibold [&_strong]:tracking-[-.5px] [&_strong]:text-[#f5efe0] md:[&_strong]:text-[27px]",
  "package-flight-options":
    "mb-3 inline-grid grid-cols-2 rounded-md border border-white/15 bg-white/5 p-1 text-xs",
  "package-flight-option":
    "min-h-8 rounded-sm px-2.5 py-1.5 text-xs text-[#c2ceb4] transition-colors aria-pressed:bg-gold aria-pressed:text-[#0a150e]",
  "package-detail-button":
    "flex items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold text-[#e8e0cc] transition-colors hover:border-gold hover:text-gold hover:bg-white/10 md:text-sm",
  "custom-package":
    "mt-[30px] flex flex-col items-start gap-5 rounded-xl border border-dashed border-white/20 bg-white/5 backdrop-blur-sm p-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-7 [&>div]:flex [&>div]:items-center [&>div]:gap-4 [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#f5efe0] [&_p]:text-xs md:[&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-[#b4c2a5] max-md:[&>.text-link]:ml-[62px]",
  "custom-package-icon":
    "grid size-[45px] shrink-0 place-items-center rounded-full bg-gold/15 text-gold border border-gold/30",
  "package-dialog":
    "max-h-[92dvh] w-[calc(100%-28px)] max-w-[720px] overflow-auto rounded-2xl border border-white/15 bg-[#0b1710] p-0 text-[#f5efe0] shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md open:animate-dialog-enter",
  "package-dialog-cover":
    "relative h-[195px] md:h-60 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&>span]:absolute [&>span]:bottom-5 [&>span]:left-[30px] [&>span]:rounded-md [&>span]:bg-[#0a150e]/90 [&>span]:border [&>span]:border-gold/40 [&>span]:px-3 [&>span]:py-2 [&>span]:text-[11px] [&>span]:text-gold",
  "package-dialog-body":
    "p-6 md:p-8 [&_h2]:text-[31px] [&_h2]:leading-[1.15] [&_h2]:text-[#f5efe0] md:[&_h2]:text-[38px] [&_h3]:mb-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#f5efe0]",
  "package-dialog-intro": "mb-6 mt-4 text-[13px] leading-[1.8] text-[#b4c2a5]",
  "package-dialog-facts":
    "mb-7 flex flex-wrap items-center gap-3 border-y border-white/10 py-4 md:gap-[18px] [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:text-[11px] [&>span]:text-[#c2ceb4] [&_strong]:text-sm [&_strong]:text-[#f5efe0] md:[&_strong]:ml-auto [&_strong>small]:text-[11px] [&_strong>small]:font-normal [&_strong>small]:text-[#a8b897]",
  "package-timeline":
    'mb-6 list-none p-0 [&_li]:relative [&_li]:flex [&_li]:gap-[18px] [&_li]:pb-6 [&_li:not(:last-child)]:before:absolute [&_li:not(:last-child)]:before:bottom-0 [&_li:not(:last-child)]:before:left-4 [&_li:not(:last-child)]:before:top-[33px] [&_li:not(:last-child)]:before:border-l [&_li:not(:last-child)]:before:border-dashed [&_li:not(:last-child)]:before:border-white/20 [&_li:not(:last-child)]:before:content-[""] [&_h4]:my-2 [&_h4]:text-[13px] [&_h4]:font-semibold [&_h4]:text-[#f5efe0] [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-[#a8b897]',
  "timeline-day":
    "grid size-[33px] shrink-0 place-items-center rounded-full bg-gold/20 border border-gold/40 text-[11px] text-gold",
  "package-inclusions":
    "rounded-lg border border-white/10 bg-white/5 p-5 [&_h3]:!mb-2 [&_h3]:!text-sm [&_h3]:text-[#f5efe0] [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-[#b4c2a5]",
  "package-enquiry":
    "mt-7 border-t border-white/10 pt-6 [&_h3]:!mb-2 [&_h3]:!text-sm [&_h3]:text-[#f5efe0] [&>p]:text-xs [&>p]:text-[#a8b897] [&>.button]:w-full [&>small]:mt-3 [&>small]:block [&>small]:text-center [&>small]:text-[10px] [&>small]:leading-relaxed [&>small]:text-[#819273]",
  "enquiry-fields":
    "mb-[18px] mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr] [&_label]:min-w-0 [&_label]:text-[11px] [&_label]:font-semibold [&_label]:text-[#c2ceb4] [&_label>span]:font-normal [&_label>span]:text-[#a8b897] [&_input]:mt-2 [&_input]:block [&_input]:min-h-[43px] [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-[#f5efe0] [&_input]:p-3 [&_select]:mt-2 [&_select]:block [&_select]:min-h-[43px] [&_select]:w-full [&_select]:min-w-0 [&_select]:rounded-md [&_select]:border [&_select]:border-white/15 [&_select]:bg-[#0d1c14] [&_select]:text-[#f5efe0] [&_select]:p-3",
  "customise-toggle":
    "mb-5 flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 [&_input]:mt-0.5 [&_input]:size-[17px] [&_input]:shrink-0 [&_input]:accent-gold [&_strong]:block [&_strong]:text-xs [&_strong]:font-semibold [&_strong]:text-[#f5efe0] [&_small]:mt-1 [&_small]:block [&_small]:text-[10px] [&_small]:leading-relaxed [&_small]:text-[#a8b897]",
  "customise-request":
    "mb-5 block text-xs [&_textarea]:mt-2 [&_textarea]:block [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-white/15 [&_textarea]:bg-white/5 [&_textarea]:text-[#f5efe0] [&_textarea]:p-3 [&_textarea]:leading-relaxed",
} satisfies Record<string, string>;

/** Retain semantic hooks for scroll reveals while composing scanned Tailwind utilities. */
export const cx = (...names: (keyof typeof styles | false)[]): string =>
  names
    .filter((name): name is keyof typeof styles => name !== false)
    .map((name) => `${name} ${styles[name]}`)
    .join(" ");
