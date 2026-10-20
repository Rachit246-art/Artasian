document.addEventListener('DOMContentLoaded', () => {
  // 1. Luxury Architectural Side Drawer Navigation Toggle
  const menuButton = document.getElementById('menu') || document.querySelector('[data-menu-opener]');
  const siteMenu = document.getElementById('site-menu');
  const drawerBackdrop = document.getElementById('drawer-backdrop') || document.querySelector('.art-drawer-backdrop');

  function toggleMenu(forceState) {
    if (!siteMenu) return;
    const shouldOpen = forceState !== undefined ? forceState : !siteMenu.classList.contains('is-active');
    if (shouldOpen) {
      siteMenu.classList.add('is-active');
      if (drawerBackdrop) drawerBackdrop.classList.add('is-active');
      if (menuButton) menuButton.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    } else {
      siteMenu.classList.remove('is-active');
      if (drawerBackdrop) drawerBackdrop.classList.remove('is-active');
      if (menuButton) menuButton.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  if (menuButton && siteMenu) {
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    const closeBtn = document.getElementById('menu-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(false);
      });
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', () => {
        toggleMenu(false);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteMenu.classList.contains('is-active')) {
        toggleMenu(false);
      }
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2.1 Mobile Video Autoplay Insurance
  const heroVideo = document.querySelector('#hero-video video');
  if (heroVideo) {
    heroVideo.muted = true;
    const attemptPlay = () => {
      heroVideo.play().catch(() => {});
    };
    attemptPlay();
    document.addEventListener('touchstart', attemptPlay, { once: true, passive: true });
  }

  // 3. Featured Projects Sliding Carousel (#featured-slider)
  const featuredSlider = document.getElementById('featured-slider');
  const featuredDashes = document.querySelectorAll('#featured-dashes .art-dash');
  if (featuredSlider && featuredDashes.length > 0) {
    const slides = featuredSlider.querySelectorAll('.art-project-slide');
    let currentSlide = 0;
    let slideTimer = null;

    function goToSlide(index) {
      if (!slides.length) return;
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add('is-active');
        } else {
          slide.classList.remove('is-active');
        }
      });

      featuredDashes.forEach((dash, i) => {
        if (i === currentSlide) {
          dash.classList.add('is-active');
        } else {
          dash.classList.remove('is-active');
        }
      });
    }

    featuredDashes.forEach((dash) => {
      dash.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dash.getAttribute('data-slide'), 10) || 0;
        goToSlide(targetIdx);
        resetAutoSlide();
      });
    });

    featuredSlider.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoSlide();
    });

    function startAutoSlide() {
      stopAutoSlide();
      slideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4000);
    }

    function stopAutoSlide() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    startAutoSlide();
    featuredSlider.addEventListener('mouseenter', stopAutoSlide);
    featuredSlider.addEventListener('mouseleave', startAutoSlide);
  }

  // 4. Projects Filter & Search System (For projects page)
  const filterBtn = document.getElementById('project-filter');
  const searchBtn = document.getElementById('project-search');
  const filterPanel = document.getElementById('filter');
  const searchPanel = document.getElementById('search');
  const filterForm = document.getElementById('filter-form');
  const projectCards = document.querySelectorAll('[data-paginated-item]');

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = filterBtn.classList.toggle('is-active');
      filterPanel.classList.toggle('is-expanded', isActive);
      if (searchBtn && searchPanel && isActive) {
        searchBtn.classList.remove('is-active');
        searchPanel.classList.remove('is-expanded');
      }
    });
  }

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = searchBtn.classList.toggle('is-active');
      searchPanel.classList.toggle('is-expanded', isActive);
      if (filterBtn && filterPanel && isActive) {
        filterBtn.classList.remove('is-active');
        filterPanel.classList.remove('is-expanded');
      }
    });
  }

  // Filter Categories Accordion Tabs
  const categoryButtons = document.querySelectorAll('[data-accordion-button="b"]');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href').replace('#', '');
      const panels = document.querySelectorAll('#filter [data-accordion-panel]');
      panels.forEach(p => {
        if (p.id === targetId) {
          p.style.display = p.style.display === 'block' ? 'none' : 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // Filter project cards based on sector or search keyword
  const filterInputs = document.querySelectorAll('.c-filter-checkbox, .c-filter-tag');
  filterInputs.forEach(input => {
    input.addEventListener('click', (e) => {
      const sector = input.getAttribute('data-filter') || input.id;
      filterProjects(sector);
    });
  });

  function filterProjects(keyword) {
    if (!projectCards.length) return;
    projectCards.forEach(card => {
      if (!keyword || keyword === 'all') {
        card.style.display = '';
        return;
      }
      const title = card.querySelector('.c-listing__title')?.textContent.toLowerCase() || '';
      const matches = title.includes(keyword.toLowerCase());
      card.style.display = matches ? '' : 'none';
    });
  }

  // 5. Video Modal (Showreel)
  const modalTriggers = document.querySelectorAll('[data-modal-open]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      let modal = document.querySelector('.modal-video-overlay');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-video-overlay';
        modal.innerHTML = `
          <div class="modal-video-container">
            <button class="modal-video-close" aria-label="Close modal">&times;</button>
            <iframe src="https://player.vimeo.com/video/377761428?autoplay=1&color=06cccb" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
          </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-video-close').addEventListener('click', () => {
          modal.classList.remove('is-active');
          modal.querySelector('iframe').src = '';
        });

        modal.addEventListener('click', (evt) => {
          if (evt.target === modal) {
            modal.classList.remove('is-active');
            modal.querySelector('iframe').src = '';
          }
        });
      }

      modal.querySelector('iframe').src = 'https://player.vimeo.com/video/377761428?autoplay=1&color=06cccb';
      modal.classList.add('is-active');
    });
  });

  // 6. Global Luxury Animate on Scroll (AOS) Engine
  const aosElements = document.querySelectorAll('[data-aos]');
  if ('IntersectionObserver' in window) {
    const aosObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));
  } else {
    aosElements.forEach(el => el.classList.add('aos-animate'));
  }

  // 7. Services Carousel Navigation Arrows
  const prevBtn = document.querySelector('.art-arrow-btn--prev');
  const nextBtn = document.querySelector('.art-arrow-btn--next');
  const servicesGrid = document.querySelector('.art-services__grid');
  if (prevBtn && nextBtn && servicesGrid) {
    const getScrollAmount = () => {
      const card = servicesGrid.querySelector('.art-service-card');
      if (card) {
        const style = window.getComputedStyle(servicesGrid);
        const gap = parseFloat(style.gap) || 28;
        return card.offsetWidth + gap;
      }
      return 340;
    };

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollAmount();
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      if (servicesGrid.scrollLeft >= maxScroll - 10) {
        servicesGrid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        servicesGrid.scrollBy({ left: step, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollAmount();
      if (servicesGrid.scrollLeft <= 10) {
        const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
        servicesGrid.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        servicesGrid.scrollBy({ left: -step, behavior: 'smooth' });
      }
    });
  }

  // 8. Curated Gallery Filters & Interactive Lightbox
  const galleryFilterBtns = document.querySelectorAll('.art-gallery__filter-btn');
  const galleryItems = document.querySelectorAll('.art-gallery__item');
  const lightbox = document.getElementById('art-lightbox');
  const lightboxImg = document.getElementById('art-lightbox-img');
  const lightboxTitle = document.getElementById('art-lightbox-title');
  const lightboxSub = document.getElementById('art-lightbox-sub');
  const lightboxClose = document.querySelector('.art-lightbox__close');
  const lightboxBackdrop = document.querySelector('.art-lightbox__backdrop');

  if (galleryFilterBtns.length && galleryItems.length) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('is-hidden');
            item.style.opacity = '0';
            setTimeout(() => { item.style.opacity = '1'; }, 30);
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  if (lightbox && galleryItems.length) {
    function openLightbox(item) {
      const img = item.querySelector('.art-gallery__thumb img');
      const title = item.querySelector('.art-gallery__item-title')?.textContent || '';
      const cat = item.querySelector('.art-gallery__cat')?.textContent || '';
      const loc = item.querySelector('.art-gallery__item-location')?.textContent || '';

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxSub) lightboxSub.textContent = `${cat} • ${loc}`;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
      item.addEventListener('click', () => openLightbox(item));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // ========================================================================
  // 10. LUXURY CLIENT TESTIMONIAL SLIDER INTERACTIVITY
  // ========================================================================
  const testiImgSlides = document.querySelectorAll('.art-testi-card__img-slide');
  const testiTextSlides = document.querySelectorAll('.art-testi-slide');
  const testiDashes = document.querySelectorAll('.art-testi-dash');
  const testiPrevBtn = document.getElementById('testi-prev-btn');
  const testiNextBtn = document.getElementById('testi-next-btn');

  if (testiImgSlides.length && testiTextSlides.length) {
    let currentTestiIndex = 0;
    const totalTestiSlides = testiImgSlides.length;
    let testiAutoTimer = null;

    function goToTestiSlide(index) {
      if (index < 0) {
        currentTestiIndex = totalTestiSlides - 1;
      } else if (index >= totalTestiSlides) {
        currentTestiIndex = 0;
      } else {
        currentTestiIndex = index;
      }

      // Update image slides
      testiImgSlides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === currentTestiIndex);
      });

      // Update synchronized text slides with reviewer info
      testiTextSlides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === currentTestiIndex);
      });

      // Update progress indicators
      testiDashes.forEach((dash, idx) => {
        dash.classList.toggle('is-active', idx === currentTestiIndex);
      });
    }

    function startTestiAuto() {
      stopTestiAuto();
      testiAutoTimer = setInterval(() => {
        goToTestiSlide(currentTestiIndex + 1);
      }, 6500);
    }

    function stopTestiAuto() {
      if (testiAutoTimer) {
        clearInterval(testiAutoTimer);
        testiAutoTimer = null;
      }
    }

    if (testiPrevBtn) {
      testiPrevBtn.addEventListener('click', () => {
        goToTestiSlide(currentTestiIndex - 1);
        startTestiAuto();
      });
    }

    if (testiNextBtn) {
      testiNextBtn.addEventListener('click', () => {
        goToTestiSlide(currentTestiIndex + 1);
        startTestiAuto();
      });
    }

    testiDashes.forEach((dash, idx) => {
      dash.addEventListener('click', () => {
        goToTestiSlide(idx);
        startTestiAuto();
      });
    });

    const testiCard = document.querySelector('.art-testi-card');
    if (testiCard) {
      testiCard.addEventListener('mouseenter', stopTestiAuto);
      testiCard.addEventListener('mouseleave', startTestiAuto);
    }

    startTestiAuto();
  }

  // 9. Luxury Editorial Blog Spotlight Slider (#blog-spotlight-slider)
  const blogSlider = document.getElementById('blog-spotlight-slider');
  const blogDashes = document.querySelectorAll('#blog-spotlight-dashes .art-blog-dash');
  if (blogSlider && blogDashes.length > 0) {
    const blogSlides = blogSlider.querySelectorAll('.art-blog-slide');
    let currentBlogIndex = 0;
    let blogTimer = null;

    function goToBlogSlide(index) {
      if (!blogSlides.length) return;
      currentBlogIndex = (index + blogSlides.length) % blogSlides.length;

      blogSlides.forEach((slide, i) => {
        if (i === currentBlogIndex) {
          slide.classList.add('is-active');
        } else {
          slide.classList.remove('is-active');
        }
      });

      blogDashes.forEach((dash, i) => {
        if (i === currentBlogIndex) {
          dash.classList.add('is-active');
        } else {
          dash.classList.remove('is-active');
        }
      });
    }

    blogDashes.forEach((dash) => {
      dash.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dash.getAttribute('data-target'), 10) || 0;
        goToBlogSlide(targetIdx);
        resetBlogTimer();
      });
    });

    function resetBlogTimer() {
      if (blogTimer) clearInterval(blogTimer);
      blogTimer = setInterval(() => {
        goToBlogSlide(currentBlogIndex + 1);
      }, 7000);
    }

    blogSlider.addEventListener('mouseenter', () => {
      if (blogTimer) clearInterval(blogTimer);
    });

    blogSlider.addEventListener('mouseleave', () => {
      resetBlogTimer();
    });

    resetBlogTimer();
  }

  // ==========================================================================
  // 10. GLOBAL LUXURY INTERACTION & ANIMATION ENGINE (ALL PAGES)
  // ==========================================================================

  // 10.1 Top Luxury Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'lux-scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressBar);

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 10.2 Bespoke Architectural Custom Magnetic Cursor (Desktop)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'lux-cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');

    const cursorRing = document.createElement('div');
    cursorRing.className = 'lux-cursor-ring';
    cursorRing.setAttribute('aria-hidden', 'true');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        document.body.classList.add('lux-cursor--active');
        isMoving = true;
      }
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Interactive target expansion
    const interactiveSelectors = 'a, button, input, select, textarea, .art-project-slide, .art-service-card, .journal-card, .project-lux-card, .art-dash, .art-testi-dash, .art-blog-dash';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursorRing.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursorRing.classList.remove('is-hovering');
      }
    });
  }

  // 10.3 3D Luxury Tilt Effect on Cards (Pointer & Gyro responsive)
  const tiltCards = document.querySelectorAll(
    '.project-lux-card, .journal-card, .art-service-card, .art-step-card, .practice-matrix-card, .practice-studio-card, .contact-card-premium, .careers-culture-panel, .art-contact-card, .art-contact-studio-box'
  );

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 10.5 Subtle Hero Parallax on Scroll
  const heroBackgrounds = document.querySelectorAll('.lux-hero-bg, .art-hero__img-container img');
  if (heroBackgrounds.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset;
          if (scrollPos < 1000) {
            heroBackgrounds.forEach((heroBg) => {
              heroBg.style.transform = `translate3d(0, ${(scrollPos * 0.22).toFixed(1)}px, 0) scale(1.05)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 10.6 Magnetic Attraction on Primary Buttons
  const magneticBtns = document.querySelectorAll('.art-contact-submit-btn, .art-hero__cta, .art-btn-editorial');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ==========================================================================
  // 11. ULTRA-LUXURY ARCHITECTURAL PRELOADER SCREEN
  // ==========================================================================
  (function initLuxuryPreloader() {
    const preloaderEl = document.createElement('div');
    preloaderEl.className = 'lux-preloader';
    preloaderEl.id = 'lux-preloader';
    preloaderEl.setAttribute('role', 'progressbar');
    preloaderEl.setAttribute('aria-label', 'Loading Artasian Studio');
    preloaderEl.innerHTML = `
      <div class="lux-preloader__content">
        <div class="lux-preloader__logo-wrap">
          <img src="assets/img/artasian-logo-dark.png" alt="Artasian" class="lux-preloader__logo">
        </div>
      </div>
    `;

    document.body.prepend(preloaderEl);
    document.body.style.overflow = 'hidden';

    function completePreloader() {
      setTimeout(() => {
        preloaderEl.classList.add('lux-preloader--done');
        document.body.style.overflow = '';
        setTimeout(() => {
          if (preloaderEl.parentNode) {
            preloaderEl.parentNode.removeChild(preloaderEl);
          }
        }, 900);
      }, 700);
    }

    if (document.readyState === 'complete') {
      completePreloader();
    } else {
      window.addEventListener('load', completePreloader);
      setTimeout(completePreloader, 2200);
    }
  })();
});


