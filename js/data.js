/* ============================================
   HEY MATE LMS - Mock Data & Initialization
   All courses, quizzes, and seed data stored here.
   Data persists in localStorage after first load.
   ============================================ */

(function initMockData() {
    // Skip if data already seeded
    if (localStorage.getItem('hm_initialized')) return;

    // --- Categories ---
    const categories = [
        { id: 1, name: 'Web Development', icon: '\u{1F310}', count: 2 },
        { id: 2, name: 'Data Science', icon: '\u{1F4CA}', count: 1 },
        { id: 3, name: 'Design', icon: '\u{1F3A8}', count: 2 },
        { id: 4, name: 'Mobile Development', icon: '\u{1F4F1}', count: 1 },
        { id: 5, name: 'Marketing', icon: '\u{1F4E2}', count: 1 },
        { id: 6, name: 'AI & Machine Learning', icon: '\u{1F916}', count: 1 }
    ];

    // --- Courses (8 total) ---
    const courses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp',
            description: 'Learn HTML, CSS, JavaScript, and modern frameworks from scratch. Build 10+ real-world projects and become a confident full-stack web developer ready for the industry.',
            instructor: { name: 'Alex Morgan', avatar: 'https://picsum.photos/seed/alex/100/100', bio: 'Senior Full-Stack Developer with 10+ years of experience at top tech companies.' },
            category: 'Web Development',
            price: 49.99,
            rating: 4.8,
            students: 15420,
            duration: '42 hours',
            level: 'Beginner',
            image: 'https://picsum.photos/seed/webdev/600/400',
            modules: [
                { title: 'HTML Fundamentals', lessons: [
                    { id: 101, title: 'Introduction to HTML', duration: '15 min', type: 'video' },
                    { id: 102, title: 'HTML Elements & Tags', duration: '25 min', type: 'video' },
                    { id: 103, title: 'Forms & Inputs', duration: '20 min', type: 'video' },
                    { id: 104, title: 'HTML Practice Exercise', duration: '30 min', type: 'text' }
                ]},
                { title: 'CSS Styling', lessons: [
                    { id: 105, title: 'CSS Selectors & Specificity', duration: '20 min', type: 'video' },
                    { id: 106, title: 'Box Model & Layout', duration: '30 min', type: 'video' },
                    { id: 107, title: 'Flexbox Deep Dive', duration: '35 min', type: 'video' },
                    { id: 108, title: 'CSS Grid Mastery', duration: '40 min', type: 'video' }
                ]},
                { title: 'JavaScript Essentials', lessons: [
                    { id: 109, title: 'Variables & Data Types', duration: '25 min', type: 'video' },
                    { id: 110, title: 'Functions & Scope', duration: '30 min', type: 'video' },
                    { id: 111, title: 'DOM Manipulation', duration: '35 min', type: 'video' },
                    { id: 112, title: 'Events & Event Handling', duration: '25 min', type: 'video' },
                    { id: 113, title: 'JavaScript Mini Project', duration: '45 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 2,
            title: 'Python for Data Science',
            description: 'Master Python programming for data analysis, visualization, and machine learning. Work with pandas, numpy, matplotlib, and scikit-learn on real datasets.',
            instructor: { name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100', bio: 'Data Scientist at TechCorp, PhD in Statistics from MIT.' },
            category: 'Data Science',
            price: 59.99,
            rating: 4.9,
            students: 12350,
            duration: '38 hours',
            level: 'Intermediate',
            image: 'https://picsum.photos/seed/pydata/600/400',
            modules: [
                { title: 'Python Basics Refresher', lessons: [
                    { id: 201, title: 'Python Setup & Environment', duration: '15 min', type: 'video' },
                    { id: 202, title: 'Data Structures in Python', duration: '30 min', type: 'video' },
                    { id: 203, title: 'List Comprehensions & Lambdas', duration: '25 min', type: 'video' }
                ]},
                { title: 'Data Analysis with Pandas', lessons: [
                    { id: 204, title: 'Introduction to DataFrames', duration: '30 min', type: 'video' },
                    { id: 205, title: 'Data Cleaning Techniques', duration: '35 min', type: 'video' },
                    { id: 206, title: 'GroupBy & Aggregation', duration: '40 min', type: 'text' }
                ]},
                { title: 'Data Visualization', lessons: [
                    { id: 207, title: 'Matplotlib Basics', duration: '25 min', type: 'video' },
                    { id: 208, title: 'Seaborn for Statistical Plots', duration: '30 min', type: 'video' },
                    { id: 209, title: 'Building a Data Dashboard', duration: '45 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 3,
            title: 'UI/UX Design Masterclass',
            description: 'Learn user interface and user experience design from scratch. Master design thinking, wireframing, prototyping, and usability testing principles.',
            instructor: { name: 'Maya Patel', avatar: 'https://picsum.photos/seed/maya/100/100', bio: 'Lead UX Designer at a Fortune 500 company with 8 years of experience.' },
            category: 'Design',
            price: 39.99,
            rating: 4.7,
            students: 9870,
            duration: '28 hours',
            level: 'Beginner',
            image: 'https://picsum.photos/seed/uiux/600/400',
            modules: [
                { title: 'Design Thinking Fundamentals', lessons: [
                    { id: 301, title: 'What is UX Design?', duration: '20 min', type: 'video' },
                    { id: 302, title: 'Empathy & User Research', duration: '30 min', type: 'video' },
                    { id: 303, title: 'Defining User Personas', duration: '25 min', type: 'text' }
                ]},
                { title: 'Wireframing & Prototyping', lessons: [
                    { id: 304, title: 'Low-Fidelity Wireframes', duration: '25 min', type: 'video' },
                    { id: 305, title: 'High-Fidelity Prototypes', duration: '35 min', type: 'video' },
                    { id: 306, title: 'Interactive Prototype Exercise', duration: '40 min', type: 'text' }
                ]},
                { title: 'Visual Design Principles', lessons: [
                    { id: 307, title: 'Color Theory for UI', duration: '20 min', type: 'video' },
                    { id: 308, title: 'Typography Best Practices', duration: '25 min', type: 'video' },
                    { id: 309, title: 'Design a Complete App Screen', duration: '50 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 4,
            title: 'React Native Mobile Apps',
            description: 'Build cross-platform mobile applications for iOS and Android using React Native. From setup to deployment on app stores.',
            instructor: { name: 'James Wilson', avatar: 'https://picsum.photos/seed/james/100/100', bio: 'Mobile Developer who has published 20+ apps on App Store and Play Store.' },
            category: 'Mobile Development',
            price: 54.99,
            rating: 4.6,
            students: 7640,
            duration: '35 hours',
            level: 'Intermediate',
            image: 'https://picsum.photos/seed/reactnative/600/400',
            modules: [
                { title: 'React Native Setup', lessons: [
                    { id: 401, title: 'Environment Setup', duration: '20 min', type: 'video' },
                    { id: 402, title: 'Creating Your First App', duration: '25 min', type: 'video' },
                    { id: 403, title: 'Understanding Components', duration: '30 min', type: 'video' }
                ]},
                { title: 'Core Components & Navigation', lessons: [
                    { id: 404, title: 'Views, Text & Images', duration: '25 min', type: 'video' },
                    { id: 405, title: 'Navigation & Routing', duration: '35 min', type: 'video' },
                    { id: 406, title: 'Build a Multi-Screen App', duration: '45 min', type: 'text' }
                ]},
                { title: 'Advanced Features', lessons: [
                    { id: 407, title: 'API Integration', duration: '30 min', type: 'video' },
                    { id: 408, title: 'State Management', duration: '35 min', type: 'video' },
                    { id: 409, title: 'Build a Full Social App', duration: '60 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 5,
            title: 'Digital Marketing Strategy',
            description: 'Comprehensive digital marketing course covering SEO, social media marketing, email campaigns, content strategy, and analytics.',
            instructor: { name: 'Lisa Rodriguez', avatar: 'https://picsum.photos/seed/lisa/100/100', bio: 'Marketing Director with 12+ years of experience in digital growth strategies.' },
            category: 'Marketing',
            price: 34.99,
            rating: 4.5,
            students: 11200,
            duration: '24 hours',
            level: 'Beginner',
            image: 'https://picsum.photos/seed/digimarket/600/400',
            modules: [
                { title: 'Marketing Foundations', lessons: [
                    { id: 501, title: 'Digital Marketing Landscape', duration: '20 min', type: 'video' },
                    { id: 502, title: 'Setting Marketing Goals', duration: '15 min', type: 'video' },
                    { id: 503, title: 'Target Audience Analysis', duration: '25 min', type: 'text' }
                ]},
                { title: 'SEO & Content Marketing', lessons: [
                    { id: 504, title: 'SEO Fundamentals', duration: '30 min', type: 'video' },
                    { id: 505, title: 'Keyword Research Strategies', duration: '25 min', type: 'video' },
                    { id: 506, title: 'Content Calendar Creation', duration: '30 min', type: 'text' }
                ]},
                { title: 'Social Media & Analytics', lessons: [
                    { id: 507, title: 'Platform-Specific Strategies', duration: '25 min', type: 'video' },
                    { id: 508, title: 'Email Marketing Campaigns', duration: '30 min', type: 'video' },
                    { id: 509, title: 'Marketing Analytics Dashboard', duration: '35 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 6,
            title: 'Machine Learning Fundamentals',
            description: 'Understand the core concepts of machine learning including supervised learning, neural networks, and model evaluation with hands-on Python projects.',
            instructor: { name: 'Dr. Kevin Park', avatar: 'https://picsum.photos/seed/kevin/100/100', bio: 'AI Research Scientist with publications in top ML conferences.' },
            category: 'AI & Machine Learning',
            price: 69.99,
            rating: 4.8,
            students: 8930,
            duration: '45 hours',
            level: 'Advanced',
            image: 'https://picsum.photos/seed/mlfund/600/400',
            modules: [
                { title: 'ML Foundations', lessons: [
                    { id: 601, title: 'What is Machine Learning?', duration: '20 min', type: 'video' },
                    { id: 602, title: 'Types of Learning', duration: '25 min', type: 'video' },
                    { id: 603, title: 'Setting Up ML Environment', duration: '15 min', type: 'video' }
                ]},
                { title: 'Supervised Learning', lessons: [
                    { id: 604, title: 'Linear Regression', duration: '30 min', type: 'video' },
                    { id: 605, title: 'Classification Algorithms', duration: '35 min', type: 'video' },
                    { id: 606, title: 'Build a Prediction Model', duration: '45 min', type: 'text' }
                ]},
                { title: 'Neural Networks Intro', lessons: [
                    { id: 607, title: 'Perceptrons & Layers', duration: '30 min', type: 'video' },
                    { id: 608, title: 'Activation Functions', duration: '25 min', type: 'video' },
                    { id: 609, title: 'Build Your First Neural Net', duration: '50 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 7,
            title: 'Advanced JavaScript Patterns',
            description: 'Deep dive into advanced JavaScript concepts: closures, prototypes, async patterns, design patterns, and performance optimization techniques.',
            instructor: { name: 'Alex Morgan', avatar: 'https://picsum.photos/seed/alex/100/100', bio: 'Senior Full-Stack Developer with 10+ years of experience.' },
            category: 'Web Development',
            price: 44.99,
            rating: 4.7,
            students: 6540,
            duration: '30 hours',
            level: 'Advanced',
            image: 'https://picsum.photos/seed/advjs/600/400',
            modules: [
                { title: 'Closures & Scope', lessons: [
                    { id: 701, title: 'Lexical Scope Deep Dive', duration: '25 min', type: 'video' },
                    { id: 702, title: 'Closures in Practice', duration: '30 min', type: 'video' },
                    { id: 703, title: 'Closure Challenges', duration: '35 min', type: 'text' }
                ]},
                { title: 'Async JavaScript', lessons: [
                    { id: 704, title: 'Promises & Async/Await', duration: '30 min', type: 'video' },
                    { id: 705, title: 'Event Loop Mechanics', duration: '35 min', type: 'video' },
                    { id: 706, title: 'Async Patterns Exercise', duration: '40 min', type: 'text' }
                ]},
                { title: 'Design Patterns', lessons: [
                    { id: 707, title: 'Module & Observer Patterns', duration: '30 min', type: 'video' },
                    { id: 708, title: 'Factory & Singleton Patterns', duration: '25 min', type: 'video' },
                    { id: 709, title: 'Pattern Implementation Project', duration: '50 min', type: 'text' }
                ]}
            ]
        },
        {
            id: 8,
            title: 'Figma for Beginners',
            description: 'Learn Figma from zero to hero. Master the interface, components, auto layout, prototyping, and collaborative design workflows.',
            instructor: { name: 'Maya Patel', avatar: 'https://picsum.photos/seed/maya/100/100', bio: 'Lead UX Designer at a Fortune 500 company.' },
            category: 'Design',
            price: 29.99,
            rating: 4.6,
            students: 8210,
            duration: '18 hours',
            level: 'Beginner',
            image: 'https://picsum.photos/seed/figma/600/400',
            modules: [
                { title: 'Figma Interface', lessons: [
                    { id: 801, title: 'Getting Started with Figma', duration: '15 min', type: 'video' },
                    { id: 802, title: 'Tools & Shortcuts', duration: '20 min', type: 'video' },
                    { id: 803, title: 'Your First Design', duration: '30 min', type: 'text' }
                ]},
                { title: 'Components & Auto Layout', lessons: [
                    { id: 804, title: 'Creating Components', duration: '25 min', type: 'video' },
                    { id: 805, title: 'Auto Layout Magic', duration: '30 min', type: 'video' },
                    { id: 806, title: 'Design System Exercise', duration: '40 min', type: 'text' }
                ]},
                { title: 'Prototyping & Collaboration', lessons: [
                    { id: 807, title: 'Interactive Prototypes', duration: '25 min', type: 'video' },
                    { id: 808, title: 'Team Collaboration Features', duration: '20 min', type: 'video' },
                    { id: 809, title: 'Complete App Prototype', duration: '45 min', type: 'text' }
                ]}
            ]
        }
    ];

    // --- Quiz Data (5 questions per course) ---
    const quizzes = {
        1: [
            { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0 },
            { q: 'Which CSS property is used to create flexible layouts?', options: ['display: block', 'display: flex', 'display: inline', 'display: table'], correct: 1 },
            { q: 'What is the correct way to declare a JavaScript variable?', options: ['variable x = 5', 'let x = 5', 'v x = 5', 'declare x = 5'], correct: 1 },
            { q: 'Which HTML element is used for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correct: 2 },
            { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Colorful Style Sheets'], correct: 2 }
        ],
        2: [
            { q: 'Which library is primarily used for data manipulation in Python?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Flask'], correct: 1 },
            { q: 'What is a DataFrame in pandas?', options: ['A 1D array', 'A 2D labeled data structure', 'A graph object', 'A database connection'], correct: 1 },
            { q: 'Which function is used to read a CSV file in pandas?', options: ['pd.read_csv()', 'pd.open_csv()', 'pd.load_csv()', 'pd.import_csv()'], correct: 0 },
            { q: 'What does NaN represent in a dataset?', options: ['Not a Number / missing value', 'Zero', 'Negative number', 'Null string'], correct: 0 },
            { q: 'Which library is used for creating statistical visualizations?', options: ['NumPy', 'Pandas', 'Seaborn', 'Scikit-learn'], correct: 2 }
        ],
        3: [
            { q: 'What is the first step in the Design Thinking process?', options: ['Prototype', 'Define', 'Empathize', 'Ideate'], correct: 2 },
            { q: 'What is a wireframe?', options: ['A final design mockup', 'A low-fidelity layout blueprint', 'A color palette', 'A font pairing'], correct: 1 },
            { q: 'What does UX stand for?', options: ['User Experience', 'Universal Exchange', 'Unique Extension', 'User Extension'], correct: 0 },
            { q: 'Which principle states that elements close together are perceived as related?', options: ['Similarity', 'Proximity', 'Continuity', 'Closure'], correct: 1 },
            { q: 'What is a user persona?', options: ['A real user account', 'A fictional representation of a target user', 'A design template', 'A testing script'], correct: 1 }
        ],
        4: [
            { q: 'What framework is React Native based on?', options: ['Angular', 'Vue', 'React', 'Svelte'], correct: 2 },
            { q: 'Which command creates a new React Native project?', options: ['npm create-react-app', 'npx react-native init', 'npm start native', 'react-native new'], correct: 1 },
            { q: 'What is the basic building block of a React Native UI?', options: ['HTML elements', 'Components', 'CSS rules', 'Java classes'], correct: 1 },
            { q: 'Which component is used to display text in React Native?', options: ['<p>', '<span>', '<Text>', '<label>'], correct: 2 },
            { q: 'React Native allows you to build apps for which platforms?', options: ['iOS only', 'Android only', 'Both iOS and Android', 'Web only'], correct: 2 }
        ],
        5: [
            { q: 'What does SEO stand for?', options: ['Social Engine Optimization', 'Search Engine Optimization', 'Site Enhancement Operation', 'Search Email Outreach'], correct: 1 },
            { q: 'Which metric measures the percentage of visitors who leave after one page?', options: ['Conversion rate', 'Bounce rate', 'Click-through rate', 'Engagement rate'], correct: 1 },
            { q: 'What is the primary goal of content marketing?', options: ['Immediate sales', 'Building audience trust and value', 'Sending spam emails', 'Reducing ad spend'], correct: 1 },
            { q: 'Which platform is best for professional B2B marketing?', options: ['TikTok', 'Snapchat', 'LinkedIn', 'Pinterest'], correct: 2 },
            { q: 'What is an email open rate?', options: ['Total emails sent', 'Percentage of recipients who open an email', 'Number of clicks in an email', 'Unsubscribe count'], correct: 1 }
        ],
        6: [
            { q: 'What type of learning uses labeled training data?', options: ['Unsupervised learning', 'Reinforcement learning', 'Supervised learning', 'Transfer learning'], correct: 2 },
            { q: 'Which algorithm is commonly used for classification?', options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'PCA'], correct: 1 },
            { q: 'What is overfitting in machine learning?', options: ['Model performs well on new data', 'Model performs well only on training data', 'Model is too simple', 'Model trains too fast'], correct: 1 },
            { q: 'What is a neural network inspired by?', options: ['The internet', 'The human brain', 'Database structures', 'Computer hardware'], correct: 1 },
            { q: 'Which technique helps prevent overfitting?', options: ['Using more complex models', 'Adding more features', 'Regularization', 'Increasing training time'], correct: 2 }
        ],
        7: [
            { q: 'What is a closure in JavaScript?', options: ['A way to close a browser tab', 'A function with access to its outer scope', 'A method to end a loop', 'An error handling technique'], correct: 1 },
            { q: 'What does the async keyword do?', options: ['Makes a function run faster', 'Makes a function return a Promise', 'Makes code synchronous', 'Stops execution'], correct: 1 },
            { q: 'Which design pattern creates objects without specifying the exact class?', options: ['Singleton', 'Observer', 'Factory', 'Module'], correct: 2 },
            { q: 'What is the event loop responsible for?', options: ['Creating events', 'Managing the call stack and callback queue', 'Looping through arrays', 'Handling DOM events'], correct: 1 },
            { q: 'What is the output of: typeof null?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2 }
        ],
        8: [
            { q: 'What is Figma primarily used for?', options: ['Coding websites', 'UI/UX design', 'Video editing', 'Project management'], correct: 1 },
            { q: 'What is Auto Layout in Figma?', options: ['Automatic color selection', 'Responsive layout system', 'Auto-save feature', 'Automatic image export'], correct: 1 },
            { q: 'What is a Figma component?', options: ['A separate file', 'A reusable design element', 'A plugin', 'A color style'], correct: 1 },
            { q: 'How do multiple designers work together in Figma?', options: ['By emailing files', 'Through real-time collaboration', 'By merging code', 'Through version control only'], correct: 1 },
            { q: 'What can you create with Figma prototypes?', options: ['Only static images', 'Interactive click-through flows', 'Compiled mobile apps', 'Backend databases'], correct: 1 }
        ]
    };

    // --- Testimonials ---
    const testimonials = [
        { name: 'David Thompson', avatar: 'https://picsum.photos/seed/david/100/100', course: 'Web Development Bootcamp', quote: 'Hey Mate completely changed my career path. I went from zero coding knowledge to landing a junior developer job in just 6 months. The project-based approach made all the difference.', rating: 5 },
        { name: 'Emily Zhang', avatar: 'https://picsum.photos/seed/emily/100/100', course: 'Python for Data Science', quote: 'The Python Data Science course was incredibly well-structured. Each module built on the last, and the hands-on exercises with real datasets gave me confidence to tackle actual work projects.', rating: 5 },
        { name: 'Marcus Johnson', avatar: 'https://picsum.photos/seed/marcus/100/100', course: 'UI/UX Design Masterclass', quote: 'As someone switching from marketing to design, this course was perfect. The design thinking framework and practical exercises helped me build a portfolio that impressed hiring managers.', rating: 4 }
    ];

    // --- Seed Users ---
    const users = [
        { id: 'admin1', name: 'Admin User', email: 'admin@heymate.com', password: 'admin123', role: 'admin', joined: '2024-01-01' },
        { id: 'stu1', name: 'John Doe', email: 'john@heymate.com', password: 'john123', role: 'student', joined: '2024-03-15' }
    ];

    // --- Save everything to localStorage ---
    localStorage.setItem('hm_categories', JSON.stringify(categories));
    localStorage.setItem('hm_courses', JSON.stringify(courses));
    localStorage.setItem('hm_quizzes', JSON.stringify(quizzes));
    localStorage.setItem('hm_testimonials', JSON.stringify(testimonials));
    localStorage.setItem('hm_users', JSON.stringify(users));
    localStorage.setItem('hm_enrollments', JSON.stringify([]));
    localStorage.setItem('hm_progress', JSON.stringify({}));
    localStorage.setItem('hm_quiz_results', JSON.stringify({}));
    localStorage.setItem('hm_initialized', 'true');
})();

/* --- Helper: Get data from localStorage --- */
function getCourses() {
    return JSON.parse(localStorage.getItem('hm_courses')) || [];
}
function getCategories() {
    return JSON.parse(localStorage.getItem('hm_categories')) || [];
}
function getQuizzes() {
    return JSON.parse(localStorage.getItem('hm_quizzes')) || {};
}
function getTestimonials() {
    return JSON.parse(localStorage.getItem('hm_testimonials')) || [];
}
function getUsers() {
    return JSON.parse(localStorage.getItem('hm_users')) || [];
}
function getEnrollments() {
    return JSON.parse(localStorage.getItem('hm_enrollments')) || [];
}
function getProgress() {
    return JSON.parse(localStorage.getItem('hm_progress')) || {};
}
function getQuizResults() {
    return JSON.parse(localStorage.getItem('hm_quiz_results')) || {};
}

/* --- Helper: Save data to localStorage --- */
function saveCourses(data) { localStorage.setItem('hm_courses', JSON.stringify(data)); }
function saveUsers(data) { localStorage.setItem('hm_users', JSON.stringify(data)); }
function saveEnrollments(data) { localStorage.setItem('hm_enrollments', JSON.stringify(data)); }
function saveProgress(data) { localStorage.setItem('hm_progress', JSON.stringify(data)); }
function saveQuizResults(data) { localStorage.setItem('hm_quiz_results', JSON.stringify(data)); }

/* --- Helper: Get total lessons for a course --- */
function getTotalLessons(course) {
    let total = 0;
    course.modules.forEach(function(m) { total += m.lessons.length; });
    return total;
}

/* --- Helper: Get all lessons flat for a course --- */
function getAllLessons(course) {
    var lessons = [];
    course.modules.forEach(function(m) {
        m.lessons.forEach(function(l) {
            lessons.push(Object.assign({}, l, { moduleTitle: m.title }));
        });
    });
    return lessons;
}