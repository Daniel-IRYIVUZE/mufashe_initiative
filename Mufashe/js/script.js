document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + '-theme');
    updateThemeIcon(savedTheme);
    
    themeSwitcher.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });
    
    function updateThemeIcon(theme) {
        const icon = themeSwitcher.querySelector('i');
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    // Animate stats counter
    const statItems = document.querySelectorAll('.stat-item h3');
    
    function animateStats() {
        statItems.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 2000; // Animation duration in ms
            const increment = target / (duration / 16); // Roughly 60fps
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.floor(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCount();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.mission-section, .stats-container, .success-stories, .join-section, .quick-links').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Story card like functionality
    document.querySelectorAll('.story-like').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                this.style.color = '#dc3545';
            } else {
                icon.classList.replace('fas', 'far');
                this.style.color = '';
            }
        });
    });
    
    // Form submission
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for joining! We will contact you soon.');
            this.reset();
        });
    }
    
    // Scroll to top button (could be added to footer)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Add scroll-to-top button styles dynamically
    const scrollToTopStyles = document.createElement('style');
    scrollToTopStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}, ${getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')});
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(scrollToTopStyles);
});
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switching
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme
    themeToggleBtn.addEventListener('click', function() {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Dashboard Sidebar Toggle for Mobile
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-content').prepend(sidebarToggle);
    
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        dashboardSidebar.classList.toggle('active');
    });
    
    // Check user role and show/hide mentor sections
    const userRole = localStorage.getItem('userRole') || 'mentee'; // Default to mentee
    const mentorSessionsWidget = document.getElementById('mentorSessionsWidget');
    
    if (userRole === 'mentor') {
        document.getElementById('userRoleDisplay').textContent = 'Mentor';
        mentorSessionsWidget.style.display = 'block';
        
        // Load mentor sessions
        loadMentorSessions();
    } else {
        mentorSessionsWidget.style.display = 'none';
    }
    
    // Session Modal
    const modal = document.getElementById('sessionModal');
    const addSessionBtn = document.getElementById('addSessionBtn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const sessionForm = document.getElementById('sessionForm');
    
    // Open modal for new session
    addSessionBtn.addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Add New Session';
        sessionForm.reset();
        modal.style.display = 'flex';
    });
    
    // Close modal
    function closeSessionModal() {
        modal.style.display = 'none';
    }
    
    closeModal.addEventListener('click', closeSessionModal);
    cancelBtn.addEventListener('click', closeSessionModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeSessionModal();
        }
    });
    
    // Session Form Submission
    sessionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const sessionId = document.getElementById('sessionId').value || Date.now().toString();
        const sessionData = {
            id: sessionId,
            menteeName: document.getElementById('menteeName').value,
            sessionDate: document.getElementById('sessionDate').value,
            sessionTime: document.getElementById('sessionTime').value,
            sessionType: document.getElementById('sessionType').value,
            sessionMode: document.getElementById('sessionMode').value,
            sessionNotes: document.getElementById('sessionNotes').value,
            status: 'upcoming' // Default status
        };
        
        saveSession(sessionData);
        closeSessionModal();
        loadMentorSessions();
    });
    
    // Session CRUD Functions
    function saveSession(session) {
        let sessions = JSON.parse(localStorage.getItem('mentorSessions')) || [];
        const existingIndex = sessions.findIndex(s => s.id === session.id);
        
        if (existingIndex >= 0) {
            sessions[existingIndex] = session; // Update existing
        } else {
            sessions.push(session); // Add new
        }
        
        localStorage.setItem('mentorSessions', JSON.stringify(sessions));
    }
    
    function loadMentorSessions() {
        const sessions = JSON.parse(localStorage.getItem('mentorSessions')) || [];
        const upcomingTab = document.getElementById('upcomingSessionsTab');
        const completedTab = document.getElementById('completedSessionsTab');
        const allTab = document.getElementById('allSessionsTab');
        
        // Clear existing content
        upcomingTab.innerHTML = '';
        completedTab.innerHTML = '';
        allTab.innerHTML = '';
        
        // Update stats
        const upcomingCount = sessions.filter(s => s.status === 'upcoming').length;
        const completedCount = sessions.filter(s => s.status === 'completed').length;
        
        document.getElementById('upcomingSessionsCount').textContent = upcomingCount;
        document.getElementById('completedSessionsCount').textContent = completedCount;
        
        if (sessions.length === 0) {
            const noSessions = document.createElement('p');
            noSessions.textContent = 'No sessions found. Add your first session!';
            noSessions.className = 'no-sessions';
            upcomingTab.appendChild(noSessions.cloneNode(true));
            completedTab.appendChild(noSessions.cloneNode(true));
            allTab.appendChild(noSessions.cloneNode(true));
            return;
        }
        
        sessions.forEach(session => {
            const sessionElement = createSessionElement(session);
            
            // Add to all tab
            allTab.appendChild(sessionElement.cloneNode(true));
            
            // Add to appropriate status tab
            if (session.status === 'upcoming') {
                upcomingTab.appendChild(sessionElement);
            } else if (session.status === 'completed') {
                completedTab.appendChild(sessionElement);
            }
        });
    }
    
    function createSessionElement(session) {
        const sessionDate = new Date(`${session.sessionDate}T${session.sessionTime}`);
        const formattedDate = sessionDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = sessionDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const sessionElement = document.createElement('div');
        sessionElement.className = 'session-item';
        sessionElement.innerHTML = `
            <div class="session-info">
                <h3>${session.menteeName}</h3>
                <div class="session-meta">
                    <span><i class="fas fa-calendar-day"></i> ${formattedDate}</span>
                    <span><i class="fas fa-clock"></i> ${formattedTime}</span>
                    <span><i class="fas fa-user-tag"></i> ${session.sessionType}</span>
                    <span><i class="fas fa-video"></i> ${session.sessionMode}</span>
                </div>
                <span class="session-status ${session.status}">
                    ${session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
            </div>
            <div class="session-actions">
                <button class="edit-btn" data-id="${session.id}"><i class="fas fa-edit"></i></button>
                ${session.status === 'upcoming' ? 
                    `<button class="complete-btn" data-id="${session.id}"><i class="fas fa-check"></i></button>
                     <button class="cancel-btn" data-id="${session.id}"><i class="fas fa-times"></i></button>` : 
                    ''}
            </div>
        `;
        
        // Add event listeners to action buttons
        sessionElement.querySelector('.edit-btn')?.addEventListener('click', () => editSession(session.id));
        sessionElement.querySelector('.complete-btn')?.addEventListener('click', () => updateSessionStatus(session.id, 'completed'));
        sessionElement.querySelector('.cancel-btn')?.addEventListener('click', () => updateSessionStatus(session.id, 'canceled'));
        
        return sessionElement;
    }
    
    function editSession(sessionId) {
        const sessions = JSON.parse(localStorage.getItem('mentorSessions')) || [];
        const session = sessions.find(s => s.id === sessionId);
        
        if (session) {
            document.getElementById('modalTitle').textContent = 'Edit Session';
            document.getElementById('sessionId').value = session.id;
            document.getElementById('menteeName').value = session.menteeName;
            document.getElementById('sessionDate').value = session.sessionDate;
            document.getElementById('sessionTime').value = session.sessionTime;
            document.getElementById('sessionType').value = session.sessionType;
            document.getElementById('sessionMode').value = session.sessionMode;
            document.getElementById('sessionNotes').value = session.sessionNotes;
            
            modal.style.display = 'flex';
        }
    }
    
    function updateSessionStatus(sessionId, status) {
        const sessions = JSON.parse(localStorage.getItem('mentorSessions')) || [];
        const sessionIndex = sessions.findIndex(s => s.id === sessionId);
        
        if (sessionIndex >= 0) {
            sessions[sessionIndex].status = status;
            localStorage.setItem('mentorSessions', JSON.stringify(sessions));
            loadMentorSessions();
        }
    }
    
    // Tab switching
    const tabs = document.querySelectorAll('.session-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            document.querySelectorAll('.session-list').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected content
            const tabId = this.getAttribute('data-tab') + 'SessionsTab';
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, you would call your logout API here
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
    
    // Initialize
    loadMentorSessions();
    
    // Sample data for first-time users
    if (userRole === 'mentor' && (!localStorage.getItem('mentorSessions') || JSON.parse(localStorage.getItem('mentorSessions')).length === 0)) {
        const sampleSessions = [
            {
                id: '1',
                menteeName: 'Alice M.',
                sessionDate: '2025-06-15',
                sessionTime: '14:00',
                sessionType: 'career',
                sessionMode: 'online',
                sessionNotes: 'Discuss career options in IT field',
                status: 'upcoming'
            },
            {
                id: '2',
                menteeName: 'Beatrice K.',
                sessionDate: '2025-06-10',
                sessionTime: '10:00',
                sessionType: 'education',
                sessionMode: 'in-person',
                sessionNotes: 'Review school application materials',
                status: 'completed'
            },
            {
                id: '3',
                menteeName: 'Grace U.',
                sessionDate: '2025-06-18',
                sessionTime: '16:00',
                sessionType: 'parenting',
                sessionMode: 'phone',
                sessionNotes: 'Discuss child care options',
                status: 'upcoming'
            }
        ];
        
        localStorage.setItem('mentorSessions', JSON.stringify(sampleSessions));
        loadMentorSessions();
    }
});