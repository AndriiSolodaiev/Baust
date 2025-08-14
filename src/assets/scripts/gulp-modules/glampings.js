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