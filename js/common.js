/* ============================================
   HEY MATE LMS - Common Module
   Injects header/footer, handles dark mode,
   toast notifications, and mobile nav.
   ============================================ */

/* --- Inject Header into #site-header --- */
function injectHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var user = getCurrentUser();
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Build nav links based on auth state
    var navLinks = '';
    navLinks += '<a href="index.html"' + (currentPage === 'index.html' ? ' class="active"' : '') + '>Home</a>';
    navLinks += '<a href="courses.html"' + (currentPage === 'courses.html' ? ' class="active"' : '') + '>Courses</a>';
    if (user) {
        navLinks += '<a href="dashboard.html"' + (currentPage === 'dashboard.html' ? ' class="active"' : '') + '>Dashboard</a>';
        if (user.role === 'admin') {
            navLinks += '<a href="admin.html"' + (currentPage === 'admin.html' ? ' class="active"' : '') + '>Admin</a>';
        }
    }

    // Build right section
    var rightSection = '';
    rightSection += '<button class="dark-toggle" onclick="toggleDarkMode()" title="Toggle dark mode">' + (document.documentElement.classList.contains('dark') ? '&#9728;' : '&#9790;') + '</button>';
    if (user) {
        rightSection += '<span style="font-weight:600;font-size:0.9rem;">' + user.name + '</span>';
        rightSection += '<button class="btn btn-sm btn-outline" onclick="handleLogout()">Logout</button>';
    } else {
        rightSection += '<a href="login.html" class="btn btn-sm btn-ghost">Login</a>';
        rightSection += '<a href="signup.html" class="btn btn-sm btn-primary">Sign Up</a>';
    }

    header.innerHTML = '<nav class="nav-inner">' +
        '<a href="index.html" class="nav-logo">Hey <span>Mate</span></a>' +
        '<div class="nav-links" id="navLinks">' + navLinks + '</div>' +
        '<div class="nav-right">' + rightSection +
        '<button class="mobile-toggle" onclick="toggleMobileNav()" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div></nav>';
}

/* --- Inject Footer into #site-footer --- */
function injectFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = '<div class="footer-inner">' +
        '<div class="footer-brand">' +
            '<div class="footer-logo">Hey <span>Mate</span></div>' +
            '<p>Your friendly learning companion. Master new skills at your own pace with hands-on courses designed by industry experts.</p>' +
        '</div>' +
        '<div class="footer-col">' +
            '<h4>Quick Links</h4>' +
            '<a href="index.html">Home</a>' +
            '<a href="courses.html">Courses</a>' +
            '<a href="dashboard.html">Dashboard</a>' +
            '<a href="login.html">Login</a>' +
        '</div>' +
        '<div class="footer-col">' +
            '<h4>Categories</h4>' +
            '<a href="courses.html?cat=Web Development">Web Development</a>' +
            '<a href="courses.html?cat=Data Science">Data Science</a>' +
            '<a href="courses.html?cat=Design">Design</a>' +
            '<a href="courses.html?cat=AI & Machine Learning">AI & ML</a>' +
        '</div>' +
        '<div class="footer-col">' +
            '<h4>Support</h4>' +
            '<a href="#">Help Center</a>' +
            '<a href="#">Contact Us</a>' +
            '<a href="#">Privacy Policy</a>' +
            '<a href="#">Terms of Service</a>' +
        '</div>' +
    '</div>' +
    '<div class="footer-bottom">&copy; 2025 Hey Mate. All rights reserved. Built with care for learners everywhere.</div>';
}

/* --- Dark Mode Toggle --- */
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    var isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('hm_dark', isDark ? 'true' : 'false');
    // Update toggle icon
    var btn = document.querySelector('.dark-toggle');
    if (btn) btn.innerHTML = isDark ? '&#9728;' : '&#9790;';
}

/* --- Mobile Navigation Toggle --- */
function toggleMobileNav() {
    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('open');
}

/* --- Logout Handler --- */
function handleLogout() {
    logout();
    showToast('Logged out successfully', 'success');
    setTimeout(function() { window.location.href = 'index.html'; }, 500);
}

/* --- Toast Notification System --- */
function showToast(message, type) {
    type = type || 'info';
    var container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span>' + message + '</span><span class="toast-close" onclick="this.parentElement.remove()">&times;</span>';
    container.appendChild(toast);
    // Auto-remove after 3 seconds
    setTimeout(function() {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

/* --- Create Modal --- */
function showModal(title, contentHTML) {
    // Remove existing modal if any
    var existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = '<div class="modal-content">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<h3>' + title + '</h3>' +
        '<button class="btn-ghost" onclick="this.closest(\'.modal-overlay\').remove()" style="font-size:1.3rem;">&times;</button>' +
        '</div>' +
        '<div style="margin-top:1rem;">' + contentHTML + '</div>' +
    '</div>';
    document.body.appendChild(overlay);
}

/* --- Animate Counter (for hero stats) --- */
function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');
    counters.forEach(function(el) {
        var target = parseInt(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1500;
        var start = 0;
        var startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
}

/* --- Initialize common elements on every page --- */
document.addEventListener('DOMContentLoaded', function() {
    injectHeader();
    injectFooter();
    // Animate counters if present (hero section)
    if (document.querySelector('[data-count]')) {
        animateCounters();
    }
    // Close mobile nav when clicking a link
    document.addEventListener('click', function(e) {
        var nav = document.getElementById('navLinks');
        if (nav && nav.classList.contains('open') && e.target.closest('.nav-links a')) {
            nav.classList.remove('open');
        }
    });
});