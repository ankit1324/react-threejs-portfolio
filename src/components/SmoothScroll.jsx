import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll behavior
    const handleClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      
      const offsetTop = element.offsetTop - 100; // Account for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Update URL without jumping
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default SmoothScroll;
