// Language data
const translations = {
    ar: {
        pageTitle: "شاشة الطباخ",
        pageDesc: "إدارة الطلبات والحجوزات.",
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
        thStatus: "الحالة",
        thTimestamp: "الوقت المسجل",
        thActions: "الإجراءات",
        markCompleted: "تم الإنجاز",
        delete: "حذف",
        pending: "معلق",
        completed: "مكتمل"
    },
    en: {
        pageTitle: "Manager Screen",
        pageDesc: "Manage orders and reservations.",
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
        thStatus: "Status",
        thTimestamp: "Timestamp",
        thActions: "Actions",
        markCompleted: "Mark Completed",
        delete: "Delete",
        pending: "Pending",
        completed: "Completed"
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
    document.getElementById('thStatus').textContent = t.thStatus;
    document.getElementById('thTimestamp').textContent = t.thTimestamp;
    document.getElementById('thActions').textContent = t.thActions;
}

// Load data from localStorage
function loadData() {
    const t = translations[currentLang];

    // Load reservations
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsBody = document.getElementById('reservationsBody');
    reservationsBody.innerHTML = '';

    reservations.forEach((reservation, index) => {
        const status = reservation.status || 'pending';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td>${status === 'completed' ? t.completed : t.pending}</td>
            <td>${new Date(reservation.timestamp).toLocaleString(currentLang)}</td>
            <td>
                <button class="btn-primary" onclick="markCompleted('reservations', ${index})">${t.markCompleted}</button>
                <button class="btn-secondary" onclick="deleteItem('reservations', ${index})">${t.delete}</button>
            </td>
        `;
        reservationsBody.appendChild(row);
    });

    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersBody = document.getElementById('ordersBody');
    ordersBody.innerHTML = '';

    orders.forEach((order, index) => {
        const status = order.status || 'pending';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.item || order.name || 'N/A'}</td>
            <td>${order.price || 'N/A'}</td>
            <td>${order.type}</td>
            <td>${status === 'completed' ? t.completed : t.pending}</td>
            <td>${new Date(order.timestamp).toLocaleString(currentLang)}</td>
            <td>
                <button class="btn-primary" onclick="markCompleted('orders', ${index})">${t.markCompleted}</button>
                <button class="btn-secondary" onclick="deleteItem('orders', ${index})">${t.delete}</button>
            </td>
        `;
        ordersBody.appendChild(row);
    });
}

// Mark item as completed
function markCompleted(type, index) {
    const data = JSON.parse(localStorage.getItem(type)) || [];
    if (data[index]) {
        data[index].status = 'completed';
        localStorage.setItem(type, JSON.stringify(data));
        loadData();
    }
}

// Delete item
function deleteItem(type, index) {
    const data = JSON.parse(localStorage.getItem(type)) || [];
    data.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(data));
    loadData();
}

// Event listeners
document.getElementById('langToggle').addEventListener('click', switchLanguage);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    loadData();
});
