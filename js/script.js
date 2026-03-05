// ========== GLOBAL VARIABLES ==========
let logoInjected = false; // not needed with separate asset file

// ========== CYCLING HERO WORDS ==========
const cyclingWord = document.getElementById('cyclingWord');
if (cyclingWord) {
  const words = ['Alive', 'come to grow', 'to be great'];
  let currentWordIndex = 0;

  setInterval(() => {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    cyclingWord.textContent = words[currentWordIndex];
    cyclingWord.style.animation = 'fadeInOut 0.6s ease-in-out';
    
    // Reset animation by removing and re-adding it
    setTimeout(() => {
      cyclingWord.style.animation = 'none';
    }, 600);
  }, 3000);
}

// ========== SCROLL REVEAL ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ========== STICKY NAV BACKGROUND ==========
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.style.background = window.scrollY > 60 ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.75)';
  }
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

function toggleMenu() {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !isOpen);
  mobileMenu.setAttribute('aria-hidden', isOpen);
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// ========== PORTFOLIO FILTER ==========
const filterButtons = document.querySelectorAll('.tab-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ========== GAMIFICATION: QUIZ TRIGGER ==========
const quizTrigger = document.getElementById('quizTriggerBtn');
if (quizTrigger) {
  quizTrigger.addEventListener('click', () => {
    const challenge = prompt('What is your main marketing challenge?\n1. Brand awareness\n2. Lead generation\n3. Customer engagement\nEnter number 1-3:');
    let filter = '';
    if (challenge === '1') filter = 'marketing';
    else if (challenge === '2') filter = 'events';
    else if (challenge === '3') filter = 'entertainment';
    else {
      alert('Thanks! We will show you all projects.');
      filter = 'all';
    }
    // Simulate filter click
    const targetBtn = Array.from(filterButtons).find(b => b.dataset.filter === filter);
    if (targetBtn) targetBtn.click();
  });
}

// ========== AR QR MOCK ==========
const qrBtn = document.getElementById('qrMockBtn');
const qrPlaceholder = document.getElementById('qrPlaceholder');
if (qrBtn) {
  qrBtn.addEventListener('click', () => {
    qrPlaceholder.classList.toggle('hidden');
    if (!qrPlaceholder.classList.contains('hidden')) {
      qrPlaceholder.innerHTML = ''; // clear previous content, pseudo-element shows text
    }
  });
}

// ========== AI BRAND HEALTH CHECKER ==========
const healthForm = document.getElementById('healthForm');
const healthResult = document.getElementById('healthResult');
if (healthForm) {
  healthForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('socialUrl').value;
    // Mock analysis
    healthResult.innerHTML = `
      <p><strong>🔍 Mock Analysis for "${url}"</strong></p>
      <ul style="margin-top:0.5rem; list-style:disc; padding-left:1.5rem; color:var(--muted);">
        <li>✅ Your bio could include more keywords like "events Nairobi".</li>
        <li>📅 Last post was 3 days ago — good consistency!</li>
        <li>🎯 Engagement rate is above average for your sector.</li>
        <li>💡 Suggestion: add a link to your website or a calendar.</li>
      </ul>
    `;
  });
}

// ========== CONTACT FORM SUBMIT (mock) ==========
const contactSubmit = document.getElementById('contactSubmitBtn');
if (contactSubmit) {
  contactSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Enquiry Sent! We\'ll be in touch.';
    btn.style.background = '#2d9b6d';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3500);
    // Optionally clear form
    document.querySelector('#contact form')?.reset();
  });
}

// ========== SCHEDULING MOCK ==========
const scheduleBtn = document.getElementById('scheduleMockBtn');
if (scheduleBtn) {
  scheduleBtn.addEventListener('click', () => {
    alert('📅 Mock scheduling: This would open a Calendly embed. In a real version, you would be redirected to a booking page.');
  });
}

// ========== CHATBOT ==========
const chatToggle = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatCloseBtn');
const chatSend = document.getElementById('chatSendBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (chatToggle && chatWindow) {
  chatToggle.addEventListener('click', () => {
    const isHidden = chatWindow.getAttribute('aria-hidden') === 'true';
    chatWindow.setAttribute('aria-hidden', !isHidden);
  });
}

if (chatClose) {
  chatClose.addEventListener('click', () => {
    chatWindow.setAttribute('aria-hidden', 'true');
  });
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatSend && chatInput) {
  chatSend.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, 'user');
    chatInput.value = '';

    // Simple bot response
    setTimeout(() => {
      let response = "Thanks for your message! A human will reply soon. Meanwhile, check our services!";
      if (msg.toLowerCase().includes('event')) response = "We produce amazing events! Tell us more about your needs.";
      else if (msg.toLowerCase().includes('price') || msg.toLowerCase().includes('cost')) response = "Our pricing starts at $499. Check the Pricing section!";
      else if (msg.toLowerCase().includes('hello') || msg.toLowerCase().includes('hi')) response = "Habari! How can we help you today?";
      addMessage(response, 'bot');
    }, 500);
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') chatSend.click();
  });
}

// ========== INITIAL CHAT MESSAGE (optional) ==========
// Already one in HTML

// ========== LOGO FALLBACK (if image missing) ==========
// Not needed if asset exists, but we can keep original base64 as fallback? 
// We'll trust the assets folder for this improved version.