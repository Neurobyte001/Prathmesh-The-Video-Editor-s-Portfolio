/* ═══════════════════════════════════════════════════════════
   Prathmesh — Video Editor Portfolio · script.js
   ────────────────────────────────────────────────────────────
   CHANGED vs. original:
     • openVideoModal()  — builds a YouTube embed URL and injects
                           it into the <iframe src>. No local paths.
     • closeVideoModal() — clears the <iframe src> to stop playback.
   Everything else (nav toggle, year, fade-in) is unchanged.
═══════════════════════════════════════════════════════════ */

/* ── Mobile nav toggle ────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav when any link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ── Footer year ──────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Fade-in on scroll ────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════════════════════
   VIDEO MODAL — YouTube iframe system
   ────────────────────────────────────────────────────────────

   HOW IT WORKS:
     1. Every clickable video element has:
          data-video="YOUTUBE_VIDEO_ID"
          data-orientation="vertical" | "landscape"
        and calls: onclick="openVideoModal(this.dataset.video, this.dataset.orientation)"

     2. openVideoModal(videoId, orientation)
          - Applies the correct size class to the modal inner box
          - Sets the iframe src to the YouTube embed URL with autoplay
          - Shows the modal overlay

     3. closeVideoModal()
          - Clears iframe src → video stops immediately
          - Hides the modal overlay

   TO ADD A NEW VIDEO:
     Just add data-video="YOUR_YOUTUBE_ID" to any clickable element.
     Thumbnail: https://img.youtube.com/vi/YOUR_YOUTUBE_ID/hqdefault.jpg
═══════════════════════════════════════════════════════════ */

const videoModal      = document.getElementById('videoModal');
const modalVideo      = document.getElementById('modalVideo');    // the <iframe>
const videoModalClose = document.getElementById('videoModalClose');
const videoModalInner = document.getElementById('videoModalInner');

/**
 * openVideoModal
 * @param {string} videoId    - YouTube video ID (e.g. "m1XLY2Ngb_A")
 * @param {string} orientation- "vertical" (9:16 reels) or "landscape" (16:9, default)
 */
function openVideoModal(videoId, orientation) {
  // Guard: do nothing if no video ID is provided
  if (!videoId) return;

  // 1. Size the modal correctly for the video orientation
  videoModalInner.classList.remove('video-vertical', 'video-landscape');
  if (orientation === 'vertical') {
    videoModalInner.classList.add('video-vertical');
  } else {
    videoModalInner.classList.add('video-landscape');  // default: 16:9
  }

  // 2. Build the YouTube embed URL
  //    autoplay=1  → starts playing immediately
  //    rel=0       → no recommended videos at the end
  //    modestbranding=1 → minimal YouTube branding
  const embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  // 3. Set the iframe src → video loads and autoplays
  modalVideo.src = embedURL;

  // 4. Show the modal
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';  // prevent background scroll
}

/**
 * closeVideoModal
 * Clears the iframe src immediately — this is the only reliable way
 * to stop a YouTube iframe from playing audio in the background.
 */
function closeVideoModal() {
  videoModal.classList.remove('active');
  modalVideo.src = '';                       // stops video + audio instantly
  document.body.style.overflow = '';         // restore scrolling
}

/* ── Close triggers ───────────────────────────────────── */

// Close button click
videoModalClose.addEventListener('click', closeVideoModal);

// Click on the dark backdrop (outside the video box)
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideoModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
