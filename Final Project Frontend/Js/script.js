/* Course interactions handled by CourseSearchFilter (dynamic rendering) */

/* Course Search and Filter */
class CourseSearchFilter {
    constructor() {
        this.courses = [];
        this.filteredCourses = [];
        this.currentSearch = '';
        this.currentFilters = { category: '', price: '', rating: '' };

        this.activeCard = null;
        this._interactionsInitialized = false;

        this.init();
    }

    async init() {
        await this.loadCourses();
        this.setUpEventListeners();
        this.renderCourses();
    }

    async loadCourses() {
        try {
            const response = await fetch('./data/courses.json');
            const data = await response.json();
            this.courses = Array.isArray(data.courses) ? data.courses : [];
            this.filteredCourses = [...this.courses];
        } catch (err) {
            console.error('Error loading courses:', err);
            this.courses = [];
            this.filteredCourses = [];
        }
    }

    setUpEventListeners() {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('course-search');
                if (input) {
                    this.currentSearch = input.value.trim().toLowerCase();
                    this.filterCourses();
                    this.renderCourses();
                }
            });
        }

        const searchInput = document.getElementById('course-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value.trim().toLowerCase();
                this.filterCourses();
                this.renderCourses();

                const clearBtn = document.getElementById('clear-search');
                if (clearBtn) clearBtn.style.display = e.target.value ? 'block' : 'none';
            });
        }

        const clearBtn = document.getElementById('clear-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const input = document.getElementById('course-search');
                if (input) input.value = '';
                this.currentSearch = '';
                this.filterCourses();
                this.renderCourses();
                clearBtn.style.display = 'none';
            });
        }

        const filterToggle = document.querySelector('.filter-toggle');
        const filterMenu = document.querySelector('.filter-menu');
        if (filterToggle && filterMenu) {
            filterToggle.addEventListener('click', () => {
                filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', (e) => {
                if (!filterToggle.contains(e.target) && !filterMenu.contains(e.target)) {
                    filterMenu.style.display = 'none';
                }
            });

            const applyBtn = document.getElementById('apply-filter') || document.querySelector('.apply-filter');
            if (applyBtn) {
                applyBtn.addEventListener('click', () => {
                    const categoryFilter = document.getElementById('category-filter');
                    const priceFilter = document.getElementById('price-filter');
                    const ratingFilter = document.getElementById('rating-filter');

                    if (categoryFilter) this.currentFilters.category = categoryFilter.value;
                    if (priceFilter) this.currentFilters.price = priceFilter.value;
                    if (ratingFilter) this.currentFilters.rating = ratingFilter.value;

                    this.filterCourses();
                    this.renderCourses();

                    filterMenu.style.display = 'none';
                });
            }

            const resetBtn = document.getElementById('reset-filter');
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetFilters());
        }
    }

    filterCourses() {
        const search = this.currentSearch || '';
        this.filteredCourses = this.courses.filter(course => {
            const matchesSearch = !search || [course.title, course.category, course.instructor]
                .filter(Boolean)
                .some(field => field.toLowerCase().includes(search));

            const matchesCategory = !this.currentFilters.category || course.category.toLowerCase().includes(this.currentFilters.category.toLowerCase());

            let matchesPrice = true;
            if (this.currentFilters.price === 'free') matchesPrice = course.price === 0;
            else if (this.currentFilters.price === 'under-10') matchesPrice = course.price < 10;
            else if (this.currentFilters.price === '10-20') matchesPrice = course.price >= 10 && course.price <= 20;
            else if (this.currentFilters.price === 'over-20') matchesPrice = course.price > 20;

            let matchesRating = true;
            if (this.currentFilters.rating) matchesRating = course.rating >= parseFloat(this.currentFilters.rating);

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });
    }

    renderCourses() {
        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = '';

        if (!this.filteredCourses.length) {
            coursesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No courses found</h3>
                    <p>Try adjusting your search or filters</p>
                    <button id="show-all-courses" class="btn btn-primary" style="margin-top: 1rem;">
                        <i class="fas fa-redo"></i> Show All Courses
                    </button>
                </div>
            `;

            const showAllbtn = document.getElementById('show-all-courses');
            if (showAllbtn) showAllbtn.addEventListener('click', () => this.resetFilters());
            return;
        }

        this.filteredCourses.forEach(course => {
            const card = this.createCourseCard(course);
            coursesGrid.appendChild(card);
        });

        this.attachCardInteractions();
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.setAttribute('data-course-id', course.id);

        const hasDiscount = course.originalPrice && course.price < course.originalPrice;
        const discountPercent = hasDiscount ? Math.round((1 - course.price / course.originalPrice) * 100) : 0;

        card.innerHTML = `
            <div class="course-info" data-id="${course.id}">
                <div class="course-img">
                    <img src="${course.image || ''}" alt="${course.title}">
                    ${hasDiscount ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
                </div>
                <span class="course-category">${course.category || ''}</span>
                <h2 class="course-title">${course.title || ''}</h2>
                <div class="course-meta">
                    <div class="meta-item"><i class="fas fa-user"></i><span>${course.instructor || ''}</span></div>
                    <div class="meta-item"><i class="fas fa-clock"></i><span>${course.duration || ''}</span></div>
                    <div class="meta-item"><i class="fas fa-star"></i><span>${course.rating || ''}</span></div>
                    <div class="price"><h3 class="discount">$${(course.price || 0).toFixed(2)}</h3>${hasDiscount ? `<h3 class="original">$${course.originalPrice.toFixed(2)}</h3>` : ''}</div>
                </div>
                <p>${(course.description || '').substring(0, 100)}...</p>
                <button class="enroll-btn" data-course-id="${course.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                <button class="close-btn"><i class="fas fa-times"></i></button>
            </div>
        `;

        return card;
    }

    attachCardInteractions() {
        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;

        const backdrop = document.getElementById('backdrop');
        const cards = coursesGrid.querySelectorAll('.course-card');

        cards.forEach(card => {
            if (card.dataset.listenersAttached === 'true') return;

            card.addEventListener('click', (e) => {
                if (e.target.closest('.close-btn') || e.target.closest('.enroll-btn')) return;
                if (card.classList.contains('active')) return;

                if (this.activeCard) {
                    this.activeCard.classList.remove('active');
                    if (backdrop) backdrop.classList.remove('active');
                }

                card.classList.add('active');
                this.activeCard = card;

                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                if (window.innerWidth <= 768 && backdrop) backdrop.classList.add('active');
            });

            const closeBtn = card.querySelector('.close-btn');
            if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); card.classList.remove('active'); if (backdrop) backdrop.classList.remove('active'); this.activeCard = null; });

            const enrollBtn = card.querySelector('.enroll-btn');
            if (enrollBtn) enrollBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = parseInt(enrollBtn.dataset.courseId);
                if (window.shoppingCart) window.shoppingCart.addToCart(courseId);
                else {
                    const title = card.querySelector('.course-title')?.textContent || 'Course';
                    const price = card.querySelector('.discount')?.textContent || 'Price not available';
                    alert(`Enrolling in: ${title}\nPrice: ${price}`);
                }
            });

            card.dataset.listenersAttached = 'true';
        });

        if (!this._interactionsInitialized) {
            if (backdrop) backdrop.addEventListener('click', () => { if (this.activeCard) { this.activeCard.classList.remove('active'); backdrop.classList.remove('active'); this.activeCard = null; } });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.activeCard) { this.activeCard.classList.remove('active'); if (backdrop) backdrop.classList.remove('active'); this.activeCard = null; } });
            window.addEventListener('resize', () => { if (window.innerWidth > 768 && backdrop) backdrop.classList.remove('active'); else if (this.activeCard && window.innerWidth <= 768 && backdrop) backdrop.classList.add('active'); });
            this._interactionsInitialized = true;
        }
    }

    resetFilters() {
        const input = document.getElementById('course-search'); if (input) input.value = '';
        this.currentSearch = '';

        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const ratingFilter = document.getElementById('rating-filter');
        if (categoryFilter) categoryFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (ratingFilter) ratingFilter.value = '';

        const clearBtn = document.getElementById('clear-search'); if (clearBtn) clearBtn.style.display = 'none';
        const filterMenu = document.querySelector('.filter-menu'); if (filterMenu) filterMenu.style.display = 'none';

        this.currentFilters = { category: '', price: '', rating: '' };
        this.filteredCourses = [...this.courses];
        this.renderCourses();
    }
}

 // Initialize search and filter
let courseSearchFilter = null;
document.addEventListener('DOMContentLoaded', () => {
    courseSearchFilter = new CourseSearchFilter();
    window.courseSearchFilter = courseSearchFilter;
});

