$(document).ready(function() {
    // Mock data for resources
    const mockResources = [
      {
        id: 1,
        title: "Academic Success Guide",
        category: "academic",
        type: "document",
        description: "Comprehensive guide to academic success for young women",
        file: "academic_success.pdf",
        tags: ["education", "study", "academic"],
        downloads: 24,
        shares: 12,
        rating: 4.5,
        added: "2025-01-15"
      },
      {
        id: 2,
        title: "Career Planning Workshop",
        category: "career",
        type: "video",
        description: "Video workshop on career planning and job search strategies",
        file: "career_planning.mp4",
        tags: ["career", "employment", "workshop"],
        downloads: 18,
        shares: 8,
        rating: 4.2,
        added: "2025-02-10"
      },
      {
        id: 3,
        title: "Mental Health Resources",
        category: "health",
        type: "link",
        description: "Collection of mental health resources and support services",
        file: "https://mentalhealth.org/resources",
        tags: ["health", "wellness", "mental"],
        downloads: 32,
        shares: 15,
        rating: 4.8,
        added: "2025-03-05"
      }
    ];
  
    // Mock mentees for sharing
    const mockMentees = [
      { id: 1, name: "Marie Uwimana" },
      { id: 2, name: "Claudine Nyiraneza" },
      { id: 3, name: "Annette Mukamana" }
    ];
  
    // Load resources into the grid
    function loadResources(category = "all", sort = "newest") {
      const grid = $("#resources-grid");
      grid.empty();
      
      let filteredResources = mockResources;
      
      if (category !== "all") {
        filteredResources = mockResources.filter(res => res.category === category);
      }
      
      // Sort resources
      if (sort === "newest") {
        filteredResources.sort((a, b) => new Date(b.added) - new Date(a.added));
      } else if (sort === "oldest") {
        filteredResources.sort((a, b) => new Date(a.added) - new Date(b.added));
      } else if (sort === "popular") {
        filteredResources.sort((a, b) => b.downloads - a.downloads);
      } else if (sort === "title") {
        filteredResources.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      if (filteredResources.length === 0) {
        grid.append('<div class="empty-state"><p>No resources found</p></div>');
        return;
      }
      
      filteredResources.forEach(resource => {
        const icon = getResourceIcon(resource.type);
        const card = $(`
          <div class="resource-card" data-id="${resource.id}">
            <div class="resource-icon">${icon}</div>
            <div class="resource-content">
              <h4>${resource.title}</h4>
              <div class="resource-meta">
                <span class="resource-category">${formatCategory(resource.category)}</span>
                <span class="resource-type">${formatType(resource.type)}</span>
              </div>
              <p class="resource-description">${resource.description}</p>
              <div class="resource-stats">
                <span><i class="fas fa-download"></i> ${resource.downloads}</span>
                <span><i class="fas fa-share"></i> ${resource.shares}</span>
                <span><i class="fas fa-star"></i> ${resource.rating}</span>
              </div>
            </div>
            <div class="resource-actions">
              <button class="btn-icon view-resource-btn"><i class="fas fa-eye"></i></button>
              <button class="btn-icon share-resource-btn"><i class="fas fa-share"></i></button>
            </div>
          </div>
        `);
        
        grid.append(card);
      });
    }
  
    // Get icon for resource type
    function getResourceIcon(type) {
      const icons = {
        "document": '<i class="fas fa-file-pdf"></i>',
        "video": '<i class="fas fa-video"></i>',
        "link": '<i class="fas fa-link"></i>',
        "presentation": '<i class="fas fa-file-powerpoint"></i>'
      };
      return icons[type] || '<i class="fas fa-file-alt"></i>';
    }
  
    // Format category for display
    function formatCategory(category) {
      const categories = {
        "academic": "Academic",
        "career": "Career",
        "health": "Health & Wellness",
        "life-skills": "Life Skills",
        "parenting": "Parenting"
      };
      return categories[category] || category;
    }
  
    // Format type for display
    function formatType(type) {
      const types = {
        "document": "Document",
        "video": "Video",
        "link": "Web Link",
        "presentation": "Presentation"
      };
      return types[type] || type;
    }
  
    // Open new resource modal
    $("#add-resource-btn").click(function() {
      $("#resource-form")[0].reset();
      $("#resource-modal").fadeIn();
    });
  
    // Close modal
    $(".close-modal, .close-modal-btn").click(function() {
      $(".modal").fadeOut();
    });
  
    // Handle resource form submission
    $("#resource-form").submit(function(e) {
      e.preventDefault();
      
      const formData = {
        id: mockResources.length + 1,
        title: $("#resource-title").val(),
        category: $("#resource-category").val(),
        type: $("#resource-type").val(),
        description: $("#resource-description").val(),
        file: $("#resource-file").val().split("\\").pop() || $("#resource-link").val(),
        tags: $("#resource-tags").val().split(",").map(tag => tag.trim()),
        downloads: 0,
        shares: 0,
        rating: 0,
        added: new Date().toISOString().split("T")[0]
      };
      
      mockResources.push(formData);
      loadResources($("#resource-category").val(), $("#resource-sort").val());
      $("#resource-modal").fadeOut();
      showNotification("Resource added successfully!");
    });
  
    // View resource details
    $(document).on("click", ".view-resource-btn", function() {
      const id = $(this).closest(".resource-card").data("id");
      const resource = mockResources.find(r => r.id === id);
      
      if (resource) {
        $("#resource-details-title").text(resource.title);
        $("#resource-details-category").text(formatCategory(resource.category));
        $("#resource-details-date").text(`Added on ${new Date(resource.added).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
        $("#resource-details-description").text(resource.description);
        $("#resource-details-icon").attr("class", getResourceIcon(resource.type).match(/class="([^"]*)"/)[1]);
        $("#download-count").text(resource.downloads);
        $("#share-count").text(resource.shares);
        $("#rating").text(resource.rating);
        
        // Set preview based on type
        const preview = $("#resource-preview");
        preview.empty();
        
        if (resource.type === "document") {
          preview.append(`<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(resource.file)}&embedded=true" style="width:100%; height:300px;" frameborder="0"></iframe>`);
        } else if (resource.type === "video") {
          preview.append(`<video controls style="width:100%"><source src="${resource.file}" type="video/mp4">Your browser does not support the video tag.</video>`);
        } else if (resource.type === "link") {
          preview.append(`<a href="${resource.file}" target="_blank" class="btn-primary">Visit Link</a>`);
        } else {
          preview.append(`<p>Preview not available for this resource type</p>`);
        }
        
        $("#resource-details-modal").fadeIn();
      }
    });
  
    // Share resource
    $(document).on("click", ".share-resource-btn", function() {
      const id = $(this).closest(".resource-card").data("id");
      const resource = mockResources.find(r => r.id === id);
      
      if (resource) {
        $("#share-resource-title").text(resource.title);
        
        // Load mentees into dropdown
        const dropdown = $("#share-mentees");
        dropdown.empty();
        
        mockMentees.forEach(mentee => {
          dropdown.append(`<option value="${mentee.id}">${mentee.name}</option>`);
        });
        
        $("#share-resource-modal").fadeIn();
      }
    });
  
    // Handle share form submission
    $("#share-resource-form").submit(function(e) {
      e.preventDefault();
      
      const resourceId = $("#share-resource-title").text();
      const menteeIds = $("#share-mentees").val();
      const message = $("#share-message").val();
      
      // In a real app, we would send this data to the server
      console.log(`Sharing resource ${resourceId} with mentees ${menteeIds} and message: ${message}`);
      
      // Update share count
      const resource = mockResources.find(r => r.title === resourceId);
      if (resource) {
        resource.shares += menteeIds.length;
      }
      
      $("#share-resource-modal").fadeOut();
      showNotification("Resource shared successfully!");
    });
  
    // Handle category card clicks
    $(".category-card").click(function() {
      const category = $(this).data("category");
      $("#resources-section-title").text($(this).find("h4").text());
      loadResources(category, $("#resource-sort").val());
    });
  
    // Handle sort change
    $("#resource-sort").change(function() {
      loadResources($("#resources-section-title").text().includes("All") ? "all" : $(".category-card.active").data("category"), $(this).val());
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
    loadResources();
  });