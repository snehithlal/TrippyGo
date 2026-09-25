import { useEffect } from "react";

// Content remains visible when animation or IntersectionObserver is unavailable.
const usePageMotion = () => {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const running = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (!entry.target.animate || preference.matches) return;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 700,
              easing: "cubic-bezier(.2,.65,.3,1)",
              fill: "none",
            },
          );
          running.add(animation);
          animation.onfinish = () => running.delete(animation);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        "[data-reveal], .section-heading, .about-copy, .steps > div, .social-card, .contact-panel, .service-grid > a",
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        running.forEach((animation) => animation.cancel());
        running.clear();
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      running.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, []);
};

export default usePageMotion;
