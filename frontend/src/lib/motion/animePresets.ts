"use client";

let anime: any = null;

if (typeof window !== "undefined") {
  try {
    const mod = require("animejs");
    anime = mod.default || mod;
  } catch (e) {
    console.warn("Anime.js runtime initialization deferred", e);
  }
}

/**
 * LEARNOS X Centralized Motion Engine (Anime.js Presets)
 * Safe client-side animation helpers with SSR fallback guarantees.
 */

// 1. Counter Rollup Animation (0 -> Target %)
export function animateCounter(
  targetElement: HTMLElement | string,
  startVal: number,
  endVal: number,
  duration = 800,
  onUpdate?: (val: number) => void
) {
  if (typeof window === "undefined" || !anime) {
    if (onUpdate) onUpdate(endVal);
    return;
  }

  const obj = { val: startVal };

  try {
    return anime({
      targets: obj,
      val: endVal,
      round: 1,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
      duration: duration,
      update: () => {
        if (onUpdate) onUpdate(obj.val);
      }
    });
  } catch (e) {
    if (onUpdate) onUpdate(endVal);
  }
}

// 2. SVG Ring Path Drawing Animation
export function animateSvgRing(
  pathElement: SVGPathElement | SVGCircleElement | string,
  targetOffset: number,
  duration = 1000
) {
  if (typeof window === "undefined" || !anime) return;

  try {
    return anime({
      targets: pathElement,
      strokeDashoffset: [anime.setDashoffset ? anime.setDashoffset : 440, targetOffset],
      easing: "cubicBezier(0.25, 1, 0.5, 1)",
      duration: duration
    });
  } catch (e) {
    console.warn("SVG Ring animation failed", e);
  }
}

// 3. Staggered Entrance Reveal for Cards & List Items
export function animateStaggerFadeUp(
  elements: HTMLElement[] | NodeListOf<HTMLElement> | string,
  delay = 50,
  duration = 350
) {
  if (typeof window === "undefined" || !anime) return;

  try {
    return anime({
      targets: elements,
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger ? anime.stagger(delay) : delay,
      easing: "easeOutQuad",
      duration: duration
    });
  } catch (e) {
    console.warn("Stagger animation failed", e);
  }
}

// 4. Slide Drawer Animation (Left or Right)
export function animateDrawerSlide(
  drawerElement: HTMLElement | string,
  direction: "left" | "right" = "right",
  open = true
) {
  if (typeof window === "undefined" || !anime) return;

  const fromX = direction === "right" ? "100%" : "-100%";
  const toX = "0%";

  try {
    return anime({
      targets: drawerElement,
      translateX: open ? [fromX, toX] : [toX, fromX],
      opacity: open ? [0, 1] : [1, 0],
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
      duration: open ? 320 : 250
    });
  } catch (e) {
    console.warn("Drawer slide animation failed", e);
  }
}

// 5. Domain Switching Transition (Contract -> Switch -> Morph)
export function animateDomainTransition(
  containerElement: HTMLElement | string,
  onMidpoint?: () => void
) {
  if (typeof window === "undefined" || !anime) {
    if (onMidpoint) onMidpoint();
    return;
  }

  try {
    const timeline = anime.timeline({
      easing: "easeInOutQuad"
    });

    timeline
      .add({
        targets: containerElement,
        scale: [1, 0.97],
        opacity: [1, 0.4],
        duration: 150,
        complete: () => {
          if (onMidpoint) onMidpoint();
        }
      })
      .add({
        targets: containerElement,
        scale: [0.97, 1],
        opacity: [0.4, 1],
        duration: 250,
        easing: "cubicBezier(0.16, 1, 0.3, 1)"
      });

    return timeline;
  } catch (e) {
    if (onMidpoint) onMidpoint();
  }
}

// 6. Pulse Glow Animation for High-Impact Nodes & Status Indicators
export function animatePulseGlow(
  element: HTMLElement | SVGElement | string
) {
  if (typeof window === "undefined" || !anime) return;

  try {
    return anime({
      targets: element,
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      easing: "easeInOutSine",
      duration: 2000,
      loop: true
    });
  } catch (e) {
    console.warn("Pulse glow animation failed", e);
  }
}
