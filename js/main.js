/**
 * ROGER HAUS — ILLUSTRATOR & ART DIRECTOR PORTFOLIO (FIGMA 0:1)
 * Interactive Behaviors & Eye-Tracking System
 */

document.addEventListener('DOMContentLoaded', () => {
  initEyeTracking();
  initMobileMenu();
  initHeaderScroll();
  initPortfolioFilters();
  initArtworkModal();
  initCopyEmail();
  initTellMeMore();
});

/* ==========================================================================
   1. HYPNOTIC EYE TRACKING SYSTEM
   ========================================================================== */
function initEyeTracking() {
  const leftIris = document.getElementById('left-iris');
  const rightIris = document.getElementById('right-iris');
  const eyesContainer = document.querySelector('.eyes-container');

  if (!leftIris || !rightIris || !eyesContainer) return;

  const maxOffset = 14; // Maximum pupil travel radius in SVG units

  function updateEyes(clientX, clientY) {
    const rect = eyesContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.hypot(deltaX, deltaY) / 18, maxOffset);

    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    leftIris.setAttribute('transform', `translate(${90 + offsetX}, ${65 + offsetY})`);
    rightIris.setAttribute('transform', `translate(${90 + offsetX}, ${65 + offsetY})`);
  }

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
  });

  // Touch move listener for mobile/tablet
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      requestAnimationFrame(() => updateEyes(touch.clientX, touch.clientY));
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   4. PORTFOLIO FILTERS
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate(0, 0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. ARTWORK LIGHTBOX MODAL
   ========================================================================== */
const artworkData = {
  'exquisite-workers': {
    title: 'Exquisite Workers™',
    tags: ['Global Project', 'OpenSea Frontpage', 'Surrealism'],
    desc: 'An international collaborative surrealist movement curated by Roger Haus. Spanning over 500 visionary creators worldwide playing the traditional Cadavre Exquis parlor game in the digital age, exhibited at the Picasso Museum of Barcelona and featured globally.',
    image: 'assets/exquisite-workers.png'
  },
  'lotus-goddess': {
    title: 'Lotus Goddess',
    tags: ['1 of 1 Drop', 'Digital Fine Art', 'Mythology'],
    desc: 'Surrealist interpretation of cosmic fertility and spiritual automatism. Created in the early morning hypnagogic state, the multi-armed deity sits upon layered lotus petals holding ancient and futuristic relics.',
    image: 'assets/lotus-goddess.png'
  },
  'cosmic-steed': {
    title: 'Cosmic Steed & Animation',
    tags: ['Animation', 'Motion Production', 'Vector'],
    desc: 'A celestial golden steed galloping through deep space orbits. Designed for audiovisual production, museum projections, and experimental motion graphics.',
    image: 'assets/cosmic-steed.png'
  },
  'hypnagogia-large': {
    title: 'Hypnagogias Series (Master Canvas)',
    tags: ['Nocturnal Drawing', 'Automatism', 'Ink Mesh'],
    desc: 'Drawn between 3:00 and 5:00 AM when rational thinking pauses and dreams surge. Composed of tens of thousands of micro-lines, surreal eyes, anatomical forms, and subconscious geometries.',
    image: 'assets/hypnagogia-large.png'
  },
  'art-book': {
    title: 'Roger Haus Monograph Box Set',
    tags: ['Limited Edition', '100 Copies', 'Print & Slipcase'],
    desc: 'Special archival print edition collecting a decade of illustrations, graffiti roots, and digital artwork. Housed in a custom minimalist clamshell box manufactured in Barcelona.',
    image: 'assets/art-book.png'
  },
  'comic-strip': {
    title: 'One More Comic for the Trip',
    tags: ['6-Panel Comic', 'Indie Press', 'Storytelling'],
    desc: 'Playful surreal mini-comic featuring eccentric characters, late-night studio humor, and metaphysical musings on the art of subconscious drawing.',
    image: 'assets/comic-strip.png'
  },
  'girl-black-cat': {
    title: 'Girl with the Black Cat',
    tags: ['Viral Masterpiece', 'HAI Collection', 'Manga Surrealism'],
    desc: 'Roger Haus\'s internationally acclaimed viral piece merging manga character aesthetics, human traits, and feline elegance, viewed by tens of millions of admirers worldwide.',
    image: 'assets/girl-black-cat.png'
  }
};

function initArtworkModal() {
  const modal = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');

  if (!modal || !modalImg) return;

  function openModal(id) {
    const data = artworkData[id];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalTags.innerHTML = data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-artwork-id');
      if (id) openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. ONE-CLICK EMAIL COPY & TOAST
   ========================================================================== */
function initCopyEmail() {
  const emailLinks = document.querySelectorAll('.contact-email-link, .floating-sticker');
  const toast = document.querySelector('.copy-toast');

  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'hello@rogerhaus.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard: ' + email);
        }).catch(() => {
          showToast('Contact: ' + email);
        });
      } else {
        showToast('Contact: ' + email);
      }

      // Also trigger mailto after a tiny delay
      setTimeout(() => {
        window.location.href = 'mailto:' + email + '?subject=Art%20Direction%20%2F%20Collaboration';
      }, 700);
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   7. "TELL ME MORE" STORY DRAWER
   ========================================================================== */
function initTellMeMore() {
  const btn = document.querySelector('.tell-me-more-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Navigate or trigger modal with deep biography
    window.location.href = 'about.html';
  });
}
