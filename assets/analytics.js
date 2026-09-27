(() => {
  const MEASUREMENT_ID = "G-SE49MM3P37";

  if (!/^G-[A-Z0-9]+$/i.test(MEASUREMENT_ID) || MEASUREMENT_ID === "G-SE49MM3P37") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(tag);

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

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
