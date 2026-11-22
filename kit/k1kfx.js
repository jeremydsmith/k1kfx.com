/* ============================================================================
   K1KFX shared kit: links, top bar and footer for every K1KFX site.

   THE LINKS LIVE HERE AND ONLY HERE. When a site moves (for example parks.k1kfx.com
   becomes pota.k1kfx.com), change it once below and every page follows.

   On a page:
     <header data-k1kfx-nav data-current="pota"></header>   (optional top bar)
     <a data-k1kfx-link="pota" href="https://...">...</a>   (href kept in sync)
     <footer data-k1kfx-footer></footer>
   ========================================================================== */
(function () {
  var K = {
    links: {
      home: { label: "K1KFX", url: "https://k1kfx.com/" },
      // Interim addresses for sats and hunt. Final targets: sats.k1kfx.com, hunt.k1kfx.com
      pota: { label: "Parks on the Air", url: "https://pota.k1kfx.com/" },
      parks: { label: "Rare Parks Finder", url: "https://pota.k1kfx.com/parks/" },
      sats: { label: "Satellites", url: "https://k1kfx.com/satellites/" },
      hunt: { label: "Fox Hunting", url: "https://k1kfx.com/fox/" },
      qrz:  { label: "QRZ", url: "https://www.qrz.com/db/K1KFX" },
      sc:   { label: "Smith Counseling", url: "https://smithcounseling.org/" },
      mrc:  { label: "Marriage Recovery Course", url: "https://www.marriagerecoverycourse.com/" }
    }
  };
  window.K1KFX = K;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function a(key, current) {
    var l = K.links[key];
    if (!l.url) return '<span class="todo">' + esc(l.label) + "</span>";
    return '<a href="' + esc(l.url) + '"' + (key === current ? ' aria-current="page"' : "") + ">" + esc(l.label) + "</a>";
  }
  function li(keys, current) {
    return keys.map(function (k) { return "<li>" + a(k, current) + "</li>"; }).join("");
  }

  function render() {
    document.querySelectorAll("[data-k1kfx-link]").forEach(function (el) {
      var l = K.links[el.getAttribute("data-k1kfx-link")];
      if (l && l.url) el.href = l.url;
    });

    document.querySelectorAll("header[data-k1kfx-nav]").forEach(function (el) {
      var cur = el.getAttribute("data-current") || "";
      el.className = "k-nav";
      el.innerHTML =
        '<div class="k-wrap">' +
        '<a class="k-nav-home" href="' + esc(K.links.home.url) + '">K1KFX</a>' +
        '<nav aria-label="K1KFX sites"><ul>' + li(["pota", "sats", "hunt"], cur) + "</ul></nav>" +
        "</div>";
    });

    document.querySelectorAll("footer[data-k1kfx-footer]").forEach(function (el) {
      var extra = el.innerHTML.trim(); // a page may put its own credits inside the footer tag
      el.className = "k-footer";
      el.innerHTML =
        '<div class="k-wrap">' +
        "<div><h4>K1KFX</h4><ul>" + li(["home", "qrz"]) + "<li>Lincoln, Nebraska</li></ul></div>" +
        "<div><h4>On the air</h4><ul>" + li(["pota", "sats", "hunt"]) + "</ul></div>" +
        "<div><h4>At work</h4><ul>" + li(["sc", "mrc"]) + "</ul></div>" +
        (extra ? '<div class="k-extra">' + extra + "</div>" : "") +
        "</div>";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
