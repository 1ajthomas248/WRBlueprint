document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const heroImages = [
    'images/hero_picture.jpg',
    'images/hero_picture2.jpg',
    'images/hero_picture3.jpg' // Add more if you have them
  ];

  let heroIndex = 0;
  let heroShowingA = true;

  const heroA = document.getElementById('heroImageA');
  const heroB = document.getElementById('heroImageB');

  setInterval(() => {
    const nextHero = (heroIndex + 1) % heroImages.length;

    if (heroShowingA) {
      heroB.src = heroImages[nextHero];
      heroB.onload = () => {
        heroB.classList.add("opacity-100");
        heroA.classList.remove("opacity-100");
        heroA.classList.add("opacity-0");
      };
    } else {
      heroA.src = heroImages[nextHero];
      heroA.onload = () => {
        heroA.classList.add("opacity-100");
        heroB.classList.remove("opacity-100");
        heroB.classList.add("opacity-0");
      };
    }

    heroShowingA = !heroShowingA;
    heroIndex = nextHero;
  }, 5000); // Crossfade every 5 seconds
});


document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'images/about1.jpg',
    'images/about2.jpg',
    'images/about3.jpg',
    'images/about4.jpeg'
  ];

  let currentIndex = 0;
  let showingA = true;

  const imgA = document.getElementById("imageA");
  const imgB = document.getElementById("imageB");

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


document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  emailjs.init('5vHd4CiH9quZpHSFY'); // Replace this

  const form = document.getElementById('booking-form');
  const successMsg = document.getElementById('success-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8iqfm6e', 'template_wpd0t9e', form)
      .then(() => {
        successMsg.classList.remove('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth' });
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('There was a problem sending your request. Please try again later.');
      });
  });
});
