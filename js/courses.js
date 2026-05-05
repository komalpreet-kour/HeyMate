/* ============================================
   HEY MATE LMS - Courses Page Logic
   Renders course cards, search, and category filter.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    var coursesGrid = document.getElementById('coursesGrid');
    var searchInput = document.getElementById('searchInput');
    var filterBar = document.getElementById('filterBar');
    var noResults = document.getElementById('noResults');

    if (!coursesGrid) return; // Not on courses page

    var courses = getCourses();
    var categories = getCategories();
    var activeFilter = 'All';

    // Check if category passed via URL parameter
    var urlParams = new URLSearchParams(window.location.search);
    var urlCat = urlParams.get('cat');
    if (urlCat) activeFilter = urlCat;

    // --- Render filter buttons ---
    function renderFilters() {
        var html = '<button class="filter-btn' + (activeFilter === 'All' ? ' active' : '') + '" data-cat="All">All Courses</button>';
        categories.forEach(function(cat) {
            html += '<button class="filter-btn' + (activeFilter === cat.name ? ' active' : '') + '" data-cat="' + cat.name + '">' + cat.icon + ' ' + cat.name + '</button>';
        });
        if (filterBar) filterBar.innerHTML = html;

        // Attach click events to filter buttons
        filterBar.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                activeFilter = this.getAttribute('data-cat');
                filterBar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                renderCourses();
            });
        });
    }

    // --- Render a single course card ---
    function courseCardHTML(course) {
        var stars = '&#9733;'.repeat(Math.floor(course.rating)) + (course.rating % 1 >= 0.5 ? '&#9734;' : '');
        return '<div class="card course-card fade-in">' +
            '<div class="card-image">' +
                '<img src="' + course.image + '" alt="' + course.title + '" loading="lazy">' +
                '<span class="card-badge badge badge-primary">' + course.level + '</span>' +
                '<span class="card-price">$' + course.price.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="card-body">' +
                '<div class="card-category">' + course.category + '</div>' +
                '<h3 class="card-title">' + course.title + '</h3>' +
                '<div class="card-meta">' +
                    '<span class="stars">' + stars + ' ' + course.rating + '</span>' +
                    '<span>' + course.students.toLocaleString() + ' students</span>' +
                    '<span>' + course.duration + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="card-footer">' +
                '<div class="card-instructor">' +
                    '<img src="' + course.instructor.avatar + '" alt="' + course.instructor.instructor + '" class="avatar avatar-sm">' +
                    '<span>' + course.instructor.name + '</span>' +
                '</div>' +
                '<a href="course.html?id=' + course.id + '" class="btn btn-sm btn-outline">View</a>' +
            '</div>' +
        '</div>';
    }

    // --- Render filtered courses ---
    function renderCourses() {
        var searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        var filtered = courses.filter(function(c) {
            var matchCat = activeFilter === 'All' || c.category === activeFilter;
            var matchSearch = !searchTerm ||
                c.title.toLowerCase().includes(searchTerm) ||
                c.category.toLowerCase().includes(searchTerm) ||
                c.instructor.name.toLowerCase().includes(searchTerm);
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            coursesGrid.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
            coursesGrid.innerHTML = filtered.map(courseCardHTML).join('');
        }
    }

    // --- Search input event ---
    if (searchInput) {
        searchInput.addEventListener('input', renderCourses);
    }

    // --- Initial render ---
    renderFilters();
    renderCourses();
});