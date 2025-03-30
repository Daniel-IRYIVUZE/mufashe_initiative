import { currentUser } from './api.js';

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dashboardSidebar = document.querySelector('.dashboard-sidebar');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    dashboardSidebar.classList.toggle('active');
}

// Handle Logout
function handleLogout() {
    // In a real app, this would call an API to invalidate the session
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = 'login.html';
}

// Initialize Event Listeners
function initEventListeners() {
    themeToggleBtn.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Initialize App
function initApp() {
    initTheme();
    initEventListeners();
    
    // Display current user info
    if (currentUser) {
        const userAvatar = document.getElementById('userAvatar');
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        
        if (userAvatar) userAvatar.src = currentUser.avatar;
        if (sidebarAvatar) sidebarAvatar.src = currentUser.avatar;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);