/* ============================================
   HEY MATE LMS - Quiz Page Logic
   Handles quiz rendering, timer, scoring, and saving results.
   ============================================ */

var quizState = {
    courseId: null,
    questions: [],
    currentQuestion: 0,
    answers: [],
    timeLeft: 900, // 15 minutes in seconds
    timerInterval: null,
    submitted: false
};

document.addEventListener('DOMContentLoaded', function() {
    if (!requireLogin()) return;

    // Get course ID from URL
    var params = new URLSearchParams(window.location.search);
    var courseId = parseInt(params.get('courseId'));
    if (!courseId) { window.location.href = 'courses.html'; return; }

    var quizzes = getQuizzes();
    var questions = quizzes[courseId];
    if (!questions || questions.length === 0) {
        document.getElementById('quizContent').innerHTML = '<div class="empty-state"><div class="es-icon">&#10060;</div><h3>No quiz available</h3><p>This course does not have a quiz yet.</p></div>';
        return;
    }

    // Initialize quiz state
    quizState.courseId = courseId;
    quizState.questions = questions;
    quizState.answers = new Array(questions.length).fill(-1);

    // Set quiz title
    var courses = getCourses();
    var course = courses.find(function(c) { return c.id === courseId; });
    var quizTitle = document.getElementById('quizTitle');
    if (quizTitle && course) quizTitle.textContent = course.title + ' - Quiz';

    // Start timer
    startTimer();
    // Render first question
    renderQuestion();
});

/* --- Timer Logic --- */
function startTimer() {
    var timerEl = document.getElementById('quizTimer');
    updateTimerDisplay(timerEl);

    quizState.timerInterval = setInterval(function() {
        quizState.timeLeft--;
        updateTimerDisplay(timerEl);
        if (quizState.timeLeft <= 0) {
            clearInterval(quizState.timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay(el) {
    if (!el) return;
    var mins = Math.floor(quizState.timeLeft / 60);
    var secs = quizState.timeLeft % 60;
    el.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    if (quizState.timeLeft <= 60) {
        el.parentElement.classList.add('warning');
    } else {
        el.parentElement.classList.remove('warning');
    }
}

/* --- Render Current Question --- */
function renderQuestion() {
    var container = document.getElementById('quizContent');
    if (!container) return;

    var q = quizState.questions[quizState.currentQuestion];
    var idx = quizState.currentQuestion;
    var total = quizState.questions.length;
    var letters = ['A', 'B', 'C', 'D'];

    // Update progress
    var progressFill = document.getElementById('quizProgressFill');
    var progressText = document.getElementById('quizProgressText');
    if (progressFill) progressFill.style.width = ((idx + 1) / total * 100) + '%';
    if (progressText) progressText.textContent = 'Question ' + (idx + 1) + ' of ' + total;

    var html = '<div class="quiz-question-card fade-in">' +
        '<div class="q-number">Question ' + (idx + 1) + ' of ' + total + '</div>' +
        '<div class="q-text">' + q.q + '</div>';

    q.options.forEach(function(opt, i) {
        var selected = quizState.answers[idx] === i ? ' selected' : '';
        html += '<div class="quiz-option' + selected + '" onclick="selectAnswer(' + i + ')">' +
            '<span class="opt-letter">' + letters[i] + '</span>' +
            '<span>' + opt + '</span>' +
        '</div>';
    });

    html += '</div>';

    // Navigation buttons
    html += '<div class="quiz-nav">';
    html += '<button class="btn btn-outline" onclick="prevQuestion()"' + (idx === 0 ? ' disabled' : '') + '>&larr; Previous</button>';
    if (idx < total - 1) {
        html += '<button class="btn btn-primary" onclick="nextQuestion()">Next &rarr;</button>';
    } else {
        html += '<button class="btn btn-primary" onclick="submitQuiz()">Submit Quiz</button>';
    }
    html += '</div>';

    container.innerHTML = html;
}

/* --- Select an answer --- */
function selectAnswer(optionIndex) {
    if (quizState.submitted) return;
    quizState.answers[quizState.currentQuestion] = optionIndex;
    renderQuestion();
}

/* --- Navigate questions --- */
function nextQuestion() {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
        quizState.currentQuestion++;
        renderQuestion();
    }
}
function prevQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        renderQuestion();
    }
}

/* --- Submit & Score the Quiz --- */
function submitQuiz() {
    if (quizState.submitted) return;
    quizState.submitted = true;
    clearInterval(quizState.timerInterval);

    var questions = quizState.questions;
    var answers = quizState.answers;
    var correctCount = 0;

    questions.forEach(function(q, i) {
        if (answers[i] === q.correct) correctCount++;
    });

    var score = Math.round((correctCount / questions.length) * 100);
    var passed = score >= 70;

    // Save result to localStorage
    var user = getCurrentUser();
    var results = getQuizResults();
    results[user.id + '_' + quizState.courseId] = {
        score: score,
        correct: correctCount,
        total: questions.length,
        passed: passed,
        date: new Date().toISOString().split('T')[0]
    };
    saveQuizResults(results);

    // Show result screen
    var container = document.getElementById('quizContent');
    var statusClass = passed ? 'pass' : 'fail';
    var statusText = passed ? 'Congratulations! You Passed!' : 'Keep Trying! You Need 70% to Pass';

    var html = '<div class="quiz-result fade-in">' +
        '<div class="result-score">' + score + '%</div>' +
        '<div class="result-label">' + correctCount + ' out of ' + questions.length + ' correct</div>' +
        '<div class="result-status ' + statusClass + '">' + statusText + '</div>' +
        '<div class="result-actions">' +
            (passed ? '<a href="certificate.html?courseId=' + quizState.courseId + '" class="btn btn-primary">View Certificate</a>' : '') +
            '<button class="btn btn-outline" onclick="retryQuiz()">Retry Quiz</button>' +
            '<a href="dashboard.html" class="btn btn-ghost">Back to Dashboard</a>' +
        '</div>' +
    '</div>';

    container.innerHTML = html;
}

/* --- Retry Quiz --- */
function retryQuiz() {
    quizState.currentQuestion = 0;
    quizState.answers = new Array(quizState.questions.length).fill(-1);
    quizState.timeLeft = 900;
    quizState.submitted = false;
    startTimer();
    renderQuestion();
}