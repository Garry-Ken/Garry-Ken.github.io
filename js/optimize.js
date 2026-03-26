// performanceOptimization.js

// Function to implement lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.onload = () => {
                    img.removeAttribute('data-src');
                };
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(image => {
        observer.observe(image);
    });
}

// Function to optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        if (image.complete) {
            // Perform optimization on loaded images
            image.src = image.src.replace(/.jpg$/, '_optimized.jpg');
        }
    });
}

// Function to preload critical resources
function preloadResources() {
    const links = ['style.css', 'main.js'];
    links.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.href = link;
        linkElement.as = (link.endsWith('.js') ? 'script' : 'style');
        document.head.appendChild(linkElement);
    });
}

// Function to defer script loading
function deferScripts() {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (!script.hasAttribute('async')) {
            script.setAttribute('defer', 'defer');
        }
    });
}

// Execute performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    optimizeImages();
    preloadResources();
    deferScripts();
});