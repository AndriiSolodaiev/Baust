
import Swiper, { Autoplay, EffectFade, Navigation, Grid } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';



gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

const swiperProcess = new Swiper('.swiper-process', {
  modules: [Grid],
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
        grid: {
          rows: 2,
          fill: "row"
        },
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



const currentEl = document.querySelector('.current-slides-number');
const totalEl = document.querySelector('.total-slides-number');
const swipergallery = new Swiper('.swiper-gallery', {
  modules: [Navigation],
  speed: 700,
  slidesPerView: 1,
  // spaceBetween: 16,
    loop: false,
    navigation: {
      nextEl: '[data-gallery-next-btn]',
      prevEl: '[data-gallery-prev-btn]',
    },
    on: {
    init: function () {
      // Встановлюємо загальну кількість слайдів
      totalEl.textContent = String(this.slides.length).padStart(2, '0');
      // Поточний слайд
      currentEl.textContent = String(this.realIndex + 1).padStart(2, '0');
    },
    slideChange: function () {
      animateSlideNumber(this.realIndex + 1);
    }
  }
    
    // breakpoints: {
    //   768: {

    //     slidesPerView: 1.8,
    //     spaceBetween: 20,
    //   },
    //    1366: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
        
    //   }
    // }
});

function animateSlideNumber(newIndex) {
  const oldNumber = currentEl.textContent;
  
  // Анімуємо старий номер вгору та прозорість
  gsap.to(currentEl, {
    y: -20,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      // Змінюємо текст
      currentEl.textContent = String(newIndex).padStart(2, '0');
      // Переміщаємо вниз і знову показуємо
      gsap.fromTo(currentEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 0.3, ease: 'power2.out' }
      );
    }
  });
}


const swiperCases = new Swiper('.swiper-cases', {
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

  const slidesCases = document.querySelectorAll(".swiper-cases .swiper-slide");

slidesCases.forEach((slide, index) => {
  const img = slide.querySelector(".process__img-wrap img");

  const scaleFrom = index % 2 === 1 ? 1.8 : 1.2;

  const tlCases = gsap.timeline({
    scrollTrigger: {
      trigger: ".swiper-cases",
      start: "top 80%", // коли верх слайду входить в нижню частину в'юпорту
    }
  });

  // Картка
  tlCases.fromTo(slidesCases, {
    y: 100,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  }, {
    opacity: 1,
    y: 0,
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

const beforeRule = CSSRulePlugin.getRule(".filler::before");
const afterRule = CSSRulePlugin.getRule(".filler::after");
console.log(afterRule)
const tlFiller = gsap.timeline({
  scrollTrigger: {
    trigger: ".filler.relax",
    start: "top center",
    end: "bottom center",
    
  }
});

// Плавне розсунення псевдоелементів
tlFiller.to(beforeRule, {
  height: "0%",
  ease: "power2.out",
  duration:1.5
}, 0)
.to(afterRule, {
  height: "0%",
  ease: "power2.out"
  ,duration: 1.5
}, "<")
.fromTo(".filler.relax .video-frame",{
  scale: 1.2,
  ease: "power2.out",
  duration:1.5,
}, {
  scale: 1,
  ease: "power2.out"
}, "<")
.fromTo(".filler.relax .section-descr",{
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

const iframePopUp = document.querySelector('[data-iframe-modal]');
const iframeOpen = document.querySelector('[data-iframe-open]');
const iframeClose = document.querySelector('[data-iframe-close]');
const iframeWindow = document.querySelector('.iframe-window');

if (iframeOpen) {
  iframeOpen.addEventListener('click', function() {
    window.dispatchEvent(new Event('stop-scroll'));
    iframePopUp.classList.add('oppened');
    iframeWindow.src = iframeOpen.dataset.iframeSrc;
  });
}

if (iframeClose) {
  iframeClose.addEventListener('click', function() {
    window.dispatchEvent(new Event('start-scroll'));

    iframePopUp.classList.remove('oppened');
    iframeWindow.src = '';
  });
}