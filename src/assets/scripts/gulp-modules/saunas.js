import Swiper, { Autoplay, EffectFade,Navigation } from 'swiper';

import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';





gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);



// 1) Ініціалізація Swiper (перед GSAP-логікою!)
const swiper = new Swiper('.swiper-hero', {
  modules: [EffectFade],
  speed: 700,
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: false, 
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  // на десктопі зазвичай блокую
  // опції за потреби...
});

// Підрахунок слайдів
const slidesCount = swiper.slides.length;

// Заповнюємо total
const totalEl = document.querySelector('.total-slides-number');
if (totalEl) totalEl.textContent = String(slidesCount).padStart(2, '0');

// DOM-елементи, які будемо оновлювати
const titleEl = document.querySelector('.section-title');
const descrValues = Array.from(document.querySelectorAll('.glampings-descr__value')); // [from, area]
const currentEl = document.querySelector('.current-slides-number');

// guard
if (!titleEl || descrValues.length < 2 || !currentEl) {
  console.warn('Cannot find one of the content elements (.section-title, .glampings-descr__value, .current-slides-number)');
}

// змінна стану
let currentIndex = 0;
let contentTween = null;

// функція оновлення контенту (з анімацією)
function updateContent(index) {
  if (index === currentIndex) return;
  currentIndex = index;

  const slide = swiper.slides[index];
  const data = slide ? slide.dataset : {};
  const newTitle = data.title || slide.querySelector('img')?.alt || titleEl.textContent;
  const newFrom = data.from || descrValues[0].textContent;
  const newArea = data.area || descrValues[1].textContent;
const newLink = data.link || null;
  // вбиваємо попередні tween'и
  if (contentTween) contentTween.kill();

  // елементи для анімації
  const group = [titleEl, ...descrValues, currentEl].filter(Boolean);

  contentTween = gsap.timeline({
    defaults: { ease: 'power2.inOut' }
  });

  // fade out / вниз
  contentTween.fromTo(group, 
    { y: 0, opacity: 1 }, 
    { y: -16, opacity: 0, duration: 0.5}
  );

  // змінюємо тексти миттєво після fade out
  contentTween.call(() => {
    titleEl.textContent = newTitle;
    descrValues[0].textContent = newFrom;
    descrValues[1].textContent = newArea;
    currentEl.textContent = String(index + 1).padStart(2, '0');
    if (newLink !== null) {
      const btn = document.querySelector('[data-house-link]');
      if (btn) btn.href = newLink;
    }
  });

  // fade in / знизу вгору
  contentTween.fromTo(group, 
    { y: 16, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.34, stagger: 0.04 }
  );
}

// 2) GSAP ScrollTrigger: тільки на десктоп (або коли потрібно)

  const startPos = 'top';

  gsap.timeline({
    scrollTrigger: {
      trigger: '.hero.glampings',
      start: startPos,
      // end динамічно підраховується під час refresh, щоб врахувати розміри вікна
      end: () => {
        // скільки "висот вьюорта" використовуємо для прокрутки між слайдами
        const intervals = Math.max(1, slidesCount - 1);
        return `+=${intervals * window.innerHeight}`;
      },
      scrub: true,
      pin: true, // фіксуємо секцію під час анімації
      // markers: true, // розкоментуй для дебагу
      onUpdate(self) {
        // 1) Синхронізуємо Swiper прогрес (без читання swiper.progress)
        swiper.setProgress(self.progress);
        
        
        // 2) Обчислюємо індекс на основі прогресу
        const idx = Math.round(self.progress * (slidesCount - 1));
        if (idx !== currentIndex) {
          updateContent(idx);
        }
      },
    }
  });


// Перерендер при ресайзі — оновлюємо ScrollTrigger
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});


gsap.timeline({
  scrollTrigger: {
    trigger: ".discover",
    start: "top 80%",
    end: "center 20%",
    // scrub: true
  }
})
.from(".discover-title", {
  xPercent: -50,
  
  duration: 1.5,
  ease: "power3.out"
})
.fromTo(".swiper-discover .card ",
  { y:80, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", stagger: "0.2" },
  "<"
)
.fromTo(".swiper-discover .card img",
  { scale: 1.3, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", stagger: "0.2" },
  "<+=0.1"
);


const swiperDiscover = new Swiper('.swiper-discover', {
  modules: [Navigation],
  speed: 700,
  slidesPerView: 1.15,
  spaceBetween: 16,
    loop: false,
    navigation: {
      nextEl: '[data-discover-next-btn]',
      prevEl: '[data-discover-prev-btn]',
    },
    
    breakpoints: {
      768: {

        slidesPerView: 1.8,
        spaceBetween: 20,
      },
       1366: {
        slidesPerView: 3,
        spaceBetween: 20,
        
      }
    }
});

// ScrollTrigger.create({
//   trigger: ".filler",
//   start: "top top",
//   end: "+=100%",
//   pin: true,
//   pinSpacing: false
// });
const tlFiller = gsap.timeline({
  scrollTrigger: {
    trigger: ".filler",
    start: "30% center",
    end: "bottom center",
    
  }
});


tlFiller
.fromTo(".filler .video-frame video",{
  scale: 1.4,
  ease: "power2.out",
  
}, {
  duration:2,
  scale: 1,
  ease: "power2.out"
})
.fromTo(".filler .hero-bottom-block",{
  opacity: 0,
  yPercent:30,
  ease: "power2.out",
  
}, {
  opacity: 1,
  yPercent:0,
  duration:1.2,
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
      start: "top 80%", // коли верх слайду входить в нижню частину в'юпорту
    }
  });

  // Картка
  tlProcess.fromTo(".process .section-title", {
  y: 80,
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  duration: 1.5,
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
      duration: 1.2,
      ease: "power3.out"
    }, 0);
});

gsap.fromTo(".hero .section-title, .hero .hero-slogan, .hero .section-descr, .hero .hero-bottom-block, .hero .glampings-descr-wrap", {
  y: 80,
  stagger: 0.2,
  
  ease: "power3.out",
 clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
}, {
  duration: 1.2,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 120%, 0% 120%)",
 y:0, 
 })