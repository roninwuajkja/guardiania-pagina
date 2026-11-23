(() => {
  "use strict";

  const doc = document.documentElement;
  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const motionEnabled = () => doc.dataset.motion !== "reduce";
  if (reduceQuery.matches) doc.dataset.motion = "reduce";

  const store = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        /* Storage can be unavailable in private contexts. */
      }
    },
    sessionSet(key, value) {
      try {
        window.sessionStorage.setItem(key, value);
      } catch (error) {
        /* Storage can be unavailable in private contexts. */
      }
    }
  };

  /* Loader: one visit per session, bounded between 900 ms and 1900 ms. */
  const loader = document.querySelector(".loader");
  let loaderStarted = performance.now();

  function finishLoader() {
    if (!loader || !doc.classList.contains("is-loading")) {
      doc.classList.add("is-ready");
      doc.classList.remove("is-loading");
      if (loader) loader.remove();
      return;
    }

    doc.classList.add("is-ready");
    loader.classList.add("is-leaving");
    store.sessionSet("ia-guardian-loader", "1");
    window.setTimeout(() => {
      if (loader.parentNode) loader.remove();
      doc.classList.remove("is-loading");
    }, 800);
  }

  if (loader && doc.classList.contains("is-loading") && motionEnabled()) {
    const minimum = new Promise((resolve) => {
      const elapsed = performance.now() - loaderStarted;
      window.setTimeout(resolve, Math.max(0, 900 - elapsed));
    });

    const loaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", resolve, { once: true });
      window.setTimeout(resolve, Math.max(0, 1900 - (performance.now() - loaderStarted)));
    });

    Promise.all([minimum, loaded]).then(finishLoader);
  } else {
    finishLoader();
  }

  /* Navigation: compact state, download pill, scroll cue. */
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");
  const tickerHeight = parseFloat(getComputedStyle(doc).getPropertyValue("--ticker-h")) || 42;
  const menuDialog = document.querySelector("#site-menu");
  const menuOpen = document.querySelector("[data-menu-open]");
  const menuClose = document.querySelector("[data-menu-close]");
  const menuFirstLink = menuDialog ? menuDialog.querySelector(".menu__item a") : null;
  let lastFocus = null;
  let menuClosing = false;

  function setScrolledState(y) {
    const threshold = window.innerHeight * 0.4;
    if (nav) {
      nav.classList.toggle("is-compact", y > threshold);
      nav.classList.toggle("is-cta-visible", y > threshold);
    }
    doc.classList.toggle("is-scrolled", y > tickerHeight);
  }

  function syncScrollLock() {
    const width = Math.max(0, window.innerWidth - doc.clientWidth);
    doc.style.setProperty("--scrollbar-w", `${width}px`);
    doc.classList.add("is-locked");
  }

  function releaseScrollLock() {
    doc.classList.remove("is-locked");
    doc.style.removeProperty("--scrollbar-w");
  }

  function openMenu() {
    if (!menuDialog || menuDialog.open) return;
    lastFocus = document.activeElement;
    menuClosing = false;
    syncScrollLock();
    menuDialog.classList.remove("is-closing", "is-open");
    menuDialog.showModal();
    if (menuOpen) menuOpen.setAttribute("aria-expanded", "true");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => menuDialog.classList.add("is-open"));
    });
    if (menuFirstLink) {
      window.requestAnimationFrame(() => menuFirstLink.focus({ preventScroll: true }));
    }
  }

  function closeMenu(immediate) {
    if (!menuDialog || !menuDialog.open || menuClosing) return;
    menuClosing = true;

    const finish = () => {
      if (menuDialog.open) menuDialog.close();
      menuDialog.classList.remove("is-open", "is-closing");
      if (menuOpen) menuOpen.setAttribute("aria-expanded", "false");
      releaseScrollLock();
      menuClosing = false;
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus({ preventScroll: true });
      }
    };

    if (immediate || !motionEnabled()) {
      finish();
      return;
    }

    menuDialog.classList.remove("is-open");
    menuDialog.classList.add("is-closing");
    window.setTimeout(finish, 430);
  }

  if (menuOpen) menuOpen.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", () => closeMenu(false));

  if (menuDialog) {
    menuDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeMenu(false);
    });

    menuDialog.addEventListener("click", (event) => {
      if (event.target === menuDialog) {
        closeMenu(false);
        return;
      }
      if (event.target.closest("a, button")) return;
      if (event.target.closest(".menu__panel--nav") && !event.target.closest(".menu__nav, .menu__foot")) {
        closeMenu(false);
      }
    });

    menuDialog.querySelectorAll(".menu__item a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = link.hash ? document.querySelector(link.hash) : null;
        if (!target) {
          closeMenu(true);
          return;
        }

        event.preventDefault();
        closeMenu(true);
        target.focus({ preventScroll: true });
        const scrollPadding = parseFloat(getComputedStyle(doc).scrollPaddingTop) || 0;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollPadding);
        window.scrollTo({ top, behavior: motionEnabled() ? "smooth" : "auto" });
      });
    });
  }

  /* Motion switch. */
  const motionToggle = document.querySelector("[data-motion-toggle]");
  const motionState = document.querySelector("[data-motion-state]");

  function syncMotionControl() {
    if (!motionToggle) return;
    const systemReduced = reduceQuery.matches;
    if (systemReduced) doc.dataset.motion = "reduce";
    const enabled = !systemReduced && motionEnabled();
    motionToggle.disabled = systemReduced;
    motionToggle.setAttribute("aria-pressed", String(enabled));
    if (motionState) {
      motionState.textContent = systemReduced
        ? "Reducido por el sistema"
        : enabled
          ? "Activado"
          : "Reducido";
    }
  }

  function setMotion(reduce, persist) {
    if (reduceQuery.matches) reduce = true;
    doc.dataset.motion = reduce ? "reduce" : "auto";
    if (persist && !reduceQuery.matches) store.set("ia-guardian-motion", reduce ? "reduce" : "full");
    syncMotionControl();

    if (reduce) {
      document.querySelectorAll(".will-reveal").forEach((element) => element.classList.add("is-in"));
      doc.classList.add("is-ready");
      if (loader && loader.parentNode) loader.remove();
      doc.classList.remove("is-loading");
    }

    syncSequenceExposure(window.innerWidth < 640 || !motionEnabled(), activeSequence);
  }

  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      if (reduceQuery.matches) return;
      setMotion(motionEnabled(), true);
    });
  }
  syncMotionControl();

  reduceQuery.addEventListener("change", () => {
    const saved = store.get("ia-guardian-motion");
    setMotion(reduceQuery.matches || saved === "reduce", false);
  });

  /* Reveal and counter observers. */
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const counters = Array.from(document.querySelectorAll("[data-count]"));

  function animateCounter(element) {
    const target = Number(element.dataset.count || 0);
    if (!Number.isFinite(target) || target === 0) {
      element.textContent = "0";
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const easeOutExpo = (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value));

    const tick = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      element.textContent = String(Math.round(target * easeOutExpo(progress)));
      if (progress < 1) window.requestAnimationFrame(tick);
      else element.textContent = String(target);
    };

    window.requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && motionEnabled()) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 0px 0px" }
    );

    revealItems.forEach((element) => {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    });

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    revealItems.forEach((element) => element.classList.add("is-in"));
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.count || "0";
    });
  }

  /* Accordion. */
  const faqItems = Array.from(document.querySelectorAll(".faq__item"));

  function setFaqState(item, open) {
    const trigger = item.querySelector(".faq__trigger");
    const panel = item.querySelector(".faq__panel");
    if (!trigger || !panel) return;
    item.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  faqItems.forEach((item) => {
    setFaqState(item, false);
    const trigger = item.querySelector(".faq__trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      faqItems.forEach((other) => setFaqState(other, false));
      if (willOpen) setFaqState(item, true);
    });
  });

  /* Scene progress, sequence crossfade and promo parallax. */
  const scenes = Array.from(document.querySelectorAll("[data-scene]"));
  const sequence = document.querySelector(".sequence");
  const sequenceFrames = sequence ? Array.from(sequence.querySelectorAll(".sequence__frame")) : [];
  const sequenceBacks = sequence ? Array.from(sequence.querySelectorAll(".sequence__back")) : [];
  const sequenceTicks = sequence ? Array.from(sequence.querySelectorAll(".sequence__rail span")) : [];
  const sequenceCurrent = sequence ? sequence.querySelector("[data-sequence-current]") : null;
  const statement = document.querySelector(".statement");
  const statementReveals = statement ? Array.from(statement.querySelectorAll("[data-reveal]")) : [];
  const promos = Array.from(document.querySelectorAll(".promo"));
  const navLinks = Array.from(document.querySelectorAll("[data-navlink]"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  let sceneMetrics = [];
  let promoMetrics = [];
  let sectionMetrics = [];
  let activeSequence = 0;
  let activeNav = "";
  let frameRequest = 0;
  let resizeTimer = 0;
  let sequenceExposure = "";

  function syncSequenceExposure(stacked, index) {
    if (!sequenceFrames.length) return;
    const mode = stacked ? "all" : String(index);
    if (mode === sequenceExposure) return;
    sequenceExposure = mode;

    sequenceFrames.forEach((frame, i) => {
      const hidden = !stacked && i !== index;
      if (hidden) {
        frame.setAttribute("aria-hidden", "true");
        frame.setAttribute("inert", "");
      } else {
        frame.removeAttribute("aria-hidden");
        frame.removeAttribute("inert");
      }
    });
  }

  function measure() {
    const y = window.scrollY;
    sceneMetrics = scenes.map((scene) => {
      const rect = scene.getBoundingClientRect();
      return { el: scene, top: rect.top + y, height: rect.height };
    });
    promoMetrics = promos.map((promo) => {
      const rect = promo.getBoundingClientRect();
      return { el: promo, top: rect.top + y, height: rect.height };
    });
    sectionMetrics = sections.map((section) => {
      const rect = section.getBoundingClientRect();
      return { id: section.id, top: rect.top + y };
    });
  }

  function updateSequence(progress) {
    if (!sequence || !sequenceFrames.length) return;
    const stacked = window.innerWidth < 640 || !motionEnabled();
    if (stacked) {
      syncSequenceExposure(true, activeSequence);
      return;
    }

    const index = clamp(Math.floor(progress * 4), 0, 3);
    if (index !== activeSequence) {
      activeSequence = index;
      sequenceFrames.forEach((frame, i) => frame.classList.toggle("is-active", i === index));
      sequenceBacks.forEach((back, i) => back.classList.toggle("is-active", i === index));
      sequenceTicks.forEach((tick, i) => tick.classList.toggle("is-active", i === index));
      if (sequenceCurrent) sequenceCurrent.textContent = String(index + 1).padStart(2, "0");
    }
    syncSequenceExposure(false, index);
  }

  function updateActiveNav(y) {
    if (!sectionMetrics.length || !navLinks.length) return;
    const marker = y + window.innerHeight * 0.42;
    let current = sectionMetrics[0].id;
    sectionMetrics.forEach((section) => {
      if (section.top <= marker) current = section.id;
    });

    const alias = { idea: "inicio", panel: "producto" };
    const target = alias[current] || current;
    if (target === activeNav) return;
    activeNav = target;

    navLinks.forEach((link) => {
      const isCurrent = link.hash === `#${target}`;
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function update() {
    const y = window.scrollY;
    const viewport = window.innerHeight;

    setScrolledState(y);

    if (hero) {
      hero.style.setProperty("--hp", clamp(y / (viewport * 0.9), 0, 1).toFixed(3));
    }

    sceneMetrics.forEach((metric) => {
      const travel = Math.max(1, metric.height - viewport);
      const progress = clamp((y - metric.top) / travel, 0, 1);
      metric.el.style.setProperty("--p", progress.toFixed(3));
      if (metric.el === sequence) updateSequence(progress);
      if (metric.el === statement && progress > 0.05) {
        statementReveals.forEach((element) => element.classList.add("is-in"));
      }
    });

    if (window.innerWidth >= 1024 && motionEnabled()) {
      promoMetrics.forEach((metric) => {
        const total = metric.height + viewport;
        const progress = clamp((y + viewport - metric.top) / total, 0, 1);
        const offset = (0.5 - progress) * 20;
        metric.el.style.setProperty("--py", `${offset.toFixed(2)}px`);
      });
    }

    updateActiveNav(y);
    frameRequest = 0;
  }

  function requestUpdate() {
    if (frameRequest) return;
    frameRequest = window.requestAnimationFrame(update);
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      requestUpdate();
    }, 150);
  }

  if (scenes.length || promos.length) {
    measure();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", () => {
      measure();
      requestUpdate();
    }, { once: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure();
        requestUpdate();
      });
    }
    requestUpdate();
  } else {
    setScrolledState(window.scrollY);
  }

  /* Magnetic buttons, desktop pointer only. */
  if (finePointer.matches && motionEnabled()) {
    document.querySelectorAll(".btn--magnetic").forEach((button) => {
      const reset = () => {
        button.style.removeProperty("--mx");
        button.style.removeProperty("--my");
      };

      button.addEventListener("pointermove", (event) => {
        if (!motionEnabled()) return;
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
        button.style.setProperty("--mx", `${clamp(x, -5, 5).toFixed(2)}px`);
        button.style.setProperty("--my", `${clamp(y, -5, 5).toFixed(2)}px`);
      });

      button.addEventListener("pointerleave", reset);
      button.addEventListener("blur", reset);
    });
  }

  doc.classList.add("js-ok");
})();
