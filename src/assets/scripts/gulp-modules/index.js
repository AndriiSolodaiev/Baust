import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';



gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);





const dots = document.querySelectorAll('path[data-anim-map-dots]');
const operatingItems = document.querySelectorAll('.operating__item');

const totalDotsDuration = 1.5;
const dotStaggerDelay = totalDotsDuration / dots.length;

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".svg-map-wrap",
    start: "top 85%",
    once: true,
  }
});

// 1. Поява .svg-map-wrap
tl.from(".svg-map-wrap", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  ease: "power2.out",
}).fromTo(".operating.first .section-title", {
  y: 80,
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  duration: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
 y:0}, "<")

// 2. Поява точок на мапі (по черзі)
.addLabel("dotsStart")
.fromTo(dots, 
  {
    opacity: 0.2,
    scale: 0.8,
    transformOrigin: "center",
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
    stagger: {
      each: dotStaggerDelay,
    }
  },
  "<" // легка затримка після появи svg
)

// 3. Поява .operating__item (по черзі)
.from(operatingItems, {
  opacity: 0,
  y: 30,
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.15,
}, "<+=0.01");




const tlFiller = gsap.timeline({
  scrollTrigger: {
    trigger: ".filler",
    start: "30% center",
    end: "bottom center",
    
  }
});

// Плавне розсунення псевдоелементів
tlFiller
.fromTo(".filler .video-frame video",{
  scale: 1.4,
  ease: "power2.out",
  
}, {
  duration:1,
  scale: 1,
  ease: "power2.out"
})
.fromTo(".filler .section-descr",{
  opacity: 0,
  yPercent:30,
  ease: "power2.out",
  duration:1,
}, {
  opacity: 1,
  yPercent:0,
  scale: 1,
  ease: "power2.out"
}, "<")
.fromTo(".filler .section-title",{
  ease: "power2.out",
  
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ease: "power2.out",
  duration:1,
}, "<");

const swiperProcess = new Swiper('.swiper-process', {
    speed: 600,
    grabCursor: true,
    spaceBetween: 20,
    loop: false,
    
    slidesPerView: 1.2,
    breakpoints: {
      768: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
       1366: {
        slidesPerView: 4,
        spaceBetween: 20,
        
      }
    }
   
  });

  const slides = document.querySelectorAll(".swiper-process .swiper-slide");

slides.forEach((slide, index) => {
  const img = slide.querySelector(".process__img-wrap img");

  const scaleFrom = index % 2 === 1 ? 1.8 : 1.2;

  const tlProcess = gsap.timeline({
    scrollTrigger: {
      trigger: ".swiper-process",
      start: "top bottom", // коли верх слайду входить в нижню частину в'юпорту
      end: "bottom center",
    }
  });

  // Картка
  tlProcess
  .fromTo(".process .section-title", {
  y: 80,
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  duration: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
 y:0}).from(slide, {
    y: 100,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "<").fromTo(img, 
    {
      scale: scaleFrom,
    },
    {
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "<")
    ;
});

gsap.fromTo(".hero .section-title, .hero .hero-slogan, .hero .section-descr, .hero .hero-bottom-block", {
  y: 80,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
 y:0})
 
// 2. Hero піниться (але друга секція налізає)
window.addEventListener("load", () => {
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    // end: "+=100%",
    pin: true,
    pinSpacing: false
  });
});

// 3. Анімації другої секції
gsap.timeline({
  scrollTrigger: {
    trigger: ".advantages",
    start: "top 80%",
    end: "center 20%",
    // scrub: true
  }
})
.from(".advantages-title", {
  xPercent: -50,
  
  duration: 2,
  ease: "power3.out"
})
.from(".advantages__list", {
  yPercent: 50,
  opacity: 0,
  duration: 2,
  ease: "power3.out"
}, "<")
.fromTo(".advantages__img-wrap img",
  { scale: 1.3, opacity: 0 },
  { scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
  "<+=0.1"
);

// ScrollTrigger.create({
//   trigger: ".filler",
//   start: "top top",
//   end: "+=100%",
//   pin: true,
//   pinSpacing: false
// });

// === story ===
// Анімації для story
gsap.timeline({
  scrollTrigger: {
    trigger: ".story",
    start: "top 80%",
    end: "center 20%",
    // scrub: true
  }
})
.from(".story-title", {
    xPercent: -50,
  duration: 2,
  ease: "power3.out"
})
.from(".story .section-descr-wrap", {
  yPercent: 50,
  opacity: 0,
  duration: 2,
  ease: "power3.out"
}, "<")
.fromTo(".story .advantages__img-wrap img",
  { scale: 1.3, opacity: 0 },
  { scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
  "<+=0.1"
);

gsap.timeline({
  scrollTrigger: {
    trigger: ".project-section",
    start: "top 60%",
    end: "center 20%",
    // scrub: true
  }
})
.fromTo(".project-section .section-title", {
  y: 80,
 
  
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  duration: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
 y:0})
 .fromTo(".project-card",
  {
  
  ease: "power3.out",
 clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)"
}, {
  duration: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
 }, "<"
  ).fromTo(".project-card img",
  {
  
  ease: "power3.out",
 scale: 1.5,
}, {
  stagger:0.2,
  duration: 1,
  scale: 1,
 }, "<"
  )