/* ============================================
   HEY MATE LMS - Admin Panel Logic
   CRUD for courses, view users & enrollments.
   All changes saved to localStorage.
   ============================================ */

var adminEditingId = null; // Track which course is being edited

document.addEventListener('DOMContentLoaded', function() {
    // Guard: must be admin
    if (!requireAdmin()) return;

    // --- Tab Switching ---
    var tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            var target = this.getAttribute('data-tab');
            document.querySelectorAll('.admin-panel').forEach(function(p) { p.classList.remove('active'); });
            var panel = document.getElementById('panel-' + target);
            if (panel) panel.classList.add('active');
        });
    });

    // Load all panels
    renderAdminCourses();
    renderAdminUsers();
    renderAdminEnrollments();
});

/* --- RENDER COURSES TABLE --- */
function renderAdminCourses() {
    var tbody = document.getElementById('adminCoursesBody');
    if (!tbody) return;
    var courses = getCourses();

    if (courses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">No courses found.</td></tr>';
        return;
    }

    tbody.innerHTML = courses.map(function(c) {
        return '<tr>' +
            '<td><img src="' + c.image + '" style="width:60px;height:40px;object-fit:cover;border-radius:6px;" alt=""></td>' +
            '<td><strong>' + c.title + '</strong></td>' +
            '<td>' + c.category + '</td>' +
            '<td>$' + c.price.toFixed(2) + '</td>' +
            '<td>' + c.students.toLocaleString() + '</td>' +
            '<td>' +
                '<button class="btn btn-sm btn-outline" onclick="editCourse(' + c.id + ')">Edit</button> ' +
                '<button class="btn btn-sm btn-danger" onclick="deleteCourse(' + c.id + ')">Delete</button>' +
            '</td>' +
        '</tr>';
    }).join('');
}

/* --- RENDER USERS TABLE --- */
function renderAdminUsers() {
    var tbody = document.getElementById('adminUsersBody');
    if (!tbody) return;
    var users = getUsers();

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted);">No users found.</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(function(u) {
        return '<tr>' +
            '<td>' + u.id + '</td>' +
            '<td><strong>' + u.name + '</strong></td>' +
            '<td>' + u.email + '</td>' +
            '<td><span class="badge ' + (u.role === 'admin' ? 'badge-accent' : 'badge-primary') + '">' + u.role + '</span></td>' +
            '<td>' + u.joined + '</td>' +
        '</tr>';
    }).join('');
}

/* --- RENDER ENROLLMENTS TABLE --- */
function renderAdminEnrollments() {
    var tbody = document.getElementById('adminEnrollmentsBody');
    if (!tbody) return;
    var enrollments = getEnrollments();
    var users = getUsers();
    var courses = getCourses();

    if (enrollments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-muted);">No enrollments yet.</td></tr>';
        return;
    }

    tbody.innerHTML = enrollments.map(function(e) {
        var user = users.find(function(u) { return u.id === e.userId; });
        var course = courses.find(function(c) { return c.id === e.courseId; });
        return '<tr>' +
            '<td>' + (user ? user.name : 'Unknown') + '</td>' +
            '<td>' + (course ? course.title : 'Unknown') + '</td>' +
            '<td>' + e.enrolledDate + '</td>' +
            '<td><span class="badge badge-success">Active</span></td>' +
        '</tr>';
    }).join('');
}

/* --- ADD / EDIT COURSE FORM HANDLING --- */
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('adminCourseForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var title = document.getElementById('acf_title').value.trim();
        var category = document.getElementById('acf_category').value;
        var price = parseFloat(document.getElementById('acf_price').value);
        var level = document.getElementById('acf_level').value;
        var description = document.getElementById('acf_desc').value.trim();
        var instructorName = document.getElementById('acf_instructor').value.trim();

        // Basic validation
        if (!title || !category || isNaN(price) || !level || !description || !instructorName) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        var courses = getCourses();

        if (adminEditingId) {
            // --- EDIT existing course ---
            var idx = courses.findIndex(function(c) { return c.id === adminEditingId; });
            if (idx !== -1) {
                courses[idx].title = title;
                courses[idx].category = category;
                courses[idx].price = price;
                courses[idx].level = level;
                courses[idx].description = description;
                courses[idx].instructor.name = instructorName;
                saveCourses(courses);
                showToast('Course updated successfully!', 'success');
            }
            adminEditingId = null;
            document.getElementById('adminFormTitle').textContent = 'Add New Course';
        } else {
            // --- ADD new course ---
            var newId = courses.length > 0 ? Math.max.apply(null, courses.map(function(c) { return c.id; })) + 1 : 1;
            var seed = 'course' + newId + Date.now();
            courses.push({
                id: newId,
                title: title,
                description: description,
                instructor: { name: instructorName, avatar: 'https://picsum.photos/seed/' + seed + '/100/100', bio: 'Experienced instructor.' },
                category: category,
                price: price,
                rating: 0,
                students: 0,
                duration: '10 hours',
                level: level,
                image: 'https://picsum.photos/seed/' + seed + '/600/400',
                modules: [
                    { title: 'Getting Started', lessons: [
                        { id: newId * 100 + 1, title: 'Introduction', duration: '15 min', type: 'video' },
                        { id: newId * 100 + 2, title: 'Course Overview', duration: '10 min', type: 'video' }
                    ]}
                ]
            });
            saveCourses(courses);
            showToast('Course added successfully!', 'success');
        }

        form.reset();
        renderAdminCourses();
    });
});

/* --- Edit Course: populate form with course data --- */
function editCourse(id) {
    var courses = getCourses();
    var course = courses.find(function(c) { return c.id === id; });
    if (!course) return;

    adminEditingId = id;
    document.getElementById('acf_title').value = course.title;
    document.getElementById('acf_category').value = course.category;
    document.getElementById('acf_price').value = course.price;
    document.getElementById('acf_level').value = course.level;
    document.getElementById('acf_desc').value = course.description;
    document.getElementById('acf_instructor').value = course.instructor.name;
    document.getElementById('adminFormTitle').textContent = 'Edit Course';

    // Scroll to form
    document.getElementById('adminCourseForm').scrollIntoView({ behavior: 'smooth' });
    showToast('Editing: ' + course.title, 'warning');
}

/* --- Delete Course with confirmation --- */
function deleteCourse(id) {
    var courses = getCourses();
    var course = courses.find(function(c) { return c.id === id; });
    if (!course) return;

    showModal('Delete Course?',
        '<p style="color:var(--text-muted);margin-bottom:1.5rem;">Are you sure you want to delete <strong>"' + course.title + '"</strong>? This action cannot be undone.</p>' +
        '<div style="display:flex;gap:0.8rem;justify-content:flex-end;">' +
            '<button class="btn btn-outline" onclick="this.closest(\'.modal-overlay\').remove()">Cancel</button>' +
            '<button class="btn btn-danger" onclick="confirmDeleteCourse(' + id + ')">Delete</button>' +
        '</div>'
    );
}

function confirmDeleteCourse(id) {
    var courses = getCourses().filter(function(c) { return c.id !== id; });
    saveCourses(courses);
    // Also remove related enrollments
    var enrollments = getEnrollments().filter(function(e) { return e.courseId !== id; });
    saveEnrollments(enrollments);
    // Close modal
    var modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
    renderAdminCourses();
    renderAdminEnrollments();
    showToast('Course deleted.', 'success');
}