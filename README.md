# Mufashe Initiative Website

## Project Title:

Mufashe Initiative - Supporting Young Mothers in Rwanda

## Description:

Mufashe Initiative is an online platform that provides mentorship, mental health resources, and a supportive community for young women in Rwanda who became pregnant early. The platform aims to create a safe space where young mothers can find help, connect with mentors, and access useful resources.

## Team Members:

- *Divine Nibuhoro*
- *Daniel Iryivuze*

## Technologies Used:

- *HTML* for structuring the web pages.
- *SASS* (Syntactically Awesome Stylesheets) for styling, ensuring modularity and maintainability.
- *JavaScript & jQuery* for interactivity.
- *AJAX* for dynamic content fetching.
- *JSON Server* (or mock API) for backend simulation.
- *Local Storage & Cookies* for user personalization.

## Development Process:

### 1. Project Setup & Planning:

- *Reviewed Figma Design:* Identified key sections and design elements.
- *Structured the Project:* Organized files and directories efficiently:
  
  Mufashe/
  ├── css/
  │   ├── components/
  │   ├── style.css
  │   ├── style.css.map
  │   ├── style.scss
  │   ├── styledash.css
  │   ├── styledash.css.map
  ├── data/
  │   ├── db.json
  ├── images/
  ├── js/
  │   ├── appointments.js
  │   ├── mentees.js
  │   ├── messages.js
  │   ├── reports.js
  │   ├── resources.js
  │   ├── script.js
  │   ├── scriptdash.js
  ├── scss/
  ├── node_modules/
  ├── appointments.html
  ├── contact.html
  ├── dashboard.html
  ├── dashresources.html
  ├── index.html
  ├── login.html
  ├── mental-health.html
  ├── mentees.html
  ├── mentorship.html
  ├── messages.html
  ├── register.html
  ├── reports.html
  ├── resources.html
  ├── stories.html
  ├── mentor-dashboard/
  │   ├── overview.html
  │   ├── my-mentees.html
  │   ├── resources.html
  │   ├── messages.html
  │   ├── appointments.html
  │   ├── reports.html
  ├── package.json
  ├── package-lock.json
  ├── README.md
  
- *SASS Setup:* Configured and compiled SASS using "Live Sass Compiler" in VS Code.

### 2. HTML Structure:

- Implemented *semantic HTML* for better readability and accessibility.
- Ensured a well-structured layout with clean code and proper comments.
- Applied ARIA attributes to improve accessibility.

### 3. SASS Styling:

- Used *modular SASS* by creating partials for better code management.
- Defined *variables* for colors, fonts, and spacing.
- Applied *mixins* for reusable styling components.
- Designed a *responsive layout* using media queries.

### 4. JavaScript & Interactivity:

- Implemented *event listeners* for dynamic content updates.
- Added *form validation* for improved user experience.
- Enhanced navigation and interactions with JavaScript & jQuery.

### 5. Backend Simulation & Data Fetching:

- Used *JSON Server* for mock backend.
- Implemented *AJAX requests* for data retrieval and manipulation.
- Supported *CRUD operations* to manage user data.

### 6. User Personalization:

- Stored user preferences using *local storage*.
- Utilized *cookies* for session tracking.

### 7. Accessibility & Responsiveness:

- Ensured compliance with accessibility standards.
- Optimized the site for various screen sizes.

### 8. Code Optimization & Documentation:

- Refactored code for efficiency.
- Updated the README with new features and instructions.

## Mentor Dashboard:

We have added a *Mentor Dashboard* to provide mentors with a structured interface to manage their responsibilities effectively. The dashboard includes the following pages:

1. *Overview* - Provides a summary of activities and upcoming sessions.
2. *My Mentees* - Lists mentees assigned to the mentor.
3. *Resources* - Displays helpful materials for mentors and mentees.
4. *Messages* - Enables communication between mentors and mentees.
5. *Appointments* - Manages mentorship session scheduling.
6. *Reports* - Allows mentors to track progress and submit reports.

### Mentor Dashboard Structure:


mentor-dashboard/
├── overview.html
├── my-mentees.html
├── resources.html
├── messages.html
├── appointments.html
├── reports.html


## Challenges Faced:

- *SASS Learning Curve:* Initially challenging but improved through practice.
- *Mock API Setup:* Required research and testing to implement JSON Server effectively.

## How to Run the Project:

### 1. Clone the Repository:

bash
 git clone https://github.com/Daniel-IRYIVUZE/mufashe_initiative.git


### 2. Navigate to the Project Folder:

bash
 cd Mufashe


### 3. Install Dependencies (if using JSON Server):

bash
 npm install -g json-server


### 4. Run the JSON Server:

bash
 json-server --watch data/db.json --port 3000


### 5. Compile SASS:

bash
 sass --watch css/style.scss css/style.css


### 6. Open the Project in a Browser:

bash
 npx http-server


### 7. Test Features:

- Explore site features and validate functionality.
- Test form validation and API interactions.
- Log in as a mentor and check dashboard functionality.

## Key Features:

- *Mentorship Program:* Connects young mothers with mentors.
- *Mental Health Support:* Provides counseling and self-care resources.
- *Inspiring Stories:* Showcases real-life success stories.
- *Resource Center:* Lists scholarships, financial aid, and legal help.
- *Community Forum:* Enables peer support and engagement.
- *Mentor Dashboard:* Allows mentors to manage sessions.

## Useful Link:

- *User Research Document:* [Research Document](https://docs.google.com/document/d/1D9i_yRiZdA04hvgwubIZ4B1jnpHtXLyxdKUBskBCsqQ/edit?usp=sharing)

## Pro Tips:

- Start with the basics and enhance incrementally.
- Use developer tools for debugging.
- Break tasks into smaller steps for efficiency.
- Seek help when needed!

This project demonstrates front-end development, interactivity, and backend simulation, resulting in a functional and user-friendly web application.