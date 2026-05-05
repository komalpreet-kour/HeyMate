/* ============================================
   HEY MATE LMS - Authentication Module
   Handles login, signup, logout, and auth state.
   Uses localStorage to simulate backend auth.
   ============================================ */

/* --- Get currently logged-in user --- */
function getCurrentUser() {
    var user = localStorage.getItem('hm_current_user');
    return user ? JSON.parse(user) : null;
}

/* --- Check if user is logged in --- */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

/* --- Check if current user is admin --- */
function isAdmin() {
    var user = getCurrentUser();
    return user !== null && user.role === 'admin';
}

/* --- Login: validate email & password against stored users --- */
function login(email, password) {
    var users = getUsers();
    var found = users.find(function(u) {
        return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
    });
    if (found) {
        localStorage.setItem('hm_current_user', JSON.stringify(found));
        return { success: true, user: found };
    }
    return { success: false, message: 'Invalid email or password.' };
}

/* --- Signup: create new student account --- */
function signup(name, email, password) {
    var users = getUsers();
    // Check if email already exists
    var exists = users.find(function(u) {
        return u.email.toLowerCase() === email.toLowerCase();
    });
    if (exists) {
        return { success: false, message: 'An account with this email already exists.' };
    }
    // Create new user
    var newUser = {
        id: 'stu' + Date.now(),
        name: name,
        email: email,
        password: password,
        role: 'student',
        joined: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem('hm_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
}

/* --- Logout: clear current user --- */
function logout() {
    localStorage.removeItem('hm_current_user');
}

/* --- Require login: redirect to login page if not authenticated --- */
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/* --- Require admin: redirect to home if not admin --- */
function requireAdmin() {
    if (!isAdmin()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}