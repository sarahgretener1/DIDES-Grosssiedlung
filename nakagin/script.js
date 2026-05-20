const carousel = document.getElementById('carouselContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const ORIGINAL_ITEM_COUNT = 4;
let currentIndex = 0;
let isTransitioning = false;

// Toggle dropdown function
function toggleDropdown(contentId, rowId) {
    const content = document.getElementById(contentId);
    const row = document.getElementById(rowId);
    content.classList.toggle('open');
    row.classList.toggle('open');
}

// Initialize carousel with infinite loop
function initCarousel() {
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    
    // Clone items for infinite effect
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.insertBefore(clone, carousel.firstChild);
    });
    
    // Create indicators for original items only
    for (let i = 0; i < ORIGINAL_ITEM_COUNT; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToItem(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    // Start at first real item (after clones)
    currentIndex = ORIGINAL_ITEM_COUNT;
    updateCarouselPosition(false);
}

function updateCarouselPosition(smooth = true) {
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const offset = -currentIndex * itemWidth;
    
    if (smooth) {
        carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    } else {
        carousel.style.transition = 'none';
    }
    
    carousel.style.transform = `translateX(${offset}px)`;
    
    // Update indicators
    const displayIndex = currentIndex % ORIGINAL_ITEM_COUNT;
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === displayIndex);
    });
}

function goToItem(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index + ORIGINAL_ITEM_COUNT;
    updateCarouselPosition(true);
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function nextItem() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarouselPosition(true);
    
    setTimeout(() => {
        if (currentIndex >= ORIGINAL_ITEM_COUNT * 2) {
            currentIndex = ORIGINAL_ITEM_COUNT;
            updateCarouselPosition(false);
        }
        isTransitioning = false;
    }, 500);
}

function prevItem() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarouselPosition(true);
    
    setTimeout(() => {
        if (currentIndex < ORIGINAL_ITEM_COUNT) {
            currentIndex = ORIGINAL_ITEM_COUNT * 2 - 1;
            updateCarouselPosition(false);
        }
        isTransitioning = false;
    }, 500);
}

// Event listeners
prevBtn.addEventListener('click', prevItem);
nextBtn.addEventListener('click', nextItem);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// Initialize on load
window.addEventListener('load', initCarousel);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
