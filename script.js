 document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'images/about1.jpg',
    'images/about2.jpg',
    'images/about3.jpg',
    'images/about4.jpeg',
    'images/about6.JPG',
    'images/about7.JPEG'
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

