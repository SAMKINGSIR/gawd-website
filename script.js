// Responsive Nav
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('open');
});

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Product Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset all buttons
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.getAttribute('data-filter');

    products.forEach(prod => {
      if (filter === 'all' || prod.getAttribute('data-category') === filter) {
        prod.style.display = 'flex';
      } else {
        prod.style.display = 'none';
      }
    });
  });
});

// Countdown Timer
const countdownElem = document.getElementById('countdown-timer');
// Set drop end date/time (example: 3 days from now)
const dropEnd = new Date(Date.now() + 3*24*60*60*1000);

function updateCountdown() {
  const now = new Date();
  const diff = dropEnd - now;

  if (diff <= 0) {
    countdownElem.textContent = 'The drop has ended.';
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  countdownElem.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
}

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);

// Load Paystack script dynamically and add payment handlers
const paystackScript = document.createElement('script');
paystackScript.src = "https://js.paystack.co/v1/inline.js";
document.head.appendChild(paystackScript);

paystackScript.onload = () => {
  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const amount = button.getAttribute('data-amount');
      const product = button.getAttribute('data-product');

      const handler = PaystackPop.setup({
        key: 'pk_test_18a560ae191f139bb3650e4ecbc9c093c99b0320', // Replace with your Paystack public key
        email: prompt('Enter your email to proceed with payment:'),
        amount: amount,
        currency: 'NGN',
        metadata: {
          custom_fields: [
            {
              display_name: 'Product',
              variable_name: 'product',
              value: product,
            }
          ]
        },
        callback: function(response) {
          alert('Payment complete! Reference: ' + response.reference);
        },
        onClose: function() {
          alert('Transaction was not completed, window closed.');
        }
      });
      handler.openIframe();
    });
  });
};
