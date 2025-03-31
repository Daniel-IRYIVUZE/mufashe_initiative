$(document).ready(function() {
    // Mock API URL (using json-server)
    const API_URL = 'http://localhost:3000';
    
    // DOM Elements
    const $menteeTableBody = $('#mentee-table-body');
    const $activityList = $('#activity-list');
    const $appointmentsContainer = $('#appointments-container');
    const $menteeModal = $('#mentee-modal');
    const $appointmentModal = $('#appointment-modal');
    const $confirmModal = $('#confirm-modal');
    const $menteeForm = $('#mentee-form');
    const $appointmentForm = $('#appointment-form');
    const $menteeFilter = $('#mentee-filter');
    const $searchInput = $('#search-input');
    const $logoutBtn = $('#logout-btn');
    
    // State variables
    let currentMenteeId = null;
    let currentAppointmentId = null;
    let confirmCallback = null;
    
    // Initialize the dashboard
    initDashboard();

    // Event Listeners
    $('#add-mentee-btn').on('click', openMenteeModal);
    $('#add-appointment-btn').on('click', openAppointmentModal);
    $('.close-modal, .close-modal-btn').on('click', closeAllModals);
    $menteeForm.on('submit', handleMenteeSubmit);
    $appointmentForm.on('submit', handleAppointmentSubmit);
    $menteeFilter.on('change', filterMentees);
    $('#search-btn').on('click', searchDashboard);
    $searchInput.on('keypress', function(e) {
        if (e.which === 13) searchDashboard();
    });
    $logoutBtn.on('click', handleLogout);
    
    // Close modal when clicking outside content
    $(window).on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            closeAllModals();
        }
    });
    
    // Confirmation modal buttons
    $('#confirm-action').on('click', function() {
        if (confirmCallback) {
            confirmCallback();
        }
        $confirmModal.hide();
    });
    
    $('#confirm-cancel').on('click', function() {
        $confirmModal.hide();
    });

    // Functions
    function initDashboard() {
        // Load data from mock API
        loadMentees();
        loadActivities();
        loadAppointments();
        updateStats();
        
        // Check for user preferences
        loadUserPreferences();
    }
    
    function loadMentees() {
        showLoading();
        $.get(`${API_URL}/mentees`, function(mentees) {
            renderMentees(mentees);
            hideLoading();
        }).fail(handleApiError);
    }
    
    function renderMentees(mentees) {
        $menteeTableBody.empty();
        
        if (mentees.length === 0) {
            $menteeTableBody.append('<tr><td colspan="6" class="text-center">No mentees found</td></tr>');
            return;
        }
        
        mentees.forEach(mentee => {
            const lastContact = mentee.lastContact ? formatDate(mentee.lastContact) : 'Never';
            
            const row = `
                <tr data-id="${mentee.id}">
                    <td>
                        <div class="mentee-info">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(mentee.name)}&background=random" alt="${mentee.name}" class="mentee-avatar">
                            <span>${mentee.name}</span>
                        </div>
                    </td>
                    <td>${mentee.age}</td>
                    <td>${mentee.location}</td>
                    <td><span class="status ${mentee.status}">${mentee.status.replace('-', ' ')}</span></td>
                    <td>${lastContact}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${mentee.id}"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${mentee.id}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            
            $menteeTableBody.append(row);
        });
        
        // Add event listeners to action buttons
        $('.edit-btn').off('click').on('click', function() {
            const id = $(this).data('id');
            editMentee(id);
        });
        
        $('.delete-btn').off('click').on('click', function() {
            const id = $(this).data('id');
            confirmAction(
                'Delete Mentee',
                'Are you sure you want to delete this mentee? This action cannot be undone.',
                () => deleteMentee(id)
            );
        });
    }
    
    function loadActivities() {
        showLoading();
        $.get(`${API_URL}/activities`, function(activities) {
            renderActivities(activities);
            hideLoading();
        }).fail(handleApiError);
    }
    
    function renderActivities(activities) {
        $activityList.empty();
        
        if (activities.length === 0) {
            $activityList.append('<li class="text-center">No recent activity</li>');
            return;
        }
        
        // Sort activities by date (newest first)
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        activities.forEach(activity => {
            const date = formatDateTime(activity.date);
            
            const item = `
                <li>
                    <div class="activity-icon">
                        <i class="fas ${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.description}</p>
                        <span class="activity-time">${date}</span>
                    </div>
                </li>
            `;
            
            $activityList.append(item);
        });
    }
    
    function loadAppointments() {
        showLoading();
        $.get(`${API_URL}/appointments`, function(appointments) {
            renderAppointments(appointments);
            hideLoading();
        }).fail(handleApiError);
    }
    
    function renderAppointments(appointments) {
        $appointmentsContainer.empty();
        
        if (appointments.length === 0) {
            $appointmentsContainer.append('<p class="text-center">No upcoming appointments</p>');
            return;
        }
        
        // Filter out past appointments and sort by date
        const now = new Date();
        const upcomingAppointments = appointments.filter(appt => new Date(appt.date) > now);
        
        upcomingAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        upcomingAppointments.forEach(appointment => {
            const date = new Date(appointment.date);
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedDate = formatDate(appointment.date);
            
            const card = `
                <div class="appointment-card" data-id="${appointment.id}">
                    <div class="appointment-header">
                        <h4>Session with ${appointment.menteeName}</h4>
                        <span class="appointment-type">${appointment.type.replace('-', ' ')}</span>
                    </div>
                    <div class="appointment-details">
                        <p><i class="fas fa-map-marker-alt"></i> ${appointment.location}</p>
                        <p><i class="fas fa-calendar-alt"></i> ${formattedDate} at ${time}</p>
                        ${appointment.notes ? `<p><i class="fas fa-sticky-note"></i> ${appointment.notes}</p>` : ''}
                    </div>
                    <div class="appointment-actions">
                        <span class="appointment-time">${time}</span>
                        <button class="cancel-btn" data-id="${appointment.id}">Cancel</button>
                    </div>
                </div>
            `;
            
            $appointmentsContainer.append(card);
        });
        
        // Add event listeners to cancel buttons
        $('.cancel-btn').off('click').on('click', function() {
            const id = $(this).data('id');
            confirmAction(
                'Cancel Appointment',
                'Are you sure you want to cancel this appointment?',
                () => cancelAppointment(id)
            );
        });
    }
    
    function updateStats() {
        showLoading();
        $.get(`${API_URL}/stats`, function(stats) {
            $('#active-mentees-count').text(stats.activeMentees);
            $('#upcoming-sessions-count').text(stats.upcomingSessions);
            $('#unread-messages-count').text(stats.unreadMessages);
            $('#resources-shared-count').text(stats.resourcesShared);
            hideLoading();
        }).fail(handleApiError);
    }
    
    function filterMentees() {
        const filter = $menteeFilter.val();
        localStorage.setItem('menteeFilter', filter);
        
        if (filter === 'all') {
            $('tr[data-id]').show();
            return;
        }
        
        $('tr[data-id]').each(function() {
            const status = $(this).find('.status').attr('class').split(' ')[1];
            $(this).toggle(status === filter);
        });
    }
    
    function searchDashboard() {
        const query = $searchInput.val().toLowerCase();
        
        if (!query) {
            $('tr[data-id]').show();
            return;
        }
        
        $('tr[data-id]').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    }
    
    function openMenteeModal() {
        currentMenteeId = null;
        $menteeForm.trigger('reset');
        $menteeModal.show();
    }
    
    function editMentee(id) {
        showLoading();
        $.get(`${API_URL}/mentees/${id}`, function(mentee) {
            currentMenteeId = mentee.id;
            $('#mentee-name').val(mentee.name);
            $('#mentee-age').val(mentee.age);
            $('#mentee-location').val(mentee.location);
            $('#mentee-phone').val(mentee.phone);
            $('#mentee-email').val(mentee.email || '');
            $('#mentee-status').val(mentee.status);
            $('#mentee-notes').val(mentee.notes || '');
            $menteeModal.show();
            hideLoading();
        }).fail(handleApiError);
    }
    
    function handleMenteeSubmit(e) {
        e.preventDefault();
        showLoading();
        
        const menteeData = {
            name: $('#mentee-name').val(),
            age: parseInt($('#mentee-age').val()),
            location: $('#mentee-location').val(),
            phone: $('#mentee-phone').val(),
            email: $('#mentee-email').val() || null,
            status: $('#mentee-status').val(),
            notes: $('#mentee-notes').val() || null,
            lastContact: new Date().toISOString()
        };
        
        if (currentMenteeId) {
            // Update existing mentee
            $.ajax({
                url: `${API_URL}/mentees/${currentMenteeId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(menteeData),
                success: function() {
                    loadMentees();
                    loadActivities();
                    updateStats();
                    closeAllModals();
                    showToast('Mentee updated successfully', 'success');
                    hideLoading();
                },
                error: handleApiError
            });
        } else {
            // Add new mentee
            $.ajax({
                url: `${API_URL}/mentees`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(menteeData),
                success: function() {
                    loadMentees();
                    loadActivities();
                    updateStats();
                    closeAllModals();
                    showToast('Mentee added successfully', 'success');
                    hideLoading();
                },
                error: handleApiError
            });
        }
    }
    
    function deleteMentee(id) {
        showLoading();
        $.ajax({
            url: `${API_URL}/mentees/${id}`,
            type: 'DELETE',
            success: function() {
                loadMentees();
                loadActivities();
                updateStats();
                closeAllModals();
                showToast('Mentee deleted successfully', 'success');
                hideLoading();
            },
            error: handleApiError
        });
    }
    
    function openAppointmentModal() {
        currentAppointmentId = null;
        $appointmentForm.trigger('reset');
        showLoading();
        
        // Load mentees for dropdown
        $.get(`${API_URL}/mentees`, function(mentees) {
            const $menteeDropdown = $('#appointment-mentee');
            $menteeDropdown.empty().append('<option value="">Select Mentee</option>');
            
            mentees.forEach(mentee => {
                if (mentee.status === 'active') {
                    $menteeDropdown.append(`<option value="${mentee.id}">${mentee.name}</option>`);
                }
            });
            
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            $('#appointment-date').val(tomorrow.toISOString().split('T')[0]);
            
            // Set default time to 10:00 AM
            $('#appointment-time').val('10:00');
            
            $appointmentModal.show();
            hideLoading();
        }).fail(handleApiError);
    }
    
    function handleAppointmentSubmit(e) {
        e.preventDefault();
        showLoading();
        
        const menteeId = $('#appointment-mentee').val();
        const menteeName = $('#appointment-mentee option:selected').text();
        const date = $('#appointment-date').val();
        const time = $('#appointment-time').val();
        const type = $('#appointment-type').val();
        const location = $('#appointment-location').val();
        const notes = $('#appointment-notes').val() || null;
        
        const appointmentData = {
            menteeId: parseInt(menteeId),
            menteeName,
            date: new Date(`${date}T${time}`).toISOString(),
            type,
            location,
            notes
        };
        
        if (currentAppointmentId) {
            // Update existing appointment
            $.ajax({
                url: `${API_URL}/appointments/${currentAppointmentId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(appointmentData),
                success: function() {
                    loadAppointments();
                    loadActivities();
                    updateStats();
                    closeAllModals();
                    showToast('Appointment updated successfully', 'success');
                    hideLoading();
                },
                error: handleApiError
            });
        } else {
            // Add new appointment
            $.ajax({
                url: `${API_URL}/appointments`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(appointmentData),
                success: function() {
                    loadAppointments();
                    loadActivities();
                    updateStats();
                    closeAllModals();
                    showToast('Appointment scheduled successfully', 'success');
                    hideLoading();
                },
                error: handleApiError
            });
        }
    }
    
    function cancelAppointment(id) {
        showLoading();
        $.ajax({
            url: `${API_URL}/appointments/${id}`,
            type: 'DELETE',
            success: function() {
                loadAppointments();
                loadActivities();
                updateStats();
                closeAllModals();
                showToast('Appointment cancelled successfully', 'success');
                hideLoading();
            },
            error: handleApiError
        });
    }
    
    function confirmAction(title, message, callback) {
        $('#confirm-title').text(title);
        $('#confirm-message').text(message);
        confirmCallback = callback;
        $confirmModal.show();
    }
    
    function closeAllModals() {
        $('.modal').hide();
    }
    
    function handleApiError(error) {
        console.error('API Error:', error);
        showToast('An error occurred. Please try again.', 'error');
        hideLoading();
    }
    
    function showToast(message, type = 'success') {
        const $toast = $(`
            <div class="toast ${type}">
                ${message}
            </div>
        `);
        
        $('body').append($toast);
        
        setTimeout(() => {
            $toast.remove();
        }, 3000);
    }
    
    function showLoading() {
        $('body').append(`
            <div class="loading-overlay">
                <div class="spinner"></div>
            </div>
        `);
    }
    
    function hideLoading() {
        $('.loading-overlay').remove();
    }
    
    function loadUserPreferences() {
        // Load theme preference from cookies
        const theme = getCookie('theme') || 'light';
        if (theme === 'dark') {
            $('body').addClass('dark-mode');
        }
        
        // Load other preferences from local storage
        const lastFilter = localStorage.getItem('menteeFilter');
        if (lastFilter) {
            $menteeFilter.val(lastFilter);
            filterMentees();
        }
    }
    
    function handleLogout() {
        confirmAction(
            'Logout',
            'Are you sure you want to logout?',
            function() {
                // Clear user session and redirect to login page
                localStorage.removeItem('menteeFilter');
                document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                showToast('You have been logged out successfully', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        );
    }
    
    // Helper function to get cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    
    // Helper function to format date and time
    function formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
});