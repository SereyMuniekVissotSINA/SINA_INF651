/* Cart Js */
class ShoppingCart{
    constructor(){
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.courses = {};
        this.init();
    }

    async init(){
        await this.loadCourses();
        this.updateCartUI();
        this.setupEventListeners();
    }

    async loadCourses(){
        try{
            console.log('Loading courses from ./data/courses.json')
            const response = await fetch('./data/courses.json');
            const data = await response.json();
            this.courses = data.courses.reduce((acc, course) => {
                acc[course.id] = course;
                return acc;
            }, {});
        } catch (error){
            console.error('Error loading courses:', error);
            this.courses = {};
        }
    }

    addToCart(courseId){
        const course = this.courses[courseId];
        if (!course){
            console.error('Course not found:', courseId);
            return;
        }

        if (!this.cart.find(item => item.id === courseId)){
            this.cart.push(course);
            this.saveCart();
            this.updateCartUI();
            this.showNotification(`${course.title} added to cart.`);

            this.updateEnrollButton(courseId, true);
        }
    }

    removeFromCart(courseId){
        this.cart = this.cart.filter(item => item.id !== courseId);
        this.saveCart();
        this.updateCartUI();
        this.updateEnrollButton(courseId, false)
        this.showNotification(`Course removed from cart.`);

        if (this.cart.length == 0){
            setTimeout(() => {
                this.updateCartUI();
            }, 100);
        }
    }

    saveCart(){
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateEnrollButton(courseId, isAdded){
        const enrollBtn = document.querySelector(`.enroll-btn[data-course-id="${courseId}"]`);
        if (enrollBtn){
            if (isAdded){
                enrollBtn.innerHTML = '<i class="fa fa-check"></i> Added to Cart';
                enrollBtn.classList.add('added');
                enrollBtn.disabled = true;
            }
             else{
                enrollBtn.innerHTML = '<i class="fa fa-shopping-cart"></i> Add to Cart';
                enrollBtn.classList.remove('added');
                enrollBtn.disabled = false;
            }
        }  
    }

    getCartCount(){
        return this.cart.length;
    }

    getSubtotal(){
        return this.cart.reduce((sum, item) => sum + item.price, 0);
    }

    getDisacount(){
        return this.cart.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
    }

    getTotal(){
        return this.getSubtotal();
    }

    updateCartUI(){
        const cartCount = document.querySelector('.cart-count');
        if (cartCount){
            cartCount.textContent = this.getCartCount();
        }

        this.renderCartItems();
        this.updateCartSummary();
    }

    renderCartItems(){
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const emptyCart = document.getElementById('empty-cart');

        if (!cartItemsContainer) return;

        if (this.cart.length === 0){
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            cartItemsContainer.innerHTML = '';
            if (emptyCart && !emptyCart.parentNode) 
                cartItemsContainer.appendChild(emptyCart);
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';

        cartItemsContainer.innerHTML = '';
        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-instructor">${item.instructor}</p>
                    <div class="course-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${item.duration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-star"></i>
                            <span>${item.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <button class="remove-btn" data-course-id="${item.id}">
                    <i class="fas fa-trash"></i>
                    Remove
                </button>
                `;
            cartItemsContainer.appendChild(cartItem);         
        })
    }

    updateCartSummary(){
        const subtotalEl = document.getElementById('subtotal');
        const discountEl = document.getElementById('discount');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = `$${this.getSubtotal().toFixed(2)}`;
        if (discountEl) discountEl.textContent = `-$${this.getDisacount().toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    showNotification(message){
        const notification = document.createElement('div');
        notification.id = 'temp-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        if (!document.querySelector('#notification-animations')){
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    } 
                    to {
                        transform: translateX(0); 
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                    to { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                }`;
                document.head.appendChild(style);
        }
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode){
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupEventListeners(){
        document.querySelectorAll('.enroll-btn').forEach(btn => {
            const courseId = parseInt(btn.dataset.courseId);
            if (this.cart.find(item => item.id === courseId)){
                this.updateEnrollButton(courseId, true);
            }

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(courseId);
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')){
                const courseId = parseInt(e.target.closest('.remove-btn').dataset.courseId);
                this.removeFromCart(courseId);
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page){
                    this.showPage(page);
                }
            });
        });

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn){
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length > 0){
                    alert(`Checkout successful\nTotal: $${this.getTotal().toFixed(2)}\nThank you for your purchase!`);
                    this.cart = [];
                    this.saveCart();
                    this.updateCartUI();
                    this.showPage('courses');
                }
            });
        }
    }

    showPage(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName){
                link.classList.add('active');
            }
        });

        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const pageElement = document.getElementById(`${pageName}-page`);
        if (pageElement){
            pageElement.classList.add('active');
        }
    }
}

let shoppingCart = null;

document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = new ShoppingCart();
    window.shoppingCart = shoppingCart;
});