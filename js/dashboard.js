/* ============================================
   HEY MATE LMS - Student Dashboard Logic
   Shows enrolled courses, progress, and stats.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Guard: must be logged in
    if (!requireLogin()) return;

    var user = getCurrentUser();
    var courses = getCourses();
    var enrollments = getEnrollments();
    var progress = getProgress();
    var quizResults = getQuizResults();

    // Update welcome section
    var welcomeName = document.getElementById('welcomeName');
    if (welcomeName) welcomeName.textContent = user.name;

    // Get courses this user is enrolled in
    var myEnrollments = enrollments.filter(function(e) { return e.userId === user.id; });

    // --- Calculate Stats ---
    var totalEnrolled = myEnrollments.length;
    var completedCount = 0;
    var totalProgress = 0;
    var quizzesTaken = 0;

    myEnrollments.forEach(function(enr) {
        var course = courses.find(function(c) { return c.id === enr.courseId; });
        if (!course) return;
        var totalLessons = getTotalLessons(course);
        var completedLessons = (progress[enr.courseId] || []).length;
        var pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        totalProgress += pct;
        if (pct === 100) completedCount++;
        if (quizResults[user.id + '_' + enr.courseId]) quizzesTaken++;
    });
    var avgProgress = totalEnrolled > 0 ? Math.round(totalProgress / totalEnrolled) : 0;

    // Render stats
    var statsGrid = document.getElementById('dashStats');
    if (statsGrid) {
        statsGrid.innerHTML =
            '<div class="dash-stat-card"><div class="stat-num">' + totalEnrolled + '</div><div class="stat-label">Enrolled Courses</div></div>' +
            '<div class="dash-stat-card"><div class="stat-num">' + completedCount + '</div><div class="stat-label">Completed</div></div>' +
            '<div class="dash-stat-card"><div class="stat-num">' + avgProgress + '%</div><div class="stat-label">Avg. Progress</div></div>' +
            '<div class="dash-stat-card"><div class="stat-num">' + quizzesTaken + '</div><div class="stat-label">Quizzes Taken</div></div>';
    }

    // --- Render In-Progress Courses ---
    var inProgressContainer = document.getElementById('inProgressCourses');
    var inProgress = myEnrollments.filter(function(enr) {
        var course = courses.find(function(c) { return c.id === enr.courseId; });
        if (!course) return false;
        var totalLessons = getTotalLessons(course);
        var completedLessons = (progress[enr.courseId] || []).length;
        return completedLessons < totalLessons;
    });

    if (inProgressContainer) {
        if (inProgress.length === 0) {
            inProgressContainer.innerHTML = '<div class="empty-state"><div class="es-icon">&#128218;</div><h3>No courses in progress</h3><p>Browse our catalog and enroll in a course to get started.</p><a href="courses.html" class="btn btn-primary">Browse Courses</a></div>';
        } else {
            inProgressContainer.innerHTML = inProgress.map(function(enr) {
                return renderEnrolledCard(enr, courses, progress, user);
            }).join('');
        }
    }

    // --- Render Completed Courses ---
    var completedContainer = document.getElementById('completedCourses');
    var completed = myEnrollments.filter(function(enr) {
        var course = courses.find(function(c) { return c.id === enr.courseId; });
        if (!course) return false;
        var totalLessons = getTotalLessons(course);
        var completedLessons = (progress[enr.courseId] || []).length;
        return completedLessons >= totalLessons;
    });

    if (completedContainer) {
        if (completed.length === 0) {
            completedContainer.innerHTML = '<div class="empty-state"><div class="es-icon">&#127942;</div><h3>No completed courses yet</h3><p>Finish all lessons in a course to see it here.</p></div>';
        } else {
            completedContainer.innerHTML = completed.map(function(enr) {
                return renderEnrolledCard(enr, courses, progress, user, true);
            }).join('');
        }
    }
});

/* --- Render a single enrolled course card --- */
function renderEnrolledCard(enr, courses, progress, user, isCompleted) {
    var course = courses.find(function(c) { return c.id === enr.courseId; });
    if (!course) return '';
    var totalLessons = getTotalLessons(course);
    var completedLessons = (progress[enr.courseId] || []).length;
    var pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Find next incomplete lesson
    var allLessons = getAllLessons(course);
    var nextLesson = allLessons.find(function(l) {
        return (progress[enr.courseId] || []).indexOf(l.id) === -1;
    });

    // Check if quiz passed
    var quizKey = user.id + '_' + course.id;
    var quizResult = JSON.parse(localStorage.getItem('hm_quiz_results') || '{}')[quizKey];
    var quizPassed = quizResult && quizResult.score >= 70;

    var actionsHTML = '';
    if (isCompleted) {
        actionsHTML = '<a href="quiz.html?courseId=' + course.id + '" class="btn btn-sm ' + (quizPassed ? 'btn-secondary' : 'btn-primary') + '">' + (quizPassed ? 'View Certificate' : 'Take Quiz') + '</a>';
        if (quizPassed) {
            actionsHTML += '<a href="certificate.html?courseId=' + course.id + '" class="btn btn-sm btn-outline">Certificate</a>';
        }
    } else {
        if (nextLesson) {
            actionsHTML = '<a href="lesson.html?courseId=' + course.id + '&lessonId=' + nextLesson.id + '" class="btn btn-sm btn-primary">Resume</a>';
        } else {
            actionsHTML = '<a href="quiz.html?courseId=' + course.id + '" class="btn btn-sm btn-secondary">Take Quiz</a>';
        }
    }

    return '<div class="enrolled-card fade-in">' +
        '<div class="ec-image"><img src="' + course.image + '" alt="' + course.title + '"></div>' +
        '<div class="ec-info">' +
            '<div class="ec-title">' + course.title + '</div>' +
            '<div class="ec-meta">' + course.instructor.name + ' &middot; ' + course.category + '</div>' +
            '<div class="progress-text">' + completedLessons + ' / ' + totalLessons + ' lessons &middot; ' + pct + '%</div>' +
            '<div class="progress-bar-container"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>' +
        '</div>' +
        '<div class="ec-actions">' + actionsHTML + '</div>' +
    '</div>';
}