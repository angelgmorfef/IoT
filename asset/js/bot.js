
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('back-to-top');
    const header = document.querySelector('header');

    // Función que muestra/oculta el botón
    function toggleBackToTop() {
      if (window.scrollY > header.offsetHeight) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }

    // Al hacer scroll
    window.addEventListener('scroll', toggleBackToTop);

    // Al hacer clic, vuelve al inicio suavemente
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });