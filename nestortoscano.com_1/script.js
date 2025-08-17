//function for nav menu toggle
function toggleMenu() {
  //When menu clicked, function is called from html...
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden'); // Remove "hidden" class to show menu
    mobileMenu.style.right = '0%'; // Slide menu in from right
    menuIcon.classList.add('open'); // Add "open" class to change icon to "X"
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenu.style.right = '-100%';
    menuIcon.classList.remove('open'); // Remove "open" class to revert icon back to "="
  }
}

// Safely attach listeners only if the elements exist:
const cardWidth = 270; // width of card from CSS...

const exp_pre_btn = document.getElementById('exp-pre-btn');
const exp_nxt_btn = document.getElementById('exp-nxt-btn');
const experience_container = document.getElementById('experience-container');

if (exp_pre_btn && experience_container) {
  exp_pre_btn.addEventListener('click', () => {
    experience_container.scrollLeft -= cardWidth;
  });
}

if (exp_nxt_btn && experience_container) {
  exp_nxt_btn.addEventListener('click', () => {
    experience_container.scrollLeft += cardWidth;
  });
}

// Now code for projects section:
const proj_pre_btn = document.getElementById('proj-pre-btn');
const proj_nxt_btn = document.getElementById('proj-nxt-btn');
const projects_container = document.getElementById('projects-container');

if (proj_pre_btn && projects_container) {
  proj_pre_btn.addEventListener('click', () => {
    projects_container.scrollLeft -= cardWidth;
  });
}

if (proj_nxt_btn && projects_container) {
  proj_nxt_btn.addEventListener('click', () => {
    projects_container.scrollLeft += cardWidth;
  });
}

console.log('Script loaded!'); //for testing to make sure script is runnign