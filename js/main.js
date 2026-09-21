/* Pippi Dimonte — interazioni del sito */
(function () {
  "use strict";

  var lang = (document.documentElement.lang || "it").toLowerCase().indexOf("en") === 0 ? "en" : "it";
  var T = {
    it: {
      notConfigured: "Modulo non ancora configurato. Usa l'indirizzo email qui sotto.",
      sending: "Invio in corso…",
      ok: "Grazie! Il messaggio è stato inviato. Ti risponderò a breve.",
      errGeneric: "Qualcosa è andato storto. Riprova tra poco.",
      errNetwork: "Connessione non riuscita. Controlla la rete e riprova."
    },
    en: {
      notConfigured: "Form not set up yet. Please use the email address below.",
      sending: "Sending…",
      ok: "Thank you! Your message has been sent. I'll get back to you soon.",
      errGeneric: "Something went wrong. Please try again shortly.",
      errNetwork: "Connection failed. Check your network and try again."
    }
  }[lang];

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Anno corrente nel footer ---- */
  var yEl = document.querySelector("[data-year]");
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---- Reveal allo scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Form contatti (Formspree) ---- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector("button[type='submit']");
    var action = form.getAttribute("action") || "";
    var configured = action && action.indexOf("YOUR_FORM_ID") === -1;

    form.addEventListener("submit", function (ev) {
      if (!configured) { ev.preventDefault(); setStatus(T.notConfigured, "err"); return; }
      ev.preventDefault();
      setStatus(T.sending, "");
      if (btn) btn.disabled = true;
      fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) { form.reset(); setStatus(T.ok, "ok"); }
          else { return res.json().then(function (d) {
            var msg = (d.errors && d.errors.map(function (e) { return e.message; }).join(", ")) || T.errGeneric;
            setStatus(msg, "err");
          }).catch(function(){ setStatus(T.errGeneric, "err"); }); }
        })
        .catch(function () { setStatus(T.errNetwork, "err"); })
        .then(function () { if (btn) btn.disabled = false; });
    });

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = "form-status" + (kind ? " " + kind : "");
    }
  }
})();
