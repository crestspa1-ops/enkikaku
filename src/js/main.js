document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Mobile Navigation Drawer Toggle
  // ==========================================================================
  const menuTrigger = document.getElementById('js-menu-trigger');
  const navMenu = document.getElementById('js-nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuTrigger && navMenu) {
    const toggleMenu = () => {
      menuTrigger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Prevent scroll behind menu if needed
    };

    const closeMenu = () => {
      menuTrigger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    menuTrigger.addEventListener('click', toggleMenu);

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of nav menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuTrigger.contains(e.target) && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => {
      el.classList.add('revealed');
    });
  }

  // ==========================================================================
  // Sticky Header Effect
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once initially

  // ==========================================================================
  // Active Navigation Link on Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // adjust offset for header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active-link');
        } else {
          activeLink.classList.remove('active-link');
        }
      }
    });
  };
  
  window.addEventListener('scroll', scrollActive);
  scrollActive(); // Run once initially
});
