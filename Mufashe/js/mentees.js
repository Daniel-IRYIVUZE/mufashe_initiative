$(document).ready(function() {
    // Mock data for mentees
    const mockMentees = [
      {
        id: 1,
        name: "Marie Uwimana",
        age: 19,
        location: "Kigali",
        phone: "0781234567",
        email: "marie.uwimana@example.com",
        status: "active",
        notes: "Excelling in her studies",
        lastContact: "2025-03-20T09:30:00Z",
        goals: [
          {
            id: 1,
            title: "Improve Math Grades",
            description: "Achieve at least 80% in math exams",
            category: "academic",
            dueDate: "2025-06-30",
            completed: false
          },
          {
            id: 2,
            title: "University Application",
            description: "Apply to 3 universities for computer science",
            category: "academic",
            dueDate: "2025-05-15",
            completed: false
          }
        ],
        sessions: [
          {
            id: 1,
            date: "2025-03-20",
            type: "in-person",
            duration: 60,
            notes: "Discussed math study plan and university options",
            followup: "Send university application links"
          }
        ],
        sharedResources: [1, 3],
        history: [
          {
            id: 1,
            icon: "fa-user-plus",
            description: "Added to program",
            date: "2025-01-15T10:30:00Z"
          },
          {
            id: 2,
            icon: "fa-book",
            description: "Shared Academic Success Guide",
            date: "2025-02-10T14:15:00Z"
          }
        ]
      },
      {
        id: 2,
        name: "Claudine Nyiraneza",
        age: 21,
        location: "Northern",
        phone: "0782345678",
        email: null,
        status: "needs-attention",
        notes: "Needs counseling support",
        lastContact: "2025-03-10T14:15:00Z",
        goals: [
          {
            id: 1,
            title: "Mental Health Support",
            description: "Attend weekly counseling sessions",
            category: "health",
            dueDate: "2025-12-31",
            completed: false
          }
        ],
        sessions: [
          {
            id: 1,
            date: "2025-03-10",
            type: "video-call",
            duration: 90,
            notes: "Initial counseling session - discussed challenges",
            followup: "Schedule follow-up in 2 weeks"
          }
        ],
        sharedResources: [2],
        history: [
          {
            id: 1,
            icon: "fa-user-plus",
            description: "Added to program",
            date: "2025-02-01T09:00:00Z"
          },
          {
            id: 2,
            icon: "fa-comments",
            description: "First counseling session",
            date: "2025-03-10T14:15:00Z"
          }
        ]
      },
      {
        id: 3,
        name: "Annette Mukamana",
        age: 20,
        location: "Southern",
        phone: "0783456789",
        email: "annette.m@example.com",
        status: "active",
        notes: "Interested in entrepreneurship",
        lastContact: "2025-03-18T11:00:00Z",
        goals: [
          {
            id: 1,
            title: "Business Plan",
            description: "Develop complete business plan for tailoring business",
            category: "career",
            dueDate: "2025-04-30",
            completed: false
          }
        ],
        sessions: [
          {
            id: 1,
            date: "2025-03-18",
            type: "in-person",
            duration: 60,
            notes: "Discussed business ideas and initial planning",
            followup: "Provide business plan template"
          }
        ],
        sharedResources: [1, 2, 3],
        history: [
          {
            id: 1,
            icon: "fa-user-plus",
            description: "Added to program",
            date: "2025-01-20T11:30:00Z"
          },
          {
            id: 2,
            icon: "fa-briefcase",
            description: "Expressed interest in entrepreneurship",
            date: "2025-02-15T10:00:00Z"
          }
        ]
      }
    ];
  
    // Mock resources for sharing
    const mockResources = [
      { id: 1, title: "Academic Success Guide" },
      { id: 2, title: "Career Planning Workshop" },
      { id: 3, title: "Mental Health Resources" }
    ];
  
    // Current selected mentee
    let currentMentee = null;
  
    // Load mentees into the table
    function loadMentees(filter = "all") {
      const tableBody = $("#mentee-table-body");
      tableBody.empty();
      
      let filteredMentees = mockMentees;
      
      if (filter === "active") {
        filteredMentees = mockMentees.filter(mentee => mentee.status === "active");
      } else if (filter === "inactive") {
        filteredMentees = mockMentees.filter(mentee => mentee.status === "inactive");
      } else if (filter === "needs-attention") {
        filteredMentees = mockMentees.filter(mentee => mentee.status === "needs-attention");
      }
      
      if (filteredMentees.length === 0) {
        tableBody.append('<tr><td colspan="7" class="text-center">No mentees found</td></tr>');
        return;
      }
      
      filteredMentees.forEach(mentee => {
        const lastContact = new Date(mentee.lastContact).toLocaleDateString();
        const progress = Math.floor(Math.random() * 100); // Random progress for demo
        
        const row = $(`
          <tr data-id="${mentee.id}">
            <td>${mentee.name}</td>
            <td>${mentee.age}</td>
            <td>${mentee.location}</td>
            <td><span class="status ${mentee.status}">${formatStatus(mentee.status)}</span></td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
                <span>${progress}%</span>
              </div>
            </td>
            <td>${lastContact}</td>
            <td>
              <button class="btn-icon view-mentee-btn"><i class="fas fa-eye"></i></button>
              <button class="btn-icon edit-mentee-btn"><i class="fas fa-edit"></i></button>
            </td>
          </tr>
        `);
        
        tableBody.append(row);
      });
    }
  
    // Format status for display
    function formatStatus(status) {
      const statusMap = {
        "active": "Active",
        "inactive": "Inactive",
        "needs-attention": "Needs Attention"
      };
      return statusMap[status] || status;
    }
  
    // Show mentee details
    function showMenteeDetails(menteeId) {
      const mentee = mockMentees.find(m => m.id === menteeId);
      if (!mentee) return;
      
      currentMentee = mentee;
      
      $("#mentee-details-name").text(mentee.name);
      $("#mentee-details-avatar").attr("src", `https://ui-avatars.com/api/?name=${encodeURIComponent(mentee.name)}&background=random`);
      $("#mentee-details-fullname").text(mentee.name);
      $("#mentee-details-age-location").text(`${mentee.age} years, ${mentee.location}`);
      $("#mentee-details-contact").text(mentee.phone + (mentee.email ? `, ${mentee.email}` : ""));
      $("#mentee-details-status").text(formatStatus(mentee.status)).removeClass("active inactive needs-attention").addClass(mentee.status);
      $("#mentee-details-notes").text(mentee.notes || "No notes available");
      
      // Load goals
      loadGoals(mentee.goals);
      
      // Load sessions
      loadSessions(mentee.sessions);
      
      // Load shared resources
      loadSharedResources(mentee.sharedResources);
      
      // Load history
      loadHistory(mentee.history);
      
      // Show details section
      $("#mentee-details-section").show();
    }
  
    // Load goals
    function loadGoals(goals) {
      const list = $("#goals-list");
      list.empty();
      
      if (goals.length === 0) {
        list.append('<li class="empty">No goals set</li>');
        return;
      }
      
      goals.forEach(goal => {
        const dueDate = new Date(goal.dueDate).toLocaleDateString();
        const item = $(`
          <li>
            <div class="goal-header">
              <h5>${goal.title}</h5>
              <span class="goal-due">Due: ${dueDate}</span>
            </div>
            <p>${goal.description}</p>
            <div class="goal-footer">
              <span class="goal-category">${formatCategory(goal.category)}</span>
              <div class="goal-actions">
                <button class="btn-icon complete-goal-btn" data-id="${goal.id}"><i class="fas fa-check"></i></button>
                <button class="btn-icon edit-goal-btn" data-id="${goal.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete-goal-btn" data-id="${goal.id}"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </li>
        `);
        
        list.append(item);
      });
    }
  
    // Format category for display
    function formatCategory(category) {
      const categories = {
        "academic": "Academic",
        "career": "Career",
        "personal": "Personal Development",
        "health": "Health & Wellness"
      };
      return categories[category] || category;
    }
  
    // Load sessions
    function loadSessions(sessions) {
      const list = $("#sessions-list");
      list.empty();
      
      if (sessions.length === 0) {
        list.append('<li class="empty">No sessions recorded</li>');
        return;
      }
      
      sessions.forEach(session => {
        const sessionDate = new Date(session.date).toLocaleDateString();
        const item = $(`
          <li>
            <div class="session-header">
              <h5>${sessionDate} - ${formatType(session.type)} (${session.duration} mins)</h5>
            </div>
            <p>${session.notes}</p>
            ${session.followup ? `<div class="session-followup"><strong>Follow-up:</strong> ${session.followup}</div>` : ''}
          </li>
        `);
        
        list.append(item);
      });
    }
  
    // Format session type
    function formatType(type) {
      const types = {
        "in-person": "In Person",
        "video-call": "Video Call",
        "phone-call": "Phone Call"
      };
      return types[type] || type;
    }
  
    // Load shared resources
    function loadSharedResources(resourceIds) {
      const grid = $("#resources-grid");
      grid.empty();
      
      if (resourceIds.length === 0) {
        grid.append('<div class="empty">No resources shared</div>');
        return;
      }
      
      const sharedResources = mockResources.filter(res => resourceIds.includes(res.id));
      
      sharedResources.forEach(resource => {
        const icon = getResourceIcon(resource.type);
        const card = $(`
          <div class="resource-card">
            <div class="resource-icon">${icon}</div>
            <div class="resource-content">
              <h5>${resource.title}</h5>
              <button class="btn-secondary view-resource-btn">View</button>
            </div>
          </div>
        `);
        
        grid.append(card);
      });
    }
  
    // Get resource icon
    function getResourceIcon(type) {
      const icons = {
        "document": '<i class="fas fa-file-pdf"></i>',
        "video": '<i class="fas fa-video"></i>',
        "link": '<i class="fas fa-link"></i>'
      };
      return icons[type] || '<i class="fas fa-file-alt"></i>';
    }
  
    // Load history
    function loadHistory(history) {
      const timeline = $("#mentee-timeline");
      timeline.empty();
      
      if (history.length === 0) {
        timeline.append('<div class="empty">No history available</div>');
        return;
      }
      
      history.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      history.forEach(item => {
        const date = new Date(item.date).toLocaleDateString();
        const timelineItem = $(`
          <div class="timeline-item">
            <div class="timeline-icon">
              <i class="fas ${item.icon}"></i>
            </div>
            <div class="timeline-content">
              <p>${item.description}</p>
              <span class="timeline-date">${date}</span>
            </div>
          </div>
        `);
        
        timeline.append(timelineItem);
      });
    }
  
    // Open new mentee modal
    $("#add-mentee-btn").click(function() {
      $("#mentee-form")[0].reset();
      $("#mentee-modal").fadeIn();
    });
  
    // Close modal
    $(".close-modal, .close-modal-btn").click(function() {
      $(".modal").fadeOut();
    });
  
    // Handle mentee form submission
    $("#mentee-form").submit(function(e) {
      e.preventDefault();
      
      const formData = {
        id: mockMentees.length + 1,
        name: $("#mentee-name").val(),
        age: $("#mentee-age").val(),
        location: $("#mentee-location").val(),
        phone: $("#mentee-phone").val(),
        email: $("#mentee-email").val(),
        status: $("#mentee-status").val(),
        notes: $("#mentee-notes").val(),
        lastContact: new Date().toISOString(),
        goals: [],
        sessions: [],
        sharedResources: [],
        history: [
          {
            id: 1,
            icon: "fa-user-plus",
            description: "Added to program",
            date: new Date().toISOString()
          }
        ]
      };
      
      mockMentees.push(formData);
      loadMentees($("#mentee-filter").val());
      $("#mentee-modal").fadeOut();
      showNotification("Mentee added successfully!");
    });
  
    // Handle filter change
    $("#mentee-filter").change(function() {
      loadMentees($(this).val());
    });
  
    // View mentee details
    $(document).on("click", ".view-mentee-btn", function() {
      const menteeId = $(this).closest("tr").data("id");
      showMenteeDetails(menteeId);
    });
  
    // Close details section
    $("#close-details-btn").click(function() {
      $("#mentee-details-section").hide();
      currentMentee = null;
    });
  
    // Tab switching
    $(".tab-btn").click(function() {
      const tabId = $(this).data("tab") + "-tab";
      
      $(".tab-btn").removeClass("active");
      $(this).addClass("active");
      
      $(".tab-content").removeClass("active");
      $("#" + tabId).addClass("active");
    });
  
    // Add goal
    $("#add-goal-btn").click(function() {
      if (!currentMentee) return;
      
      $("#goal-form")[0].reset();
      $("#goal-modal").fadeIn();
    });
  
    // Handle goal form submission
    $("#goal-form").submit(function(e) {
      e.preventDefault();
      
      if (!currentMentee) return;
      
      const newGoal = {
        id: currentMentee.goals.length + 1,
        title: $("#goal-title").val(),
        description: $("#goal-description").val(),
        category: $("#goal-category").val(),
        dueDate: $("#goal-due-date").val(),
        completed: false
      };
      
      currentMentee.goals.push(newGoal);
      loadGoals(currentMentee.goals);
      $("#goal-modal").fadeOut();
      showNotification("Goal added successfully!");
    });
  
    // Add session
    $("#add-session-btn").click(function() {
      if (!currentMentee) return;
      
      $("#session-form")[0].reset();
      $("#session-modal").fadeIn();
    });
  
    // Handle session form submission
    $("#session-form").submit(function(e) {
      e.preventDefault();
      
      if (!currentMentee) return;
      
      const newSession = {
        id: currentMentee.sessions.length + 1,
        date: $("#session-date").val(),
        type: $("#session-type").val(),
        duration: $("#session-duration").val(),
        notes: $("#session-notes").val(),
        followup: $("#session-followup").val()
      };
      
      currentMentee.sessions.push(newSession);
      loadSessions(currentMentee.sessions);
      
      // Add to history
      currentMentee.history.push({
        id: currentMentee.history.length + 1,
        icon: "fa-comments",
        description: `${formatType(newSession.type)} session`,
        date: new Date().toISOString()
      });
      
      loadHistory(currentMentee.history);
      
      $("#session-modal").fadeOut();
      showNotification("Session recorded successfully!");
    });
  
    // Share resource
    $("#share-resource-btn").click(function() {
      if (!currentMentee) return;
      
      // Load resources into dropdown
      const dropdown = $("#resource-select");
      dropdown.empty();
      dropdown.append('<option value="">Select a resource</option>');
      
      mockResources.forEach(resource => {
        if (!currentMentee.sharedResources.includes(resource.id)) {
          dropdown.append(`<option value="${resource.id}">${resource.title}</option>`);
        }
      });
      
      $("#resource-form")[0].reset();
      $("#resource-modal").fadeIn();
    });
  
    // Handle resource sharing form submission
    $("#resource-form").submit(function(e) {
      e.preventDefault();
      
      if (!currentMentee) return;
      
      const resourceId = parseInt($("#resource-select").val());
      if (!resourceId) return;
      
      currentMentee.sharedResources.push(resourceId);
      loadSharedResources(currentMentee.sharedResources);
      
      // Add to history
      const resource = mockResources.find(r => r.id === resourceId);
      if (resource) {
        currentMentee.history.push({
          id: currentMentee.history.length + 1,
          icon: "fa-book",
          description: `Shared resource: ${resource.title}`,
          date: new Date().toISOString()
        });
        
        loadHistory(currentMentee.history);
      }
      
      $("#resource-modal").fadeOut();
      showNotification("Resource shared successfully!");
    });
  
    // Show notification
    function showNotification(message) {
      const notification = $(`
        <div class="notification">
          <p>${message}</p>
        </div>
      `);
      
      $("body").append(notification);
      notification.css("bottom", "20px");
      
      setTimeout(() => {
        notification.animate({ bottom: "-100px" }, 500, function() {
          $(this).remove();
        });
      }, 3000);
    }
  
    // Initialize
    loadMentees();
  });