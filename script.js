    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Fade-in on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Video modal (for local MP4s – adjust paths to your videos)
function openVideoModal(src, orientation = 'landscape') {
  if (!src) return;

  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const sourceEl = modalVideo.querySelector('source');
  const modalInner = document.querySelector('.video-modal-inner');

  // Reset orientation classes
  modalInner.classList.remove('video-vertical', 'video-landscape');

  // Apply based on orientation
  if (orientation === 'vertical') {
    modalInner.classList.add('video-vertical');
  } else {
    modalInner.classList.add('video-landscape');
  }

  sourceEl.src = src;
  modalVideo.load();
  modalVideo.play().catch(() => {});

  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

    function closeVideoModal() {
      videoModal.classList.remove('active');
      modalVideo.pause();
      modalVideo.currentTime = 0;
      const sourceEl = modalVideo.querySelector('source');
      sourceEl.src = '';
      document.body.style.overflow = '';
    }

    videoModalClose.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
    });
