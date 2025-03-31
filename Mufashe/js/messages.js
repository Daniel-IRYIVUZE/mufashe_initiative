$(document).ready(function() {
    // Mock data for conversations and messages
    const mockConversations = [
      {
        id: 1,
        participant: {
          id: 1,
          name: "Marie Uwimana",
          role: "Mentee",
          location: "Kigali",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s",
          status: "active"
        },
        lastMessage: {
          text: "Thank you for the resources!",
          time: "2025-03-20T10:15:00Z",
          read: true
        },
        unreadCount: 0,
        type: "mentees"
      },
      {
        id: 2,
        participant: {
          id: 2,
          name: "Claudine Nyiraneza",
          role: "Mentee",
          location: "Northern",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s",
          status: "active"
        },
        lastMessage: {
          text: "Can we reschedule our session?",
          time: "2025-03-21T14:30:00Z",
          read: false
        },
        unreadCount: 1,
        type: "mentees"
      },
      {
        id: 3,
        participant: {
          id: 3,
          name: "Program Coordinator",
          role: "Staff",
          location: "Kigali",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s",
          status: "active"
        },
        lastMessage: {
          text: "Monthly report is due next week",
          time: "2025-03-19T09:00:00Z",
          read: true
        },
        unreadCount: 0,
        type: "staff"
      }
    ];
  
    const mockMessages = {
      1: [
        {
          id: 1,
          sender: 1,
          text: "Hello, I hope you're doing well!",
          time: "2025-03-18T09:30:00Z",
          read: true
        },
        {
          id: 2,
          sender: "me",
          text: "Hello Marie! I'm doing well, how about you?",
          time: "2025-03-18T10:15:00Z",
          read: true
        },
        {
          id: 3,
          sender: 1,
          text: "I'm good! I was wondering if you could share some resources for math?",
          time: "2025-03-19T14:00:00Z",
          read: true
        },
        {
          id: 4,
          sender: "me",
          text: "Of course! Here's a link to some great materials: [Academic Resources]",
          time: "2025-03-19T15:30:00Z",
          read: true
        },
        {
          id: 5,
          sender: 1,
          text: "Thank you for the resources!",
          time: "2025-03-20T10:15:00Z",
          read: true
        }
      ],
      2: [
        {
          id: 1,
          sender: 2,
          text: "Good morning",
          time: "2025-03-20T08:00:00Z",
          read: true
        },
        {
          id: 2,
          sender: "me",
          text: "Good morning Claudine, how are you today?",
          time: "2025-03-20T08:15:00Z",
          read: true
        },
        {
          id: 3,
          sender: 2,
          text: "I'm okay, but can we reschedule our session?",
          time: "2025-03-21T14:30:00Z",
          read: false
        }
      ],
      3: [
        {
          id: 1,
          sender: 3,
          text: "Hello , just a reminder that the monthly report is due next week",
          time: "2025-03-19T09:00:00Z",
          read: true
        },
        {
          id: 2,
          sender: "me",
          text: "Thanks for the reminder, I'll have it ready by Friday",
          time: "2025-03-19T10:30:00Z",
          read: true
        }
      ]
    };
  
    const mockSharedFiles = {
      1: [
        { id: 1, name: "math_resources.pdf", type: "pdf", size: "2.4 MB" }
      ],
      2: [],
      3: [
        { id: 1, name: "monthly_report_template.docx", type: "docx", size: "1.2 MB" }
      ]
    };
  
    // Current conversation
    let currentConversation = null;
  
    // Load conversations
    function loadConversations(filter = "all") {
      const list = $("#conversations-list");
      list.empty();
      
      let filteredConversations = mockConversations;
      
      if (filter === "unread") {
        filteredConversations = mockConversations.filter(conv => conv.unreadCount > 0);
      } else if (filter === "mentees") {
        filteredConversations = mockConversations.filter(conv => conv.type === "mentees");
      } else if (filter === "staff") {
        filteredConversations = mockConversations.filter(conv => conv.type === "staff");
      }
      
      if (filteredConversations.length === 0) {
        list.append('<div class="empty-state"><p>No conversations found</p></div>');
        return;
      }
      
      // Sort by last message time
      filteredConversations.sort((a, b) => new Date(b.lastMessage.time) - new Date(a.lastMessage.time));
      
      filteredConversations.forEach(conv => {
        const lastMessageTime = new Date(conv.lastMessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isUnread = conv.unreadCount > 0;
        
        const item = $(`
          <li class="conversation-item ${isUnread ? 'unread' : ''} ${currentConversation?.id === conv.id ? 'active' : ''}" data-id="${conv.id}">
            <img src="${conv.participant.avatar}" alt="${conv.participant.name}" class="avatar">
            <div class="conversation-info">
              <h4>${conv.participant.name}</h4>
              <p class="conversation-preview">${conv.lastMessage.text}</p>
            </div>
            <div class="conversation-meta">
              <span class="conversation-time">${lastMessageTime}</span>
              ${isUnread ? '<span class="conversation-unread">' + conv.unreadCount + '</span>' : ''}
            </div>
          </li>
        `);
        
        list.append(item);
      });
    }
  
    // Load messages for a conversation
    function loadMessages(conversationId) {
      const messages = mockMessages[conversationId] || [];
      const content = $("#messages-content");
      content.empty();
      
      if (messages.length === 0) {
        content.append('<div class="empty-state"><p>No messages in this conversation</p></div>');
        return;
      }
      
      messages.forEach(msg => {
        const isMe = msg.sender === "me";
        const messageTime = new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageElement = $(`
          <div class="message ${isMe ? 'sent' : 'received'}">
            ${!isMe ? `<img src="${currentConversation.participant.avatar}" alt="${currentConversation.participant.name}" class="avatar">` : ''}
            <div class="message-content">
              <p>${msg.text}</p>
              <span class="message-time">${messageTime}</span>
            </div>
          </div>
        `);
        
        content.append(messageElement);
      });
      
      // Scroll to bottom
      content.scrollTop(content[0].scrollHeight);
    }
  
    // Show conversation info
    function showConversationInfo(conversationId) {
      const conversation = mockConversations.find(c => c.id === conversationId);
      if (!conversation) return;
      
      $("#info-avatar").attr("src", conversation.participant.avatar);
      $("#info-name").text(conversation.participant.name);
      $("#info-role").text(conversation.participant.role);
      $("#info-location").text(conversation.participant.location);
      
      // Load shared files
      const files = mockSharedFiles[conversationId] || [];
      const filesList = $("#shared-files-list");
      filesList.empty();
      
      if (files.length === 0) {
        filesList.append('<li class="empty">No files shared</li>');
      } else {
        files.forEach(file => {
          const icon = getFileIcon(file.type);
          const item = $(`
            <li>
              ${icon}
              <span>${file.name}</span>
              <span class="file-size">${file.size}</span>
            </li>
          `);
          
          filesList.append(item);
        });
      }
      
      $("#conversation-info").addClass("active");
    }
  
    // Get file icon
    function getFileIcon(type) {
      const icons = {
        "pdf": '<i class="fas fa-file-pdf"></i>',
        "docx": '<i class="fas fa-file-word"></i>',
        "xlsx": '<i class="fas fa-file-excel"></i>',
        "jpg": '<i class="fas fa-file-image"></i>',
        "png": '<i class="fas fa-file-image"></i>'
      };
      return icons[type] || '<i class="fas fa-file"></i>';
    }
  
    // Open new message modal
    $("#new-message-btn, #empty-new-message-btn").click(function() {
      // Load mentees and staff into dropdown
      const menteesGroup = $("optgroup[label='Mentees']");
      const staffGroup = $("optgroup[label='Staff']");
      
      menteesGroup.empty();
      staffGroup.empty();
      
      mockConversations.filter(c => c.type === "mentees").forEach(conv => {
        menteesGroup.append(`<option value="${conv.participant.id}">${conv.participant.name}</option>`);
      });
      
      mockConversations.filter(c => c.type === "staff").forEach(conv => {
        staffGroup.append(`<option value="${conv.participant.id}">${conv.participant.name}</option>`);
      });
      
      $("#new-message-form")[0].reset();
      $("#new-message-modal").fadeIn();
    });
  
    // Close modal
    $(".close-modal, .close-modal-btn").click(function() {
      $(".modal").fadeOut();
    });
  
    // Close info panel
    $("#close-info-btn").click(function() {
      $("#conversation-info").removeClass("active");
    });
  
    // Handle conversation filter
    $(".filter-btn").click(function() {
      $(".filter-btn").removeClass("active");
      $(this).addClass("active");
      
      const filter = $(this).data("filter");
      loadConversations(filter);
    });
  
    // Select conversation
    $(document).on("click", ".conversation-item", function() {
      const conversationId = $(this).data("id");
      const conversation = mockConversations.find(c => c.id === conversationId);
      
      if (conversation) {
        currentConversation = conversation;
        
        // Mark as read
        conversation.unreadCount = 0;
        conversation.lastMessage.read = true;
        
        // Update UI
        $(".conversation-item").removeClass("active");
        $(this).addClass("active").removeClass("unread");
        $(this).find(".conversation-unread").remove();
        
        // Update header
        $("#message-avatar").attr("src", conversation.participant.avatar);
        $("#recipient-name").text(conversation.participant.name);
        $("#recipient-status").text(conversation.participant.role + " • " + conversation.participant.status);
        
        // Load messages
        loadMessages(conversationId);
        
        // Show message composer
        $("#message-composer").show();
        $("#messages-content").removeClass("empty");
      }
    });
  
    // Show conversation info
    $("#info-btn").click(function() {
      if (currentConversation) {
        showConversationInfo(currentConversation.id);
      }
    });
  
    // Send message
    $("#send-message-btn").click(function() {
      if (!currentConversation || !$("#message-input").val().trim()) return;
      
      const newMessage = {
        id: (mockMessages[currentConversation.id]?.length || 0) + 1,
        sender: "me",
        text: $("#message-input").val().trim(),
        time: new Date().toISOString(),
        read: true
      };
      
      // Add to messages
      if (!mockMessages[currentConversation.id]) {
        mockMessages[currentConversation.id] = [];
      }
      mockMessages[currentConversation.id].push(newMessage);
      
      // Update conversation
      currentConversation.lastMessage = {
        text: newMessage.text,
        time: newMessage.time,
        read: true
      };
      
      // Reload messages
      loadMessages(currentConversation.id);
      
      // Clear input
      $("#message-input").val("");
      
      // Reload conversations to update order
      loadConversations($(".filter-btn.active").data("filter"));
    });
  
    // Handle new message form submission
    $("#new-message-form").submit(function(e) {
      e.preventDefault();
      
      const recipientId = $("#message-recipient").val();
      if (!recipientId) return;
      
      const recipient = mockConversations.find(c => c.participant.id == recipientId)?.participant;
      if (!recipient) return;
      
      // Create new conversation if it doesn't exist
      let conversation = mockConversations.find(c => c.participant.id == recipientId);
      
      if (!conversation) {
        conversation = {
          id: mockConversations.length + 1,
          participant: recipient,
          lastMessage: {
            text: $("#message-content").val(),
            time: new Date().toISOString(),
            read: false
          },
          unreadCount: 0,
          type: recipient.role === "Mentee" ? "mentees" : "staff"
        };
        
        mockConversations.push(conversation);
        mockMessages[conversation.id] = [];
      }
      
      // Add message
      const newMessage = {
        id: (mockMessages[conversation.id]?.length || 0) + 1,
        sender: "me",
        text: $("#message-content").val(),
        time: new Date().toISOString(),
        read: false
      };
      
      if (!mockMessages[conversation.id]) {
        mockMessages[conversation.id] = [];
      }
      mockMessages[conversation.id].push(newMessage);
      
      // Update conversation
      conversation.lastMessage = {
        text: newMessage.text,
        time: newMessage.time,
        read: false
      };
      
      // Close modal
      $("#new-message-modal").fadeOut();
      
      // Select the conversation
      currentConversation = conversation;
      loadMessages(conversation.id);
      loadConversations($(".filter-btn.active").data("filter"));
      
      // Update UI
      $("#message-avatar").attr("src", conversation.participant.avatar);
      $("#recipient-name").text(conversation.participant.name);
      $("#recipient-status").text(conversation.participant.role + " • " + conversation.participant.status);
      $("#message-composer").show();
      $("#messages-content").removeClass("empty");
      
      showNotification("Message sent successfully!");
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
    loadConversations();
  });