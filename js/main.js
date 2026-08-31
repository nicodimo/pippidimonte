/* Pippi Dimonte — interazioni del sito */
(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
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
  const yEl = document.querySelector("[data-year]");
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---- Reveal allo scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Form contatti ----
     Invio via Formspree senza ricaricare la pagina.
     Imposta l'endpoint reale nell'attributo action del <form> (vedi README). */
  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    const btn = form.querySelector("button[type='submit']");
    const action = form.getAttribute("action") || "";
    const configured = action && action.indexOf("YOUR_FORM_ID") === -1;

    form.addEventListener("submit", async function (ev) {
      // Se l'endpoint non è ancora configurato, lascia il fallback mailto
      if (!configured) {
        ev.preventDefault();
        setStatus("Modulo non ancora configurato. Scrivi pure a pippidimonte@email.it.", "err");
        return;
      }
      ev.preventDefault();
      setStatus("Invio in corso…", "");
      if (btn) btn.disabled = true;

      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          form.reset();
          setStatus("Grazie! Il messaggio è stato inviato. Ti risponderò a breve.", "ok");
        } else {
          const data = await res.json().catch(function () { return {}; });
          const msg = (data.errors && data.errors.map(function (e) { return e.message; }).join(", ")) ||
            "Qualcosa è andato storto. Riprova tra poco.";
          setStatus(msg, "err");
        }
      } catch (e) {
        setStatus("Connessione non riuscita. Controlla la rete e riprova.", "err");
      } finally {
        if (btn) btn.disabled = false;
      }
    });

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = "form-status" + (kind ? " " + kind : "");
    }
  }
})();
