import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';


import '../modules/helpers/imgParallax';


import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
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
})

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
  "dotsStart+=0.1" // легка затримка після появи svg
)

// 3. Поява .operating__item (по черзі)
.from(operatingItems, {
  opacity: 0,
  y: 30,
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.15,
}, "dotsStart+=0.1");




const beforeRule = CSSRulePlugin.getRule(".filler::before");
const afterRule = CSSRulePlugin.getRule(".filler::after");

const tlFiller = gsap.timeline({
  scrollTrigger: {
    trigger: ".filler",
    start: "30% center",
    end: "bottom center",
    
  }
});

// Плавне розсунення псевдоелементів
tlFiller.to(beforeRule, {
  height: "0%",
  ease: "power2.out",
  duration:2
}, 0)
.to(afterRule, {
  height: "0%",
  ease: "power2.out"
  ,duration:2
}, "<")
.fromTo(".filler .video-frame",{
  scale: 1.2,
  ease: "power2.out",
  duration:2,
}, {
  scale: 1,
  ease: "power2.out"
}, "<")
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
}, "<=0.2");

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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".swiper-process",
      start: "top 80%", // коли верх слайду входить в нижню частину в'юпорту
    }
  });

  // Картка
  tl.from(slide, {
    y: 100,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  }).fromTo(img, 
    {
      scale: scaleFrom,
    },
    {
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    }, 0);
});