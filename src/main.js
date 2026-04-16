import './scss/main.scss';

// Add subtle animations or interactivity if needed
document.addEventListener('DOMContentLoaded', () => {
    console.log('WeChina Landing Page Initialized');
    
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle logic could be added here
});
