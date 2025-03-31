$(document).ready(function() {
    // Initialize flatpickr for datetime inputs
    $(".datetime-input").flatpickr({
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today"
    });
  
    // Mock data for appointments
    const mockAppointments = [
      {
        id: 1,
        menteeId: 1,
        menteeName: "Marie Uwimana",
        title: "Academic Progress Review",
        date: "2025-03-25 10:00",
        duration: 60,
        type: "in-person",
        location: "Kigali Mentoring Center",
        notes: "Discuss recent exam results and study plan",
        status: "upcoming"
      },
      {
        id: 2,
        menteeId: 2,
        menteeName: "Claudine Nyiraneza",
        title: "Counseling Session",
        date: "2025-03-26 14:00",
        duration: 90,
        type: "video-call",
        location: "Zoom Meeting",
        notes: "Mental health check-in and support",
        status: "upcoming"
      },
      {
        id: 3,
        menteeId: 3,
        menteeName: "Annette Mukamana",
        title: "Business Plan Discussion",
        date: "2025-03-20 09:30",
        duration: 60,
        type: "in-person",
        location: "Southern Youth Center",
        notes: "Review business proposal and funding options",
        status: "completed"
      }
    ];
  
    // Mock mentees for dropdown
    const mockMentees = [
      { id: 1, name: "Marie Uwimana" },
      { id: 2, name: "Claudine Nyiraneza" },
      { id: 3, name: "Annette Mukamana" }
    ];
  
    // Load mentees into dropdown
    function loadMentees() {
      const dropdown = $("#appointment-mentee");
      dropdown.empty();
      dropdown.append('<option value="">Select Mentee</option>');
      
      mockMentees.forEach(mentee => {
        dropdown.append(`<option value="${mentee.id}">${mentee.name}</option>`);
      });
    }
  
    // Load appointments into the list
    function loadAppointments(filter = "all") {
      const now = new Date();
      const list = $("#appointments-list");
      list.empty();
      
      let filteredAppointments = mockAppointments;
      
      if (filter === "today") {
        filteredAppointments = mockAppointments.filter(appt => {
          const apptDate = new Date(appt.date.replace(" ", "T"));
          return apptDate.toDateString() === now.toDateString();
        });
      } else if (filter === "week") {
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);
        
        filteredAppointments = mockAppointments.filter(appt => {
          const apptDate = new Date(appt.date.replace(" ", "T"));
          return apptDate >= now && apptDate <= nextWeek;
        });
      } else if (filter === "month") {
        const nextMonth = new Date(now);
        nextMonth.setMonth(now.getMonth() + 1);
        
        filteredAppointments = mockAppointments.filter(appt => {
          const apptDate = new Date(appt.date.replace(" ", "T"));
          return apptDate >= now && apptDate <= nextMonth;
        });
      } else if (filter === "past") {
        filteredAppointments = mockAppointments.filter(appt => {
          const apptDate = new Date(appt.date.replace(" ", "T"));
          return apptDate < now;
        });
      }
      
      if (filteredAppointments.length === 0) {
        list.append('<div class="empty-state"><p>No appointments found</p></div>');
        return;
      }
      
      filteredAppointments.sort((a, b) => new Date(a.date.replace(" ", "T")) - new Date(b.date.replace(" ", "T")));
      
      filteredAppointments.forEach(appt => {
        const apptDate = new Date(appt.date.replace(" ", "T"));
        const isPast = apptDate < now;
        
        const item = $(`
          <div class="appointment-item ${isPast ? 'past' : ''}">
            <div>
              <div class="appointment-time">${formatTime(appt.date)}</div>
              <div class="appointment-title">${appt.title}</div>
            </div>
            <div>
              <div class="appointment-mentee">${appt.menteeName}</div>
              <div class="appointment-type">${formatType(appt.type)}</div>
            </div>
            <div class="appointment-actions">
              <button class="btn-icon view-appointment-btn" data-id="${appt.id}"><i class="fas fa-eye"></i></button>
              <button class="btn-icon edit-appointment-btn" data-id="${appt.id}"><i class="fas fa-edit"></i></button>
            </div>
          </div>
        `);
        
        list.append(item);
      });
    }
  
    // Format time for display
    function formatTime(dateTimeStr) {
      const date = new Date(dateTimeStr.replace(" ", "T"));
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  
    // Format appointment type
    function formatType(type) {
      const types = {
        "in-person": "In Person",
        "video-call": "Video Call",
        "phone-call": "Phone Call"
      };
      return types[type] || type;
    }
  
    // Open new appointment modal
    $("#new-appointment-btn").click(function() {
      loadMentees();
      $("#appointment-form")[0].reset();
      $("#appointment-modal").fadeIn();
    });
  
    // Close modal
    $(".close-modal, .close-modal-btn").click(function() {
      $(".modal").fadeOut();
    });
  
    // Handle appointment form submission
    $("#appointment-form").submit(function(e) {
      e.preventDefault();
      
      const formData = {
        id: mockAppointments.length + 1,
        menteeId: $("#appointment-mentee").val(),
        menteeName: $("#appointment-mentee option:selected").text(),
        title: $("#appointment-title").val(),
        date: $("#appointment-date").val(),
        duration: $("#appointment-duration").val(),
        type: $("#appointment-type").val(),
        location: $("#appointment-location").val(),
        notes: $("#appointment-notes").val(),
        status: "upcoming"
      };
      
      mockAppointments.push(formData);
      loadAppointments($("#appointment-filter").val());
      $("#appointment-modal").fadeOut();
      showNotification("Appointment scheduled successfully!");
    });
  
    // Handle filter change
    $("#appointment-filter").change(function() {
      loadAppointments($(this).val());
    });
  
    // View appointment details
    $(document).on("click", ".view-appointment-btn", function() {
      const id = $(this).data("id");
      const appointment = mockAppointments.find(a => a.id === id);
      
      if (appointment) {
        $("#appointment-details-title").text(appointment.title);
        $("#appointment-details-date").text(formatTime(appointment.date));
        $("#appointment-details-type").text(formatType(appointment.type));
        $("#appointment-details-status").text(appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1));
        $("#appointment-details-mentee").text(appointment.menteeName);
        $("#appointment-details-location").text(appointment.location);
        $("#appointment-details-duration").text(`${appointment.duration} minutes`);
        $("#appointment-details-notes").text(appointment.notes || "No notes provided");
        
        $("#appointment-details-modal").fadeIn();
      }
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
    loadAppointments();
  });