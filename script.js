document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
      document.body.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.getAttribute('data-theme');
      if (currentTheme === 'dark') {
          document.body.setAttribute('data-theme', 'light');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem('theme', 'light');
      } else {
          document.body.setAttribute('data-theme', 'dark');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem('theme', 'dark');
      }
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (nav.classList.contains('active')) {
              nav.classList.remove('active');
              mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
      });
  });
  
  // Scroll animation
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
      animateElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight - 100) {
              element.classList.add('visible');
          }
      });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Typing animation
  const typingElement = document.querySelector('.typing-animation');
  const professions = ['Developer', 'Designer', 'Solver ', 'Enthusiast'];
  let currentProfession = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function type() {
      const currentText = professions[currentProfession];
      
      if (isDeleting) {
          typingElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
      } else {
          typingElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
          isEnd = true;
          isDeleting = true;
          setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          isEnd = false;
          currentProfession = (currentProfession + 1) % professions.length;
          setTimeout(type, 500);
      } else {
          const speed = isDeleting ? 100 : 150;
          setTimeout(type, speed);
      }
  }
  
  // Start typing animation after a delay
  setTimeout(type, 1000);
  
  // Skill bar animation
  const skillBars = document.querySelectorAll('.skill-level');
  skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
          bar.style.width = width;
      }, 500);
  });
});
