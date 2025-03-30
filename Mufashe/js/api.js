// Mock API Configuration
const API_BASE_URL = 'http://localhost:3000'; // JSON Server default port

// API Endpoints
const API_ENDPOINTS = {
    users: '/users',
    mentors: '/mentors',
    mentees: '/mentees',
    sessions: '/sessions',
    events: '/events',
    updates: '/updates',
    activities: '/activities',
    messages: '/messages'
};

// Current User (simulated login)
let currentUser = {
    id: 1,
    name: 'Claire U.',
    role: 'mentor',
    avatar: 'images/mentor-avatar.png',
    joinDate: 'January 2023',
    rating: 4.7
};

// Fetch Data from API
async function fetchData(endpoint, params = {}) {
    try {
        const queryString = Object.keys(params).length 
            ? `?${new URLSearchParams(params).toString()}`
            : '';
        const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        // For demo purposes, we'll return mock data if API fails
        return getMockData(endpoint, params);
    }
}

// Post Data to API
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        // For demo, we'll simulate a successful post
        return { ...data, id: Math.floor(Math.random() * 1000) };
    }
}

// Update Data in API
async function updateData(endpoint, id, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        // For demo, return the updated data
        return { ...data, id };
    }
}

// Delete Data from API
async function deleteData(endpoint, id) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting data:', error);
        // For demo, return success
        return true;
    }
}

// Mock Data for Demo Purposes
function getMockData(endpoint, params = {}) {
    switch(endpoint) {
        case API_ENDPOINTS.users:
            return [currentUser];
            
        case API_ENDPOINTS.mentors:
            return [{
                id: 1,
                name: 'Claire U.',
                title: 'Business Owner',
                avatar: 'images/mentor-avatar.png',
                rating: 4.7,
                nextSession: 'Tomorrow, 3:00 PM'
            }];
            
        case API_ENDPOINTS.mentees:
            return [
                {
                    id: 1,
                    name: 'Marie K.',
                    avatar: 'images/user-avatar.png',
                    lastSession: '2 weeks ago',
                    nextSession: 'Tomorrow, 3:00 PM',
                    progress: 65
                },
                {
                    id: 2,
                    name: 'Alice M.',
                    avatar: 'images/user-avatar-2.png',
                    lastSession: '1 week ago',
                    nextSession: 'June 18, 10:00 AM',
                    progress: 40
                },
                {
                    id: 3,
                    name: 'Grace T.',
                    avatar: 'images/user-avatar-3.png',
                    lastSession: '3 days ago',
                    nextSession: 'June 20, 2:00 PM',
                    progress: 25
                }
            ];
            
        case API_ENDPOINTS.sessions:
            const upcomingSessions = [
                {
                    id: 1,
                    menteeId: 1,
                    menteeName: 'Marie K.',
                    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
                    time: '15:00',
                    type: 'career',
                    mode: 'online',
                    notes: 'Discuss career advancement opportunities',
                    status: 'upcoming'
                },
                {
                    id: 2,
                    menteeId: 2,
                    menteeName: 'Alice M.',
                    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
                    time: '10:00',
                    type: 'education',
                    mode: 'in-person',
                    notes: 'Review education plan',
                    status: 'upcoming'
                }
            ];
            
            const completedSessions = [
                {
                    id: 3,
                    menteeId: 1,
                    menteeName: 'Marie K.',
                    date: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().split('T')[0],
                    time: '14:00',
                    type: 'parenting',
                    mode: 'online',
                    notes: 'Parenting strategies discussion',
                    status: 'completed'
                },
                {
                    id: 4,
                    menteeId: 3,
                    menteeName: 'Grace T.',
                    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
                    time: '16:00',
                    type: 'mental-health',
                    mode: 'phone',
                    notes: 'Stress management techniques',
                    status: 'completed'
                },
                {
                    id: 5,
                    menteeId: 2,
                    menteeName: 'Alice M.',
                    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
                    time: '11:00',
                    type: 'career',
                    mode: 'online',
                    notes: 'Resume review',
                    status: 'completed'
                }
            ];
            
            if (params.status === 'upcoming') {
                return upcomingSessions;
            } else if (params.status === 'completed') {
                return completedSessions;
            } else {
                return [...upcomingSessions, ...completedSessions];
            }
            
        case API_ENDPOINTS.events:
            return [
                {
                    id: 1,
                    title: 'Parenting Workshop',
                    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
                    time: '10:00 AM - 12:00 PM',
                    location: 'Kigali',
                    type: 'workshop'
                },
                {
                    id: 2,
                    title: 'Career Development Seminar',
                    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
                    time: '2:00 PM - 4:00 PM',
                    location: 'Online',
                    type: 'seminar'
                }
            ];
            
        case API_ENDPOINTS.updates:
            return [
                {
                    id: 1,
                    title: 'New Support Group Forming',
                    content: 'A new support group for mothers returning to school is starting next week in your area.',
                    type: 'new',
                    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
                },
                {
                    id: 2,
                    title: 'Scholarship Opportunity',
                    content: 'Applications are now open for the 2025 Young Mothers Education Fund.',
                    type: 'opportunity',
                    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString()
                }
            ];
            
        case API_ENDPOINTS.activities:
            return [
                {
                    id: 1,
                    type: 'resource',
                    content: 'You saved "Returning to School Guide" to your resources',
                    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
                    icon: 'fas fa-book'
                },
                {
                    id: 2,
                    type: 'post',
                    content: 'You posted in the "Single Parents" support group',
                    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
                    icon: 'fas fa-comment'
                },
                {
                    id: 3,
                    type: 'session',
                    content: 'You completed your mentorship session with Marie',
                    date: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
                    icon: 'fas fa-user-graduate'
                }
            ];
            
        case API_ENDPOINTS.messages:
            return [
                {
                    id: 1,
                    sender: 'Marie K.',
                    content: 'Hi Claire, I wanted to ask about the career guidance materials...',
                    date: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
                    read: false
                },
                {
                    id: 2,
                    sender: 'Mufashe Admin',
                    content: 'Reminder: Mentor meeting tomorrow at 10am',
                    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
                    read: false
                },
                {
                    id: 3,
                    sender: 'Alice M.',
                    content: 'Thank you for the resume review!',
                    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
                    read: true
                }
            ];
            
        default:
            return [];
    }
}

// Export API functions
export {
    API_ENDPOINTS,
    currentUser,
    fetchData,
    postData,
    updateData,
    deleteData
};