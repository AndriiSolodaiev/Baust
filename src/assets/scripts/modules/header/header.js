
import gsap from 'gsap';
import { initSmoothScrolling } from '../scroll/leniscroll';
import device from "current-device"
initSmoothScrolling();
const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {

  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

document.body.addEventListener('click', function(evt) {
  
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');
  
  const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest("[data-btn-up]");

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu =document.querySelector('[data-menu]')
  const menu =document.querySelector('[data-menu]')
 if (btnMenuTarget) {
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
      menu.classList.remove('hidden');
      header.classList.add('menu-is-open');
      window.dispatchEvent(new Event('stop-scroll'));
      animateMenuIn(menu);
    } else {
      animateMenuOut(menu, () => {
        window.dispatchEvent(new Event('start-scroll'));
        menu.classList.add('hidden');
        header.classList.remove('menu-is-open');
      });
    }

    return;
  }
  if(btnUp){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    return overflow.classList.add('hidden');
  }
  if ( evt.target === overflow) {
    return overflow.classList.add('hidden');
  }
});


function animateMenuIn(menu) {
  const items = menu.querySelectorAll('.menu-item');
  const socials = menu.querySelectorAll('.socials-list__item ');
  

  const container = menu.querySelector('.menu-container');

  // Початкові стани
  gsap.set([items, socials], { opacity: 0, y: 30 });
  gsap.set(menu, { opacity: 0 });
  gsap.set(container, { scale: 0.95, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(menu, { opacity: 1, duration: 0.2 })
    .to(container, { scale: 1, opacity: 1, duration: 0.3 }, "<")
    .to(items, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 }, "-=0.2")
    .to(socials, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, "-=0.3")
    
}

function animateMenuOut(menu, onComplete) {
  const items = menu.querySelectorAll('.menu-item');
  const socials = menu.querySelectorAll('.social-item');
  
  const container = menu.querySelector('.menu-container');

  const tl = gsap.timeline({
    defaults: { ease: "power3.in" },
    onComplete
  });

  tl.to([...socials, ...items], { opacity: 0, y: 30, stagger: 0.04, duration: 0.2 })
    .to(container, { scale: 0.95, opacity: 0, duration: 0.2 }, "-=0.2")
    .to(menu, { opacity: 0, duration: 0.2 }, "-=0.1");
}


const inputs = document.querySelectorAll('.form-field-input')
  
  if(inputs.length) {
  inputs.forEach(field => {
   
  const input = field.querySelector('.form-field__input');
 if (!input) {
      console.warn('Поле не містить <input>', field);
      return;
    }
  input.addEventListener('focus', () => {
    field.classList.add('is-focused');
  });

  input.addEventListener('blur', () => {
    // прибирати фокус тільки якщо поле порожнє
    if (!input.value) {
      field.classList.remove('is-focused');
    }
  });
});}
document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll('.iti__country-list').forEach(el => {
  el.setAttribute('data-lenis-prevent', '')
})})