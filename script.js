 document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'images/about1.JPG',
    'images/about2.jpg',
    'images/about3.jpg',
    'images/about4.jpeg',
    'images/about5.JPG'
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

  // Show location field only if 'House' session is selected
  const sessionSelect = document.getElementById('session');
  const locationField = document.getElementById('location-field');
  if (sessionSelect && locationField) {
    sessionSelect.addEventListener('change', function() {
      if (sessionSelect.value === 'House') {
        locationField.style.display = 'flex';
      } else {
        locationField.style.display = 'none';
      }
    });
    // On page load, set correct visibility
    if (sessionSelect.value === 'House') {
      locationField.style.display = 'flex';
    } else {
      locationField.style.display = 'none';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Set default location if House is selected and location is empty
    const sessionSelect = document.getElementById('session');
    const locationInput = document.getElementById('location');
    if (sessionSelect && locationInput && sessionSelect.value === 'House' && !locationInput.value.trim()) {
      locationInput.value = 'Gaithersburg HS';
    }

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
