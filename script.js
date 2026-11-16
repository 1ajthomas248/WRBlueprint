 document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
});


// Hero: the picture fades into the first touchdown clip once it can play,
// then the two clips crossfade back and forth forever (muted)
document.addEventListener('DOMContentLoaded', () => {
  const videos = Array.from(document.querySelectorAll('.hero-video'));
  if (videos.length < 2) return;

  let current = 0;
  let started = false;

  const show = (i) => {
    const v = videos[i];
    try { v.currentTime = 0; } catch (e) {}
    const p = v.play();
    const reveal = () => {
      v.classList.remove('opacity-0');
      v.classList.add('opacity-100');
      videos[1 - i].classList.remove('opacity-100');
      videos[1 - i].classList.add('opacity-0');
    };
    if (p && p.then) {
      p.then(reveal).catch(() => {
        // Autoplay blocked (e.g. iOS Low Power Mode): retry on first interaction
        const retry = () => show(i);
        ['touchstart', 'click', 'scroll'].forEach((ev) =>
          window.addEventListener(ev, retry, { once: true, passive: true }));
      });
    } else {
      reveal();
    }
  };

  videos.forEach((v, i) => {
    // Set as properties too: iOS needs muted + playsinline before play()
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.addEventListener('ended', () => {
      current = 1 - i;
      show(current);
    });
  });

  // Mobile browsers don't preload, so don't wait for canplay: call play() right away
  // (it buffers and starts as soon as it can).
  if (!started) {
    started = true;
    show(0);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'images/about8.jpg',
    'images/about9.jpg',
    'images/about10.jpg',
    'images/about11.jpg',
    'images/about12.jpg',
    'images/about13.jpg',
    'images/about14.jpg',
    'images/about15.jpg'
  ];

  let currentIndex = 0;
  let showingA = true;

  const imgA = document.getElementById("imageA");
  const imgB = document.getElementById("imageB");

  // Vertical position of his face in each photo (0 = top, 1 = bottom).
  // The slideshow box is wide but most photos are tall, so we shift each
  // photo so the face stays centered in the visible crop.
  const faceY = {
    'about8.jpg': 0.50,
    'about9.jpg': 0.34,
    'about10.jpg': 0.46,
    'about11.jpg': 0.33,
    'about12.jpg': 0.16,
    'about13.jpg': 0.32,
    'about14.jpg': 0.38,
    'about15.jpg': 0.38
  };

  const focusFace = (img) => {
    const name = img.getAttribute('src').split('/').pop();
    const c = faceY[name];
    if (c === undefined || !img.naturalWidth) return;
    const cw = img.clientWidth, ch = img.clientHeight;
    const h = img.naturalHeight * Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    if (h <= ch) return;
    const pos = Math.min(1, Math.max(0, (c * h - ch / 2) / (h - ch)));
    img.style.objectPosition = `50% ${(pos * 100).toFixed(1)}%`;
  };

  [imgA, imgB].forEach(img => {
    img.addEventListener('load', () => focusFace(img));
    if (img.complete) focusFace(img);
  });
  window.addEventListener('resize', () => [imgA, imgB].forEach(focusFace));

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % images.length;

    if (showingA) {
      imgB.src = images[nextIndex];

      // Wait for imgB to fully load before fading in
      imgB.onload = () => {
        imgB.classList.add("opacity-100");
        imgB.classList.remove("opacity-0");
        imgA.classList.remove("opacity-100");
        imgA.classList.add("opacity-0");
      };
    } else {
      imgA.src = images[nextIndex];

      imgA.onload = () => {
        imgA.classList.add("opacity-100");
        imgA.classList.remove("opacity-0");
        imgB.classList.remove("opacity-100");
        imgB.classList.add("opacity-0");
      };
    }

    showingA = !showingA;
    currentIndex = nextIndex;
  }, 4000); // slightly longer duration to make it smoother
});

