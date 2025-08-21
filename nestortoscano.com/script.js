// const toggle = document.querySelector('.menu-toggle');
// const nav = document.querySelector('nav');

// toggle.addEventListener('click', function() {
//   nav.classList.toggle('active');
// });

$(".menu-toggle").click(function() {
  // $("nav").toggleClass("active");
  $(".mobile-menu ul").slideToggle(200);
})