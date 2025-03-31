$(document).ready(function() {
    // Initialize charts
    const sessionsCtx = $("#sessions-chart");
    const progressCtx = $("#progress-chart");
    const sessionTypesCtx = $("#session-types-chart");
    const resourcesCtx = $("#resources-chart");
    
    let sessionsChart, progressChart, sessionTypesChart, resourcesChart;
    
    // Mock data for reports
    const mockReportData = {
      sessionsOverTime: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        data: [12, 15, 18, 14, 16, 20]
      },
      menteeProgress: {
        labels: ["Excellent", "Good", "Average", "Needs Improvement"],
        data: [5, 10, 15, 8]
      },
      sessionTypes: {
        labels: ["In Person", "Video Call", "Phone Call"],
        data: [25, 15, 10]
      },
      resourceUsage: {
        labels: ["Academic", "Career", "Health", "Life Skills", "Parenting"],
        data: [35, 25, 15, 10, 5]
      },
      detailedData: [
        {
          date: "2025-03-01",
          mentee: "Marie Uwimana",
          sessionType: "In Person",
          duration: 60,
          topics: "Academic progress, study plan",
          resources: "Math study guide",
          followup: "Send additional practice problems"
        },
        {
          date: "2025-03-03",
          mentee: "Claudine Nyiraneza",
          sessionType: "Video Call",
          duration: 90,
          topics: "Mental health, counseling",
          resources: "Mental health resources",
          followup: "Schedule follow-up in 2 weeks"
        },
        {
          date: "2025-03-05",
          mentee: "Annette Mukamana",
          sessionType: "In Person",
          duration: 60,
          topics: "Business plan, funding",
          resources: "Entrepreneurship guide",
          followup: "Review business proposal draft"
        },
        {
          date: "2025-03-10",
          mentee: "Marie Uwimana",
          sessionType: "Phone Call",
          duration: 30,
          topics: "University application questions",
          resources: "University guide",
          followup: "None"
        },
        {
          date: "2025-03-15",
          mentee: "Claudine Nyiraneza",
          sessionType: "Video Call",
          duration: 60,
          topics: "Follow-up counseling",
          resources: "None",
          followup: "Check in next week"
        }
      ]
    };
  
    // Load charts
    function loadCharts() {
      // Sessions over time chart
      if (sessionsChart) sessionsChart.destroy();
      
      sessionsChart = new Chart(sessionsCtx, {
        type: $("#sessions-chart-type").val(),
        data: {
          labels: mockReportData.sessionsOverTime.labels,
          datasets: [{
            label: 'Sessions',
            data: mockReportData.sessionsOverTime.data,
            backgroundColor: 'rgba(74, 111, 165, 0.2)',
            borderColor: 'rgba(74, 111, 165, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
      // Mentee progress chart
      if (progressChart) progressChart.destroy();
      
      progressChart = new Chart(progressCtx, {
        type: 'doughnut',
        data: {
          labels: mockReportData.menteeProgress.labels,
          datasets: [{
            data: mockReportData.menteeProgress.data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(255, 99, 132, 0.7)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
      
      // Session types chart
      if (sessionTypesChart) sessionTypesChart.destroy();
      
      sessionTypesChart = new Chart(sessionTypesCtx, {
        type: 'pie',
        data: {
          labels: mockReportData.sessionTypes.labels,
          datasets: [{
            data: mockReportData.sessionTypes.data,
            backgroundColor: [
              'rgba(74, 111, 165, 0.7)',
              'rgba(22, 96, 136, 0.7)',
              'rgba(79, 195, 247, 0.7)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
      
      // Resource usage chart
      if (resourcesChart) resourcesChart.destroy();
      
      resourcesChart = new Chart(resourcesCtx, {
        type: 'bar',
        data: {
          labels: mockReportData.resourceUsage.labels,
          datasets: [{
            label: 'Downloads',
            data: mockReportData.resourceUsage.data,
            backgroundColor: 'rgba(74, 111, 165, 0.7)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Load detailed data table
    function loadDetailedData() {
      const tableBody = $("#report-table-body");
      tableBody.empty();
      
      mockReportData.detailedData.forEach(item => {
        const row = $(`
          <tr>
            <td>${item.date}</td>
            <td>${item.mentee}</td>
            <td>${item.sessionType}</td>
            <td>${item.duration} mins</td>
            <td>${item.topics}</td>
            <td>${item.resources}</td>
            <td>${item.followup}</td>
          </tr>
        `);
        
        tableBody.append(row);
      });
    }
  
    // Handle report type change
    $("#report-type").change(function() {
      const reportType = $(this).val();
      
      // Show/hide mentee filter based on report type
      if (reportType === "mentee-progress" || reportType === "custom") {
        $("#mentee-filter-row").show();
      } else {
        $("#mentee-filter-row").hide();
      }
    });
  
    // Handle time period change
    $("#time-period").change(function() {
      const period = $(this).val();
      
      if (period === "custom") {
        $("#custom-date-range").show();
      } else {
        $("#custom-date-range").hide();
      }
    });
  
    // Handle chart type change
    $("#sessions-chart-type").change(function() {
      loadCharts();
    });
  
    // Generate report
    $("#generate-report-btn").click(function() {
      loadCharts();
      loadDetailedData();
      showNotification("Report generated successfully!");
    });
  
    // Open custom report modal
    $("#custom-report-btn").click(function() {
      $("#custom-report-modal").fadeIn();
    });
  
    // Handle custom time frame change
    $("#report-timeframe").change(function() {
      if ($(this).val() === "custom") {
        $("#custom-timeframe-group").show();
      } else {
        $("#custom-timeframe-group").hide();
      }
    });
  
    // Open export modal
    $("#export-report-btn, #export-table-btn").click(function() {
      $("#export-modal").fadeIn();
    });
  
    // Handle export content change
    $("#export-content").change(function() {
      if ($(this).val() === "custom") {
        $("#custom-export-group").show();
      } else {
        $("#custom-export-group").hide();
      }
    });
  
    // Close modal
    $(".close-modal, .close-modal-btn").click(function() {
      $(".modal").fadeOut();
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
    loadCharts();
    loadDetailedData();
  });