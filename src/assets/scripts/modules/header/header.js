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
      menu.classList.toggle('hidden');
      header.classList.toggle('menu-is-open');
      return
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


