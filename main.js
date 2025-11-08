// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Tabs Functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Handle Reservation Form Submission
function handleReservation(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push({
        type: 'table',
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Display success message
    alert(`تم استلام طلب الحجز!\n\nالاسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\nالتاريخ: ${date}\nالوقت: ${time}\nعدد الأشخاص: ${guests}\n\nسنتواصل معك قريباً للتأكيد.`);

    // Reset form
    document.getElementById('reservationForm').reset();
}

// Handle Delivery Order Form Submission
function handleDelivery(event) {
    event.preventDefault();

    const name = document.getElementById('name').value; // Assuming same form, but need to adjust IDs if different
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('name2').value; // Address field

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        type: 'delivery',
        name: name,
        email: email,
        phone: phone,
        address: address,
        items: [], // For now, empty; can be expanded
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('تم استلام طلب الدليفري!');

    // Reset form
    document.getElementById('reservationForm1').reset();
}

// Handle Menu Order
function handleOrder(itemName, price) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        type: 'menu',
        item: itemName,
        price: price,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    alert(`تم طلب ${itemName}!`);
}


// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Set minimum date for reservation to today
window.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Add header shadow on scroll
    handleHeaderScroll();
});

// Animate elements when they come into view
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe feature boxes
    document.querySelectorAll('.feature-box').forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(box);
    });
}

// Add shadow to header on scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
}
