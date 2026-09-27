(() => {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || typeof window.gtag !== "function") return;

    const href = link.getAttribute("href") || "";
    const absoluteUrl = link.href || href;
    const linkText = (link.textContent || "").trim().slice(0, 120);
    let linkType = "internal";
    let contactType = null;

    if (href.startsWith("mailto:")) {
      contactType = "email";
    } else if (href.startsWith("tel:")) {
      contactType = "phone";
    } else if (/^https?:\/\/(www\.)?linkedin\.com\//i.test(absoluteUrl)) {
      contactType = "linkedin";
    } else if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(absoluteUrl)) {
      contactType = "telegram";
    }

    if (contactType) {
      window.gtag("event", "contact_click", {
        contact_type: contactType,
        link_url: absoluteUrl,
        link_text: linkText
      });
      return;
    }

    if (href.startsWith("#")) {
      linkType = "anchor";
    } else {
      try {
        const url = new URL(absoluteUrl, window.location.href);
        if (url.origin !== window.location.origin) linkType = "outbound";
      } catch (_) {}
    }

    window.gtag("event", "portfolio_link_click", {
      link_url: absoluteUrl,
      link_text: linkText,
      link_type: linkType
    });
  });
})();