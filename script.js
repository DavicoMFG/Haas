const counters = document.querySelectorAll('.counter');
const animateCounters = () => {
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const duration = 1100;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    observer.disconnect();
  }
}, { threshold: .25 });
observer.observe(document.querySelector('.stats'));

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

document.getElementById('inquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const sellerEmail = 'contactdavico@davicomfg.com'; // Replace with the real seller email.
  const subject = encodeURIComponent('Inquiry: 2021 Haas VF-5SS');
  const body = encodeURIComponent(
`Name: ${form.get('name')}
Company: ${form.get('company')}
Email: ${form.get('email')}
Phone: ${form.get('phone')}

${form.get('message')}`
  );
  window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${body}`;
});
