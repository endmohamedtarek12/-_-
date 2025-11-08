// Language data
const translations = {
    ar: {
        pageTitle: "شاشة المدير",
        pageDesc: "عرض الطلبات والحجوزات الحالية.",
        reservationsTitle: "الحجوزات",
        ordersTitle: "الطلبات",
        thName: "الاسم",
        thEmail: "البريد الإلكتروني",
        thPhone: "الهاتف",
        thDate: "التاريخ",
        thTime: "الوقت",
        thGuests: "عدد الأشخاص",
        thItem: "الصنف",
        thPrice: "السعر",
        thType: "النوع",
        thTimestamp: "الوقت المسجل"
    },
    en: {
        pageTitle: "Cook Screen",
        pageDesc: "View current orders and reservations.",
        reservationsTitle: "Reservations",
        ordersTitle: "Orders",
        thName: "Name",
        thEmail: "Email",
        thPhone: "Phone",
        thDate: "Date",
        thTime: "Time",
        thGuests: "Guests",
        thItem: "Item",
        thPrice: "Price",
        thType: "Type",
        thTimestamp: "Timestamp"
    }
};

// Current language
let currentLang = 'ar';

// Function to switch language
function switchLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('langToggle').textContent = currentLang === 'ar' ? 'English' : 'العربية';
    updateTexts();
    loadData();
}

// Update text elements
function updateTexts() {
    const t = translations[currentLang];
    document.getElementById('pageTitle').textContent = t.pageTitle;
    document.getElementById('pageDesc').textContent = t.pageDesc;
    document.getElementById('reservationsTitle').textContent = t.reservationsTitle;
    document.getElementById('ordersTitle').textContent = t.ordersTitle;
    document.getElementById('thName').textContent = t.thName;
    document.getElementById('thEmail').textContent = t.thEmail;
    document.getElementById('thPhone').textContent = t.thPhone;
    document.getElementById('thDate').textContent = t.thDate;
    document.getElementById('thTime').textContent = t.thTime;
    document.getElementById('thGuests').textContent = t.thGuests;
    document.getElementById('thItem').textContent = t.thItem;
    document.getElementById('thPrice').textContent = t.thPrice;
    document.getElementById('thType').textContent = t.thType;
    document.getElementById('thTimestamp').textContent = t.thTimestamp;
}

// Load data from localStorage
function loadData() {
    // Load reservations
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsBody = document.getElementById('reservationsBody');
    reservationsBody.innerHTML = '';

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td>${new Date(reservation.timestamp).toLocaleString(currentLang)}</td>
        `;
        reservationsBody.appendChild(row);
    });

    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersBody = document.getElementById('ordersBody');
    ordersBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.item || order.name || 'N/A'}</td>
            <td>${order.price || 'N/A'}</td>
            <td>${order.type}</td>
            <td>${new Date(order.timestamp).toLocaleString(currentLang)}</td>
        `;
        ordersBody.appendChild(row);
    });
}

// Event listeners
document.getElementById('langToggle').addEventListener('click', switchLanguage);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    loadData();
});
