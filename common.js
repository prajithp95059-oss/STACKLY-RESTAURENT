// ===== STACKLY SHARED JS =====
window.addEventListener('load', function() {
  setTimeout(function() {
    var pre = document.getElementById('pre');
    if (pre) pre.classList.add('gone');
  }, 2200);
});

// Scroll progress + header shrink
window.addEventListener('scroll', function() {
  var t = document.documentElement.scrollHeight - window.innerHeight;
  var pct = (window.scrollY / t * 100) + '%';
  var sb = document.getElementById('sb') || document.getElementById('sp');
  if (sb) sb.style.width = pct;
  var hdr = document.getElementById('hdr');
  if (hdr) hdr.classList.toggle('sc', window.scrollY > 60);
});

// Scroll animations
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(x) {
    if (x.isIntersecting) {
      x.target.classList.add('vis');
      obs.unobserve(x.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.fade-up,.fade-in,.fade-left,.fade-right,.scale-in').forEach(function(el) { obs.observe(el); });

// Counter animation
var cobs = new IntersectionObserver(function(entries) {
  entries.forEach(function(x) {
    if (!x.isIntersecting) return;
    var el = x.target, t = parseInt(el.dataset.t), isK = t >= 1000;
    var d = isK ? Math.round(t / 100) / 10 : t, cur = 0, step = d / 60;
    var timer = setInterval(function() {
      cur += step;
      if (cur >= d) { cur = d; clearInterval(timer); }
      el.textContent = isK ? (Math.floor(cur * 10) / 10) + 'K+' : Math.floor(cur);
    }, 20);
    cobs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-n[data-t]').forEach(function(el) { cobs.observe(el); });

// Mobile menu
var ham = document.getElementById('ham');
if (ham) ham.addEventListener('click', function() {
  var mm = document.getElementById('mm');
  if (mm) mm.classList.toggle('open');
  ham.classList.toggle('open');
});
var mobClose = document.getElementById('mm-close');
if (mobClose) mobClose.addEventListener('click', function() { cm(); });
function cm() {
  var mm = document.getElementById('mm');
  if (mm) mm.classList.remove('open');
  var h = document.getElementById('ham');
  if (h) h.classList.remove('open');
}

// Tab switcher
function st(n, b) {
  document.querySelectorAll('.tab').forEach(function(x) { x.classList.remove('on'); });
  document.querySelectorAll('.tab-pane').forEach(function(x) { x.classList.remove('on'); });
  b.classList.add('on');
  var pane = document.getElementById('tp-' + n);
  if (pane) pane.classList.add('on');
}

// Pill selector — works for both old (.pills/.pill) and new (*-pill pattern)
function sp(el) {
  var parent = el.closest('.pills') || el.parentElement;
  if (parent) parent.querySelectorAll('button,div[onclick]').forEach(function(p) { p.classList.remove('active','on'); });
  el.classList.add('active');
}

// Booking button
function sb(btn) {
  var o = btn.textContent;
  btn.textContent = 'Confirming...';
  btn.disabled = true;
  btn.style.opacity = '.6';
  setTimeout(function() {
    btn.textContent = '✓ Confirmed!';
    btn.style.background = '#22c55e';
    btn.style.opacity = '1';
    setTimeout(function() {
      btn.textContent = o;
      btn.disabled = false;
      btn.style.background = '';
    }, 2500);
  }, 1400);
}

// Newsletter
var nlb = document.getElementById('nlb');
if (nlb) nlb.addEventListener('click', function() {
  var i = document.getElementById('nli');
  if (!i || !i.value.trim() || !i.value.includes('@')) {
    if (i) { i.style.outline = '2px solid var(--red)'; setTimeout(function() { i.style.outline = ''; }, 2000); }
    return;
  }
  this.textContent = '✓ Done!';
  i.value = '';
  var b = this;
  setTimeout(function() { b.textContent = 'Subscribe'; }, 2500);
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(q) {
  q.addEventListener('click', function() {
    var item = this.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// FAQ category filter
function switchCat(cat, btn) {
  document.querySelectorAll('.faq-cat-btn').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  document.querySelectorAll('.faq-group').forEach(function(g) {
    g.style.display = (cat === 'all' || g.dataset.cat === cat) ? 'block' : 'none';
  });
}

// Premium plan buttons
document.querySelectorAll('.plan-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var o = this.textContent;
    this.textContent = '✓ Selected!';
    var b = this;
    setTimeout(function() { b.textContent = o; }, 2000);
  });
});

// Active nav link — always re-derive from current URL, remove any hardcoded active classes
(function() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  if (!path) path = 'index.html';
  document.querySelectorAll('nav a, .site-nav a').forEach(function(a) {
    a.classList.remove('active', 'act');
    var href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path || (!path && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
