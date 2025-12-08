# Code with Byte – Online Course Platform

A modern, fully responsive web application for browsing, searching, filtering, and purchasing online courses. Built with vanilla HTML, CSS, and JavaScript.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Key Technologies](#key-technologies)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Features Explained](#features-explained)
- [Challenges & Solutions](#challenges--solutions)
- [Lessons Learned](#lessons-learned)
- [Future Enhancements](#future-enhancements)
- [File Descriptions](#file-descriptions)

---

## 🎯 Project Overview

**Code with Byte** is an e-learning platform where users can:
- Browse a curated collection of programming courses
- Search and filter courses by category, price, and rating
- View detailed course information in an interactive modal
- Add courses to a shopping cart
- Manage their cart and proceed to checkout
- Contact the platform for support

The project demonstrates modern front-end development practices including dynamic rendering, state management, responsive design, and smooth UX interactions.

---

## ✨ Features

### 1. **Course Catalog & Dynamic Rendering**
- Courses are loaded from `data/courses.json` and dynamically rendered into card components
- No hardcoded course data – entirely data-driven
- Each card displays: image, title, instructor, duration, rating, price, and description

### 2. **Search & Filter System**
- **Real-time search** across course title, category, and instructor
- **Multi-filter capability**: filter by category, price range ($0, $0–$10, $10–$20, $20+), and rating (3.5+, 4.0+, 4.5+)
- **Clear button** to quickly reset search input
- **Apply/Reset buttons** for manual filter management
- Results update instantly as users type or adjust filters

### 3. **Interactive Course Cards**
- Click any course card to expand and view full details
- Expanded view includes:
  - Course stats (projects, lectures, hours, rating)
  - Learning objectives and course modules
  - Smooth animations and transitions
- **Close button** (×) or press **ESC** to collapse
- **Backdrop overlay** on mobile to focus on the active card

### 4. **Shopping Cart**
- Add/remove courses from cart
- Cart persists in **localStorage** (survives page refresh)
- Real-time cart count badge in the header
- Cart summary showing:
  - Subtotal (full price × quantity)
  - Discount (savings from original price)
  - Total due
- Empty cart message when no items

### 5. **Responsive Design**
- Desktop view: courses in a flexible row layout
- Tablet (≤768px): single-column layout, search bar expands to full width
- Mobile (≤480px): optimized spacing, font sizes, and touch-friendly buttons
- Navigation menu collapses and stacks vertically
- Course modals adapt to screen size (fixed position on mobile)

### 6. **Header Search & Filter UI**
- Centralized search bar in the header
- Filter dropdown with category, price, and rating selectors
- Search and filter seamlessly work together
- "Clear Search" button hides when search input is empty

### 7. **Contact Page**
- Styled contact form with email and message fields
- Large textarea for detailed inquiries
- **Send button** with validation (checks for non-empty fields)
- Success confirmation after submission
- Form clears after successful send

### 8. **Visual Enhancements**
- **Rainbow gradient text** on headings (with CSS animation)
- **Typing animation** on page headings for dynamic effect
- **Animated course card borders** with rotating gradient effect
- **Enroll button** with animated rainbow gradient
- Smooth hover effects on all interactive elements
- **Backdrop overlay** for mobile modals

---

## 📁 Project Structure

```
Final Project Web/
├── index.html                 # Home page
├── course.html               # Course catalog page (main feature)
├── cart.html                 # Shopping cart page
├── contact.html              # Contact/support form
├── about.html                # About page
├── css/
│   ├── main.css              # Global styles & base components
│   ├── responsive.css        # Media queries (768px, 480px breakpoints)
│   ├── animation.css         # Keyframe animations
│   ├── course.css            # Course-specific styles
│   ├── cart.css              # Cart page styles
│   └── public/
│       ├── header.css        # Header & navigation styles
│       └── footer.css        # Footer styles
├── Js/
│   ├── script.js             # Course search/filter logic & card interactions
│   └── cart.js               # Shopping cart logic & localStorage management
├── data/
│   └── courses.json          # Course data (title, price, image, etc.)
├── images/                   # Course images & assets
└── README.md                 # This file
```

---

## 🛠 Key Technologies

- **HTML5** – Semantic structure
- **CSS3** – Flexbox, Grid, animations, gradients, media queries
- **JavaScript (ES6+)** – Classes, async/await, DOM manipulation, localStorage
- **Font Awesome 6.5.0** – Icon library (CDN)
- **JSON** – Data format for courses

**No frameworks or build tools** – vanilla implementations demonstrating core web concepts.

---

## 📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for proper CORS and file access)

### Steps

1. **Clone or download** the project folder to your local machine.

2. **Serve the project** using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # OR using Node.js (if installed)
   npx http-server
   
   # OR open directly in your browser (limited compatibility)
   file:///path/to/Final Project Web/index.html
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:8000` (or the port shown by your server)
   - Start on the home page or jump directly to `http://localhost:8000/course.html`

4. **Verify functionality**:
   - Type in the search box to filter courses in real-time
   - Click the Filter button to adjust category, price, and rating
   - Click a course card to expand and view details
   - Add courses to cart and navigate to `cart.html`

---

## 🎮 Usage Guide

### Browsing Courses
1. Navigate to the **Course** page from the header menu
2. All courses load automatically from `data/courses.json`
3. Courses display in a horizontal row layout (desktop) or stack vertically (mobile)

### Searching & Filtering
1. **Search**: Type in the search bar at the top of the page to filter by title, category, or instructor
2. **Filter by category**: Click the **Filter** button → select a category → click **Apply Filters**
3. **Filter by price**: Choose a price range (Free, Under $10, etc.)
4. **Filter by rating**: Select a minimum rating
5. **Clear all**: Click **Reset** to restore all courses or use the **Clear Search** (×) button

### Viewing Course Details
1. Click any course card to expand
2. View the course stats (projects, lectures, hours, rating)
3. Read about what you'll learn and course modules
4. Click the **Enroll Now** button to add to cart
5. Press **ESC** or click the **Close** (×) button to collapse

### Shopping Cart
1. Add courses by clicking **Enroll Now** on any course card
2. Navigate to the **Cart** page
3. View all added courses with a price breakdown
4. See the subtotal, discount (savings), and final total
5. Click **Remove** on any item to delete from cart
6. Click **Proceed to Checkout** to finalize purchase

### Contacting Support
1. Navigate to the **Contact** page
2. Enter your email address
3. Type your message in the large textarea
4. Click **Send Message**
5. Confirm the message sent and fields will clear

---

## 🔍 Features Explained

### Course Search Filter Class (`CourseSearchFilter`)
Located in `Js/script.js`, this class handles:
- **Loading courses** from `data/courses.json`
- **Real-time filtering** based on search text and selected filters
- **Dynamic card rendering** into the `.courses-grid` container
- **Event listeners** for search input, filter buttons, and card interactions
- **State management** for current search term and active filters

**Key methods**:
- `loadCourses()` – Fetches and caches course data
- `filterCourses()` – Applies search and filter logic
- `renderCourses()` – Dynamically generates card DOM
- `attachCardInteractions()` – Wires click, close, and enroll handlers to rendered cards

### Shopping Cart (`Js/cart.js`)
- Stores cart items in **localStorage** as JSON
- **Persists across page reloads**
- Methods:
  - `addToCart(courseId)` – Adds a course; prevents duplicates
  - `removeFromCart(courseId)` – Removes a course
  - `updateCartUI()` – Refreshes cart display and summary
  - `getSubtotal()`, `getDiscount()`, `getTotal()` – Calculate totals

### Responsive Grid System
- **Flexbox** for course cards (wraps in a row)
- **Media queries** at 768px (tablet) and 480px (mobile) breakpoints
- **Flexible course card width** with max-width constraint for desktop consistency

### Animations & Visual Effects
- **Typing animation** (`typing` keyframe) on page headings
- **Rainbow gradient** (`rainbow` keyframe) text animation
- **Rotating border** on course cards (pseudo-element `:before` with `rotate` keyframe)
- **Smooth transitions** on hover, click, and focus states

---

## 🚧 Challenges & Solutions

### Challenge 1: Dynamic Card Interactions with Rendered Elements
**Problem**: Course cards are generated at runtime (not in HTML), so initial event listeners attached to static DOM don't work for new cards.

**Solution**: Implement `attachCardInteractions()` method that:
- Queries all newly rendered cards after `renderCourses()`
- Attaches individual click, close, and enroll listeners to each card
- Uses `dataset.listenersAttached` flag to prevent duplicate handlers
- Registers global handlers (backdrop click, ESC key, resize) once per instance

### Challenge 2: Search & Filter State Consistency
**Problem**: Mixing search input (real-time) with filter dropdown (manual apply) could cause confusion or missed updates.

**Solution**:
- Both search and filters call the same `filterCourses()` method
- Track both `currentSearch` and `currentFilters` state
- Apply filters immediately on input/submit and on filter button click
- Clear button only clears search; reset button clears everything

### Challenge 3: Responsive Layout for Course Cards
**Problem**: Initially used CSS Grid with auto-fill, but user requested row-based layout; transitioning between desktop and mobile required careful handling.

**Solution**:
- Switch from `grid` to `flexbox` with `flex-wrap`
- Set `.course-card` to `width: 100%` with `max-width: 350px`
- At ≤768px, stack vertically using media query overrides
- Ensure images fit inside using `object-fit: contain`

### Challenge 4: localStorage Persistence & Cart Sync
**Problem**: Cart items in localStorage persist, but enroll button state wasn't updated if user refreshed the page.

**Solution**: `updateEnrollButton()` method that:
- Checks cart on page load via `loadCourses()` and `updateCartUI()`
- Disables enroll button if course already in cart
- Updates button text to "Added to Cart" with checkmark icon

### Challenge 5: Filter Dropdown Not Showing
**Problem**: Inline `style="display: none;"` on `.filter-menu` blocked JS toggle.

**Solution**: Remove inline style and let CSS define default hidden state; JS toggle checks for both `'none'` and `''` (empty string).

---

## 💡 Lessons Learned

### 1. **Separating Concerns**
- Static card interactions (original event listeners) vs. dynamic card interactions (re-attach per render)
- Search/filter logic in a reusable class (`CourseSearchFilter`)
- Cart logic in a separate module (`ShoppingCart` in `cart.js`)

### 2. **Responsive Design Requires Planning**
- Layout must adapt to multiple breakpoints, not just one or two
- Flexbox and Grid have different responsive behaviors
- Testing on actual devices or simulators is crucial

### 3. **State Management in Vanilla JS**
- Centralize state (current search, current filters, cart items)
- Avoid storing state in DOM; use data structures and sync DOM when needed
- Use localStorage for persistence, but always validate data on load

### 4. **DOM Performance**
- Clearing and re-rendering all cards on every keystroke is acceptable for small datasets but could be optimized with debouncing for larger catalogs
- Attaching listeners to each card is fine for <100 items; consider event delegation for 1000+ items

### 5. **CSS Animation Complexity**
- Multiple keyframes on one element (typing + blink + rainbow) can conflict; test in browser DevTools
- `object-fit` and flex centering interact in subtle ways; always test with real images

### 6. **Cross-Page Consistency**
- Header markup varies slightly across pages (search bar, filter buttons), making centralized JS tricky
- Considered standardizing, but worked around it with flexible selectors

---

## 🚀 Future Enhancements

### Short-term (Quick Wins)
1. **Email verification** on contact form – Validate email format before submit
2. **Toast notifications** – Replace alert() with styled in-page toast messages
3. **Debounce search input** – Reduce filter calls while typing for better performance
4. **Keyboard navigation** – Add arrow keys to navigate course cards and modals
5. **Dark/Light theme toggle** – Add user preference (store in localStorage)

### Medium-term (Feature Expansion)
1. **User authentication** – Login/signup, personal dashboard, order history
2. **Backend integration** – Replace localStorage with a real database (Node + Express, Django, etc.)
3. **Course reviews & ratings** – Allow users to leave feedback on courses they've taken
4. **Wishlist feature** – Save favorite courses for later
5. **Coupon codes** – Apply discount codes during checkout
6. **Payment integration** – Connect to Stripe/PayPal for real payments

### Long-term (Platform Growth)
1. **Course instructor dashboard** – Admins can add/edit/delete courses
2. **Video playback** – Embed course videos or link to external platform
3. **Progress tracking** – Track course completion per user
4. **Certificates** – Generate downloadable completion certificates
5. **Community forum** – Enable peer-to-peer discussions and support
6. **Mobile app** – React Native or Flutter for iOS/Android
7. **Advanced analytics** – Dashboard showing sales, user engagement, course popularity

### Performance Optimizations
1. **Lazy loading images** – Use `loading="lazy"` attribute or Intersection Observer
2. **Code splitting** – Separate JS modules per page (e.g., `course.js`, `cart.js`)
3. **Minification & bundling** – Use Webpack or Vite to reduce file sizes
4. **Service Workers** – Offline support and caching strategies
5. **CDN for static assets** – Speed up image delivery globally

---

## 📄 File Descriptions

### HTML Files
- **index.html** – Home page with hero section and featured courses
- **course.html** – Main course catalog with search, filter, and dynamic card rendering
- **cart.html** – Shopping cart page showing added courses and checkout summary
- **contact.html** – Contact form page with email and message fields
- **about.html** – About the platform and team information

### CSS Files
- **main.css** – Global styles, typography, base components (intro, contact, footer)
- **responsive.css** – Media queries for tablet (768px) and mobile (480px) layouts
- **animation.css** – Keyframe animations (typing, blink, rainbow, rotate, expandCard)
- **course.css** – Styles for course cards, grid layout, and course detail expansion
- **cart.css** – Cart item styling, summary section, responsive stacking
- **public/header.css** – Header navigation, search bar, filter dropdown, buttons
- **public/footer.css** – Footer layout and styling

### JavaScript Files
- **script.js** – `CourseSearchFilter` class with search, filter, dynamic rendering, and card interactions
- **cart.js** – `ShoppingCart` class with add/remove, localStorage persistence, and cart UI updates

### Data Files
- **courses.json** – Array of course objects (id, title, instructor, price, originalPrice, category, duration, rating, image, description)

### Other
- **images/** – Course images and project assets
- **README.md** – Project documentation (this file)

---

## 📞 Support & Questions

For issues, suggestions, or contributions:
1. Check the **Contact** page and reach out directly
2. Review the code comments in `Js/script.js` and `Js/cart.js` for implementation details
3. Inspect browser DevTools Console for error messages
4. Test on different devices and screen sizes to identify responsive issues

---

## 📜 License

This project is an educational assignment for [FHSU Front End Web Development 1 Course]. Feel free to use and modify for learning purposes.

---

**Last Updated**: December 2025  
**Version**: 1.0  
**Status**: Complete & Functional

