/**
 * CONNECTSTREAM.IO - PRICING PAGE INTERACTIVITY & LOGIC (VIBRANT GREEN 3-CARD THEME)
 */

document.addEventListener('DOMContentLoaded', () => {
  initBillingToggle();
});

// Pricing Data Definitions for Growth, Pro, and Business
const PRICING_DATA = {
  monthly: {
    growth: { price: 49, note: 'Billed monthly', savings: 'Save $120/yr with annual' },
    pro: { price: 99, note: 'Billed monthly', savings: 'Save $240/yr with annual' },
    business: { price: 249, note: 'Billed monthly', savings: 'Save $600/yr with annual' }
  },
  yearly: {
    growth: { price: 39, note: 'Billed annually ($468/yr)', savings: 'Save $120/yr' },
    pro: { price: 79, note: 'Billed annually ($948/yr)', savings: 'Save $240/yr' },
    business: { price: 199, note: 'Billed annually ($2,388/yr)', savings: 'Save $600/yr' }
  }
};

let isYearly = true; // Default to yearly selected

// 1. Billing Switcher Logic
function initBillingToggle() {
  const toggleInput = document.getElementById('billing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');

  if (!toggleInput) return;

  // Set initial checkbox state
  toggleInput.checked = isYearly;

  toggleInput.addEventListener('change', (e) => {
    isYearly = e.target.checked;
    
    if (isYearly) {
      labelYearly.classList.add('active');
      labelMonthly.classList.remove('active');
    } else {
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');
    }

    updatePrices();
    showToast(`Switched to ${isYearly ? 'Yearly Billing (20% Discount Applied)' : 'Monthly Billing'}`);
  });
}

function updatePrices() {
  const currentPlan = isYearly ? PRICING_DATA.yearly : PRICING_DATA.monthly;

  // Growth
  animateValue('growth-price', currentPlan.growth.price);
  const growthNote = document.getElementById('growth-billing-note');
  const growthSavings = document.getElementById('growth-savings');
  if (growthNote) growthNote.textContent = currentPlan.growth.note;
  if (growthSavings) growthSavings.textContent = currentPlan.growth.savings;

  // Pro
  animateValue('pro-price', currentPlan.pro.price);
  const proNote = document.getElementById('pro-billing-note');
  const proSavings = document.getElementById('pro-savings');
  if (proNote) proNote.textContent = currentPlan.pro.note;
  if (proSavings) proSavings.textContent = currentPlan.pro.savings;

  // Business
  animateValue('business-price', currentPlan.business.price);
  const businessNote = document.getElementById('business-billing-note');
  const businessSavings = document.getElementById('business-savings');
  if (businessNote) businessNote.textContent = currentPlan.business.note;
  if (businessSavings) businessSavings.textContent = currentPlan.business.savings;
}

function animateValue(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  el.style.transform = 'scale(0.8)';
  el.style.opacity = '0.4';

  setTimeout(() => {
    el.textContent = targetValue;
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  }, 150);
}

// 2. FAQ Accordion Logic
function toggleFaq(buttonElement) {
  const faqItem = buttonElement.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all open FAQs for single open experience
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });

  // Toggle clicked item
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// 3. Sign-Up Trial Modal Logic
function openModal(planName) {
  const modal = document.getElementById('trial-modal');
  const title = document.getElementById('modal-plan-title');
  
  if (title) {
    title.textContent = `Start your free trial - ${planName} Plan`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('trial-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'trial-modal') {
    closeModal();
  }
}

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('full-name').value;
  const email = document.getElementById('work-email').value;

  closeModal();

  // Reset form
  const form = document.getElementById('signup-form');
  if (form) form.reset();

  showToast(`🎉 Success! Trial account created for ${name} (${email}). Welcome to ConnectStream!`);
}

// 4. Toast Notification Utility
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
