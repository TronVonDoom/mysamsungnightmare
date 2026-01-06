// ===========================
// SAMSUNG REPAIR WARNING V3
// Interactive Features
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Progress Bar
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
    
    // Navigation
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    
    // Sticky navbar effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('.section, .hero');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // Height of fixed navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Counter Animation for Hero Stats
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toString().includes('$') ? '$' + target.toLocaleString() : target.toString().includes('+') ? target + '+' : target;
                clearInterval(timer);
            } else {
                const displayValue = Math.floor(current);
                element.textContent = element.dataset.count.includes('$') ? '$' + displayValue.toLocaleString() : displayValue;
            }
        }, 16);
    };
    
    // Trigger counter animation when hero section is visible
    const heroStats = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                heroStats.forEach(stat => {
                    const target = parseInt(stat.dataset.count);
                    animateCounter(stat, target);
                });
            }
        });
    }, observerOptions);
    
    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Filter Tabs for Community Reports
    const filterTabs = document.querySelectorAll('.filter-tab');
    const communityCards = document.querySelectorAll('.community-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cards
            const filter = tab.dataset.filter;
            
            communityCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const categories = card.dataset.category.split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.story-card, .community-card, .warning-card, .timeline-item, .resource-card, .comparison-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Submission Handler
    const reportForm = document.getElementById('reportForm');
    
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reportForm);
            
            // Show success message (in a real application, this would send to a server)
            alert('Thank you for submitting your report! Your experience helps warn others and document patterns of issues. We will review your submission and may reach out if we need more information.');
            
            // Reset form
            reportForm.reset();
            
            // Scroll to top of form
            reportForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Dynamic Card Link Handling
    const cardLinks = document.querySelectorAll('.card-link');
    
    cardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // In a real application, this would navigate to the full report
            alert('This would open the full detailed report. In the final version, each report would link to the original source (Reddit post, forum thread, etc.) or a detailed page on this site.');
        });
    });
    
    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', (e) => {
        // Press ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Press "T" to scroll to top
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Image Placeholder Click Handler (for future image uploads)
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.cursor = 'pointer';
        placeholder.addEventListener('click', () => {
            // In a real application, this would open a modal with the full-size image
            console.log('Image placeholder clicked - would show full image in modal');
        });
    });
    
    // Print Functionality
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print Timeline';
    printButton.className = 'btn btn-outline';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '100px';
    printButton.style.right = '30px';
    printButton.style.zIndex = '998';
    printButton.style.display = 'none';
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    // Show print button when on timeline section
    const timelineSection = document.getElementById('timeline');
    
    if (timelineSection) {
        const printObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    printButton.style.display = 'block';
                } else {
                    printButton.style.display = 'none';
                }
            });
        }, {
            threshold: 0.3
        });
        
        printObserver.observe(timelineSection);
    }
    
    // Easter Egg: Konami Code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
        
        if (konamiCode.join(',').includes(konamiSequence.join(','))) {
            activateEasterEgg();
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎮 You found the secret! Thanks for reading through the entire documentation. Keep fighting for consumer rights! 💪');
        }, 2000);
    }
    
    // Lazy Load Images (when actual images are added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Copy Email to Clipboard
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = link.textContent;
                    link.textContent = '✓ Copied!';
                    link.style.color = 'var(--success)';
                    
                    setTimeout(() => {
                        link.textContent = originalText;
                        link.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    window.location.href = link.href;
                });
            } else {
                window.location.href = link.href;
            }
        });
    });
    
    // Analytics (placeholder for when you want to track page views)
    function trackPageView() {
        // In a real application, this would send data to analytics service
        console.log('Page view tracked:', {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer
        });
    }
    
    trackPageView();
    
    // Performance monitoring
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page loaded in:', pageLoadTime, 'ms');
        }
    });
    
    // Accessibility enhancements
    const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const allFocusable = document.querySelectorAll(focusableElements);
    
    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#my-story';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    console.log('🚨 Samsung Repair Warning V3 initialized successfully');
    console.log('📋 Features loaded: Progress bar, Navigation, Counters, Filters, Animations, Forms');
    console.log('♿ Accessibility features enabled');
    console.log('🎯 Ready to warn consumers about repair issues!');
});

// Utility Functions

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        debounce,
        throttle
    };
}
