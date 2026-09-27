(() => {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || typeof window.gtag !== "function") return;

    const href = link.getAttribute("href") || "";
    const absoluteUrl = link.href || href;
    let linkType = "internal";

    if (href.startsWith("mailto:")) linkType = "email";
    else if (href.startsWith("tel:")) linkType = "phone";
    else if (href.startsWith("#")) linkType = "anchor";
    else {
      try {
        const url = new URL(absoluteUrl, window.location.href);
        if (url.origin !== window.location.origin) linkType = "outbound";
      } catch (_) {}
    }

    window.gtag("event", "portfolio_link_click", {
      link_url: absoluteUrl,
      link_text: (link.textContent || "").trim().slice(0, 120),
      link_type: linkType
    });
  });
})();