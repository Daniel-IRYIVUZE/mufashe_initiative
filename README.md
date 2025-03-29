# Mufashe Initiative Website

## Project Title:
Mufashe Initiative - Supporting Young Mothers in Rwanda

## Description:
Mufashe Initiative is an online platform that provides mentorship, mental health resources, and a supportive community for young women in Rwanda who became pregnant early. The platform aims to create a safe space where young mothers can find help, connect with mentors, and access useful resources.

## Team Members:
- **Divine Nibuhoro**
- **Daniel Iryivuze**

## Technologies Used:
- **HTML** for structuring the web pages.
- **SASS** (Syntactically Awesome Stylesheets) for styling, ensuring modularity and maintainability.
- **JavaScript & jQuery** for interactivity.
- **AJAX** for dynamic content fetching.
- **JSON Server** (or mock API) for backend simulation.
- **Local Storage & Cookies** for user personalization.

## Development Process:

### 1. Project Setup & Planning:
- **Review Figma Design:** Analyzed the Figma design to identify sections, elements, and styling.
- **Project Structure:** Organized the project with a structured file system:
  ```
  Mufashe/
  ├── index.html
  ├── css/
  │   ├── style.scss  (Main SASS file)
  │   ├── components/ (For partials, e.g., _variable.scss, _mixins.scss)
  ├── js/
  │   ├── main.js (Handles interactivity)
  │   ├── api.js (Handles AJAX requests)
  ├── images/
  ├── data/
  │   ├── db.json (Mock API data)
  ├── README.md
  ```
- **SASS Setup:** Configured SASS for styling with a "Live Sass Compiler" in VS Code.

### 2. HTML Structure:
- Used **semantic HTML** elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) for logical content organization.
- Ensured **clean and readable code** with proper indentation and comments.
- Considered **accessibility** principles with appropriate ARIA attributes and structured headings.

### 3. SASS Styling:
- Implemented **modular SASS**, organizing styles into partials for better maintainability.
- Used **variables** for colors, fonts, and spacing values.
- Applied **mixins** for reusable styles like buttons and forms.
- Followed **CSS/SASS best practices** for maintainability.
- Added **responsive design** using media queries for better mobile experience.

### 4. JavaScript & Interactivity:
- Used **JavaScript & jQuery** for dynamic content updates and interactivity.
- Implemented **form validation** to ensure accurate user inputs.
- Used **event listeners** for button clicks, form submissions, and navigation.

### 5. Backend Simulation & Data Fetching:
- Used **JSON Server** to create a mock backend.
- Implemented **AJAX requests** to fetch and manipulate data dynamically.
- Allowed users to **create, read, update, and delete** data from the mock API.

### 6. User Personalization:
- Utilized **local storage** to save user preferences.
- Implemented **cookies** for session tracking and personalization.

### 7. Accessibility & Responsiveness:
- Ensured all elements are accessible to users with disabilities.
- Maintained a fully responsive layout across various screen sizes.

### 8. Code Optimization & Documentation:
- Refactored code for efficiency and maintainability.
- Updated the README file to reflect new functionalities and API endpoints.

## How to Run the Project:

### 1. Clone the Repository:
```bash
 git clone https://github.com/Daniel-IRYIVUZE/mufashe_initiative.git
```

### 2. Navigate to the Project Folder:
```bash
 cd Mufashe
```

### 3. Install Dependencies (if using JSON Server):
```bash
 npm install -g json-server
```

### 4. Run the JSON Server:
```bash
 json-server --watch data/db.json --port 3000
```

### 5. Compile SASS (if necessary):
- Use the **Live Sass Compiler** in VS Code or run the following command:
```bash
 sass --watch css/style.scss css/style.css
```

### 6. Open the Project in a Browser:
- Open `index.html` in your browser manually, or run a simple HTTP server:
```bash
 npx http-server
```

### 7. Test Features:
- Navigate through the site and test dynamic content.
- Ensure form validation and API interactions work as expected.

## Key Features:
- **Mentorship Program:** Connect young mothers with experienced mentors.
- **Mental Health Support:** Access counseling services and self-care tips.
- **Inspiring Stories:** Read real-life success stories from other young mothers.
- **Resource Center:** Find scholarships, financial aid, and legal support.
- **Community Forum:** Engage with a supportive network of women facing similar challenges.

## Useful Links:
- **User Research Document:** [Research Document](https://docs.google.com/document/d/1D9i_yRiZdA04hvgwubIZ4B1jnpHtXLyxdKUBskBCsqQ/edit?usp=sharing)

## Evaluation Criteria:
- **Accuracy:** Does the implementation match the Figma design?
- **Code Quality:** Is the code clean, structured, and maintainable?
- **Functionality:** Do JavaScript, AJAX, and API interactions work correctly?
- **User Experience:** Is the interface intuitive and responsive?
- **Accessibility:** Are best practices followed for an inclusive experience?
- **Version Control:** Are commits regular and descriptive?
- **Collaboration:** Are branches and pull requests used effectively?

## Pro Tips:
- Start with the basic structure and gradually enhance styling and functionality.
- Utilize browser developer tools for debugging.
- Break down tasks into manageable chunks.
- Seek help when needed!

This project showcases front-end development, interactivity, and backend simulation, demonstrating the ability to build a functional and user-friendly web application.

