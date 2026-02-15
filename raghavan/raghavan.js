
// --- 1. SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// --- 2. GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
const tl = gsap.timeline();
tl.to(".hero h1", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 })
  .to(".hero p", { opacity: 1, duration: 1 }, "-=1")
  .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");

// Horizontal Scroll
let sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-wrapper",
        pin: true,
        scrub: 1,
        end: "+=3000", 
    }
});

// Timeline Fade In
gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%" },
        y: 50, opacity: 0, duration: 1, ease: "power2.out"
    });
});

// --- 3. CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

const hoverables = document.querySelectorAll('[data-hover]');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});
