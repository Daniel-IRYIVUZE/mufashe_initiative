import { 
    API_ENDPOINTS, 
    currentUser, 
    fetchData, 
    postData, 
    updateData, 
    deleteData 
} from './api.js';

// DOM Elements
const usernameDisplay = document.getElementById('usernameDisplay');
const userRoleDisplay = document.getElementById('userRoleDisplay');
const sidebarAvatar = document.getElementById('sidebarAvatar');
const userAvatar = document.getElementById('userAvatar');
const upcomingSessionsCount = document.getElementById('upcomingSessionsCount');
const completedSessionsCount = document.getElementById('completedSessionsCount');
const menteesCount = document.getElementById('menteesCount');
const mentorRating = document.getElementById('mentorRating');
const upcomingEventsContainer = document.getElementById('upcomingEventsContainer');
const recentMenteeContainer = document.getElementById('recentMenteeContainer');
const communityUpdatesContainer = document.getElementById('communityUpdatesContainer');
const recentActivityContainer = document.getElementById('recentActivityContainer');
const upcomingSessionsTab = document.getElementById('upcomingSessionsTab');
const completedSessionsTab = document.getElementById('completedSessionsTab');
const allSessionsTab = document.getElementById('allSessionsTab');
const sessionTabs = document.querySelectorAll('.session-tab');
const sessionModal = document.getElementById('sessionModal');
const sessionForm = document.getElementById('sessionForm');
const sessionIdInput = document.getElementById('sessionId');
const menteeNameSelect = document.getElementById('menteeName');
const addSessionBtn = document.getElementById('addSessionBtn');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async function() {
    // Set user info
    usernameDisplay.textContent = currentUser.name;
    userRoleDisplay.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    sidebarAvatar.src = currentUser.avatar;
    userAvatar.src = currentUser.avatar;
    
    // Load dashboard stats
    await loadDashboardStats();
    
    // Load upcoming events
    await loadUpcomingEvents();
    
    // Load recent mentee
    await loadRecentMentee();
    
    // Load community updates
    await loadCommunityUpdates();
    
    // Load recent activity
    await loadRecentActivity();
    
    // Load mentor sessions
    await loadMentorSessions();
    
    // Load mentees for select dropdown
    await loadMenteesForSelect();
    
    // Setup event listeners
    setupEventListeners();
});

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        // Get upcoming and completed sessions
        const [upcomingSessions, completedSessions, mentees] = await Promise.all([
            fetchData(API_ENDPOINTS.sessions, { status: 'upcoming' }),
            fetchData(API_ENDPOINTS.sessions, { status: 'completed' }),
            fetchData(API_ENDPOINTS.mentees)
        ]);
        
        upcomingSessionsCount.textContent = upcomingSessions.length;
        completedSessionsCount.textContent = completedSessions.length;
        menteesCount.textContent = mentees.length;
        mentorRating.innerHTML = `${currentUser.rating} <small>/5</small>`;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        toastr.error('Failed to load dashboard statistics');
    }
}

