// Menu data
const menuData = {
    pastelaria: {
        title: 'Pastelaria',
        items: [
            { name: 'Bola', price: 40 },
            { name: 'Bolo', price: 140 },
            { name: 'Coxinha', price: 60 },
            { name: 'Croissant de queijo', price: 80 },
            { name: 'Dafu', price: 30 },
            { name: 'Donete', price: 40 },
            { name: 'Fataia', price: 70 },
            { name: 'Pastel de queijo', price: 100 },
            { name: 'Pão de atum', price: 150 },
            { name: 'Pão mista', price: 150 },
            { name: 'Pãozinha de linguiça', price: 100 },
            { name: 'Queijo terra', price: 150 },
            { name: 'Pizza', price: 120 },
            { name: 'Quiche', price: 130 },
            { name: 'Rissóis', price: 50 }
        ]
    },
    'pequeno-almoco': {
        title: 'Pequeno-Almoço',
        items: []
    },
    ovos: {
        title: 'Ovos',
        items: [
            { 
                name: 'Omelete linguiça', 
                price: 270, 
                note: 'acompanhado de pão (carcaça, integral, linguiça, rústica, forma)' 
            },
            { 
                name: 'Omelete mista', 
                price: 260, 
                note: 'acompanhado de pão (carcaça, integral, linguiça, rústica, forma)' 
            },
            { 
                name: 'Omelete queijo terra', 
                price: 270, 
                note: 'acompanhado de pão (carcaça, integral, linguiça, rústica, forma)' 
            },
            { 
                name: 'Omelete queijo terra e linguiça', 
                price: 300, 
                note: 'acompanhado de pão (carcaça, integral, linguiça, rústica, forma)' 
            },
            { 
                name: 'Omelete queijo/fiambre', 
                price: 260, 
                note: 'extra (banana, ovo, linguiça)' 
            },
            { 
                name: 'Omelete Simples', 
                price: 220, 
                note: 'extra (banana, ovo, linguiça)' 
            },
            { name: 'Ovo cozido', price: 60 },
            { name: 'Ovo estrelado', price: 70 },
            { name: 'Ovo mexido', price: 150 }
        ]
    },
    sandes: {
        title: 'Sandes',
        items: [
            { name: 'Atum', price: 250, note: 'inclui ovo' },
            { name: 'Linguiça', price: 230, note: 'inclui ovo' },
            { name: 'Mista', price: 190, note: 'inclui ovo' },
            { name: 'Queijo terra', price: 200, note: 'inclui ovo' },
            { name: 'Queijo terra e tomate', price: 230, note: 'inclui ovo' },
            { name: 'Linguiça', price: 230 },
            { name: 'Mista', price: 200 },
            { name: 'Queijo terra', price: 230 },
            { name: 'Queijo terra e linguiça', price: 260 }
        ]
    }
};

// Global variables
let currentCategory = 'pastelaria';
let isMenuOpen = false;

// DOM elements
const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');
const categoryTitle = document.getElementById('categoryTitle');
const menuItems = document.getElementById('menuItems');
const navItems = document.querySelectorAll('.nav-item');
const tabs = document.querySelectorAll('.tab');

// Utility functions
function formatPrice(price) {
    return `${price} CVE`;
}

function renderMenuItems(category) {
    const data = menuData[category];
    categoryTitle.textContent = data.title;
    
    if (data.items.length === 0) {
        menuItems.innerHTML = '<div class="empty-menu"><p>Menu em breve...</p></div>';
        return;
    }
    
    const itemsHTML = data.items.map(item => `
        <div class="menu-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                ${item.note ? `<div class="item-note">${item.note}</div>` : ''}
            </div>
            <div class="item-price">${formatPrice(item.price)}</div>
        </div>
    `).join('');
    
    menuItems.innerHTML = itemsHTML;
}

function updateActiveCategory(category) {
    currentCategory = category;
    
    // Update navigation items
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
    });
    
    // Update tabs
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    // Render menu items
    renderMenuItems(category);
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active', isMenuOpen);
    navigation.classList.toggle('show', isMenuOpen);
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);

// Navigation items event listeners
navItems.forEach(item => {
    item.addEventListener('click', () => {
        updateActiveCategory(item.dataset.category);
        toggleMenu(); // Close menu after selection
    });
});

// Tabs event listeners
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        updateActiveCategory(tab.dataset.category);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navigation.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems(currentCategory);
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        const categories = ['pastelaria', 'pequeno-almoco', 'ovos', 'sandes'];
        const currentIndex = categories.indexOf(currentCategory);
        
        if (swipeDistance > 0 && currentIndex > 0) {
            // Swipe right - previous category
            updateActiveCategory(categories[currentIndex - 1]);
        } else if (swipeDistance < 0 && currentIndex < categories.length - 1) {
            // Swipe left - next category
            updateActiveCategory(categories[currentIndex + 1]);
        }
    }
}

// Smooth scrolling for tabs
function scrollTabIntoView(activeTab) {
    const container = activeTab.parentElement;
    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    
    const scrollLeft = container.scrollLeft;
    const targetScroll = scrollLeft + tabRect.left - containerRect.left - (containerRect.width - tabRect.width) / 2;
    
    container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    });
}

// Update scroll position when category changes
const originalUpdateActiveCategory = updateActiveCategory;
updateActiveCategory = function(category) {
    originalUpdateActiveCategory(category);
    
    // Scroll active tab into view
    const activeTab = document.querySelector(`.tab[data-category="${category}"]`);
    if (activeTab) {
        setTimeout(() => scrollTabIntoView(activeTab), 100);
    }
};