// Load Upcoming Events
async function loadUpcomingEvents() {
    try {
        const events = await fetchData(API_ENDPOINTS.events);
        
        if (events.length === 0) {
            upcomingEventsContainer.innerHTML = '<p class="no-data">No upcoming events found</p>';
            return;
        }
        
        upcomingEventsContainer.innerHTML = events.map(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
            const isOnline = event.location.toLowerCase() === 'online';
            
            return `
                <article class="event-card">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p>
                            <i class="fas fa-clock"></i> ${event.time} | 
                            ${isOnline ? '<i class="fas fa-video"></i> Online' : `<i class="fas fa-map-marker-alt"></i> ${event.location}`}
                        </p>
                        <div class="event-actions">
                            ${isOnline ? 
                                '<a href="#" class="event-action join-btn">Join</a>' : 
                                '<a href="#" class="event-action rsvp-btn">RSVP</a>'}
                            <a href="#" class="event-action details-btn">Details</a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading upcoming events:', error);
        upcomingEventsContainer.innerHTML = '<p class="error">Failed to load events</p>';
    }
}

// Load Recent Mentee
async function loadRecentMentee() {
    try {
        const mentees = await fetchData(API_ENDPOINTS.mentees);
        
        if (mentees.length === 0) {
            recentMenteeContainer.innerHTML = '<p class="no-data">No mentees found</p>';
            return;
        }
        
        // Sort by most recent session
        mentees.sort((a, b) => new Date(b.lastSession) - new Date(a.lastSession));
        const recentMentee = mentees[0];
        
        recentMenteeContainer.innerHTML = `
            <img src="${recentMentee.avatar}" alt="${recentMentee.name}">
            <div class="mentorship-details">
                <h3>${recentMentee.name}</h3>
                <p class="mentor-title">Your mentee | Progress: ${recentMentee.progress}%</p>
                <div class="next-session">
                    <i class="fas fa-calendar-day"></i>
                    <strong>Next Session:</strong> ${recentMentee.nextSession}
                </div>
                <div class="mentorship-actions">
                    <a href="messages.html" class="message-mentor"><i class="fas fa-comment-dots"></i> Message</a>
                    <a href="reschedule.html" class="reschedule"><i class="fas fa-calendar-edit"></i> Reschedule</a>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading recent mentee:', error);
        recentMenteeContainer.innerHTML = '<p class="error">Failed to load mentee information</p>';
    }
}

// Load Community Updates
async function loadCommunityUpdates() {
    try {
        const updates = await fetchData(API_ENDPOINTS.updates);
        
        if (updates.length === 0) {
            communityUpdatesContainer.innerHTML = '<p class="no-data">No community updates found</p>';
            return;
        }
        
        communityUpdatesContainer.innerHTML = updates.map(update => {
            return `
                <article class="update-card">
                    <div class="update-badge ${update.type}">${update.type.toUpperCase()}</div>
                    <h3>${update.title}</h3>
                    <p>${update.content}</p>
                    <a href="#" class="update-action">Learn More <i class="fas fa-arrow-right"></i></a>
                </article>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading community updates:', error);
        communityUpdatesContainer.innerHTML = '<p class="error">Failed to load updates</p>';
    }
}

// Load Recent Activity
async function loadRecentActivity() {
    try {
        const activities = await fetchData(API_ENDPOINTS.activities);
        
        if (activities.length === 0) {
            recentActivityContainer.innerHTML = '<li class="no-data">No recent activity</li>';
            return;
        }
        
        recentActivityContainer.innerHTML = activities.map(activity => {
            const timeAgo = moment(activity.date).fromNow();
            
            return `
                <li>
                    <div class="activity-icon"><i class="${activity.icon}"></i></div>
                    <div class="activity-content">
                        <p>${activity.content}</p>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                </li>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading recent activity:', error);
        recentActivityContainer.innerHTML = '<li class="error">Failed to load activity</li>';
    }
}

// Load Mentor Sessions
async function loadMentorSessions() {
    try {
        const [upcomingSessions, completedSessions, allSessions] = await Promise.all([
            fetchData(API_ENDPOINTS.sessions, { status: 'upcoming' }),
            fetchData(API_ENDPOINTS.sessions, { status: 'completed' }),
            fetchData(API_ENDPOINTS.sessions)
        ]);
        
        // Render sessions in their respective tabs
        renderSessions(upcomingSessions, upcomingSessionsTab);
        renderSessions(completedSessions, completedSessionsTab);
        renderSessions(allSessions, allSessionsTab);
        
        // Update counts
        upcomingSessionsCount.textContent = upcomingSessions.length;
        completedSessionsCount.textContent = completedSessions.length;
    } catch (error) {
        console.error('Error loading mentor sessions:', error);
        toastr.error('Failed to load mentorship sessions');
        
        upcomingSessionsTab.innerHTML = '<p class="error">Failed to load sessions</p>';
        completedSessionsTab.innerHTML = '<p class="error">Failed to load sessions</p>';
        allSessionsTab.innerHTML = '<p class="error">Failed to load sessions</p>';
    }
}

// Render Sessions
function renderSessions(sessions, container) {
    if (sessions.length === 0) {
        container.innerHTML = '<p class="no-data">No sessions found</p>';
        return;
    }
    
    container.innerHTML = sessions.map(session => {
        const sessionDate = new Date(`${session.date}T${session.time}:00`);
        const formattedDate = sessionDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
        });
        const formattedTime = sessionDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        return `
            <div class="session-item" data-id="${session.id}">
                <div class="session-info">
                    <h3>Session with ${session.menteeName}</h3>
                    <div class="session-meta">
                        <span><i class="fas fa-calendar-day"></i> ${formattedDate}</span>
                        <span><i class="fas fa-clock"></i> ${formattedTime}</span>
                        <span><i class="fas fa-user-tag"></i> ${session.type.replace('-', ' ')}</span>
                        <span><i class="fas fa-video"></i> ${session.mode}</span>
                    </div>
                    <span class="session-status status-${session.status}">
                        ${session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                </div>
                <div class="session-actions">
                    <button class="session-action edit-session" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="session-action delete-session" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Load Mentees for Select Dropdown
async function loadMenteesForSelect() {
    try {
        const mentees = await fetchData(API_ENDPOINTS.mentees);
        
        menteeNameSelect.innerHTML = `
            <option value="">Select Mentee</option>
            ${mentees.map(mentee => `
                <option value="${mentee.id}">${mentee.name}</option>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error loading mentees for select:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Session tab switching
    sessionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sessionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.getAttribute('data-tab');
            document.querySelectorAll('.session-list').forEach(list => {
                list.classList.add('hidden');
            });
            document.getElementById(`${tabName}SessionsTab`).classList.remove('hidden');
        });
    });
    
    // Add session button
    addSessionBtn.addEventListener('click', () => {
        sessionIdInput.value = '';
        sessionForm.reset();
        document.getElementById('modalTitle').textContent = 'Add New Session';
        sessionModal.style.display = 'block';
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        sessionModal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', () => {
        sessionModal.style.display = 'none';
    });
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === sessionModal) {
            sessionModal.style.display = 'none';
        }
    });
    
    // Session form submission
    sessionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const sessionId = sessionIdInput.value;
        const formData = {
            menteeId: menteeNameSelect.value,
            menteeName: menteeNameSelect.options[menteeNameSelect.selectedIndex].text,
            date: document.getElementById('sessionDate').value,
            time: document.getElementById('sessionTime').value,
            type: document.getElementById('sessionType').value,
            mode: document.getElementById('sessionMode').value,
            notes: document.getElementById('sessionNotes').value,
            status: 'upcoming'
        };
        
        try {
            if (sessionId) {
                // Update existing session
                await updateData(API_ENDPOINTS.sessions, sessionId, formData);
                toastr.success('Session updated successfully');
            } else {
                // Create new session
                await postData(API_ENDPOINTS.sessions, formData);
                toastr.success('Session created successfully');
            }
            
            // Reload sessions
            await loadMentorSessions();
            sessionModal.style.display = 'none';
        } catch (error) {
            console.error('Error saving session:', error);
            toastr.error('Failed to save session');
        }
    });
    
    // Edit/Delete session (delegated events)
    upcomingSessionsTab.addEventListener('click', handleSessionActions);
    completedSessionsTab.addEventListener('click', handleSessionActions);
    allSessionsTab.addEventListener('click', handleSessionActions);
}

// Handle Session Actions (Edit/Delete)
async function handleSessionActions(e) {
    const sessionItem = e.target.closest('.session-item');
    if (!sessionItem) return;
    
    const sessionId = sessionItem.getAttribute('data-id');
    
    if (e.target.closest('.edit-session')) {
        // Edit session
        try {
            const session = await fetchData(`${API_ENDPOINTS.sessions}/${sessionId}`);
            
            if (session) {
                sessionIdInput.value = session.id;
                document.getElementById('modalTitle').textContent = 'Edit Session';
                menteeNameSelect.value = session.menteeId;
                document.getElementById('sessionDate').value = session.date;
                document.getElementById('sessionTime').value = session.time;
                document.getElementById('sessionType').value = session.type;
                document.getElementById('sessionMode').value = session.mode;
                document.getElementById('sessionNotes').value = session.notes || '';
                
                sessionModal.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching session for edit:', error);
            toastr.error('Failed to load session details');
        }
    } else if (e.target.closest('.delete-session')) {
        // Delete session
        if (confirm('Are you sure you want to delete this session?')) {
            try {
                await deleteData(API_ENDPOINTS.sessions, sessionId);
                toastr.success('Session deleted successfully');
                await loadMentorSessions();
            } catch (error) {
                console.error('Error deleting session:', error);
                toastr.error('Failed to delete session');
            }
        }
    }
}

// Initialize Toastr
toastr.options = {
    positionClass: 'toast-bottom-right',
    progressBar: true,
    timeOut: 3000,
    extendedTimeOut: 1000
};