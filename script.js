// ===========================
// SAMSUNG REPAIR WARNING V3
// Interactive Features
// ===========================

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('✓ Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('✗ Service Worker registration failed:', error);
            });
    });
}

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
    
    // Jump to Latest Timeline Update Button
    const jumpToLatestBtn = document.getElementById('jumpToLatest');
    if (jumpToLatestBtn) {
        jumpToLatestBtn.addEventListener('click', function() {
            // Find all timeline items
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            if (timelineItems.length > 0) {
                // Get the last timeline item (most recent update)
                const lastItem = timelineItems[timelineItems.length - 1];
                
                // Use scrollIntoView for more reliable positioning
                lastItem.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' // Center the item in the viewport
                });
                
                // Add a brief highlight effect to the last item
                setTimeout(() => {
                    lastItem.style.transition = 'all 0.5s ease';
                    lastItem.style.transform = 'scale(1.02)';
                    lastItem.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.3)';
                    
                    // Remove highlight after 2 seconds
                    setTimeout(() => {
                        lastItem.style.transform = '';
                        lastItem.style.boxShadow = '';
                    }, 2000);
                }, 300); // Small delay to let scroll complete
            }
        });
    }
    
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
        
        // Check if this stat should have a dollar sign
        const hasDollarSign = element.textContent.includes('$');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = hasDollarSign ? '$' + target.toLocaleString() : target.toString().includes('+') ? target + '+' : target;
                clearInterval(timer);
            } else {
                const displayValue = Math.floor(current);
                element.textContent = hasDollarSign ? '$' + displayValue.toLocaleString() : displayValue;
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
                    // Only animate if the stat has a valid numeric data-count
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
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
    
    // ========================================
    // NEW FEATURES
    // ========================================
    
    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    if (cookieBanner) {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            // Show banner after 2 seconds
            setTimeout(() => {
                cookieBanner.style.display = 'block';
                cookieBanner.style.opacity = '1';
            }, 2000);
        }
        
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        });
        
        declineCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        });
    }
    
    // Social Share Buttons
    const socialShareButtons = document.querySelectorAll('.share-btn');
    const shareUrl = window.location.href;
    const shareTitle = 'Samsung Mail-In Repair Warning';
    const shareText = 'Important consumer warning about Samsung Mail-In Repair Service. Real documented experiences of service-caused damage and denied claims.';
    
    socialShareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.share;
            let url = '';
            
            switch(platform) {
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'x':
                    url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
                    break;
                case 'linkedin':
                    url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(shareUrl).then(() => {
                        const originalHTML = this.innerHTML;
                        this.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                        }, 2000);
                    });
                    return;
            }
            
            if (url) {
                window.open(url, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Sticky Report Issue Button
    const stickyReportBtn = document.getElementById('stickyReportBtn');
    
    if (stickyReportBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 800) {
                stickyReportBtn.classList.add('visible');
            } else {
                stickyReportBtn.classList.remove('visible');
            }
        });
        
        stickyReportBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Toggle current FAQ
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            } else {
                this.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
                toggle.textContent = '+';
            }
        });
    });
    
    // Touch/Swipe Gestures for Timeline on Mobile
    const timelineContainer = document.querySelector('.timeline');
    
    if (timelineContainer && 'ontouchstart' in window) {
        let touchStartX = 0;
        let touchEndX = 0;
        let currentItemIndex = 0;
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        timelineContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentItemIndex < timelineItems.length - 1) {
                    // Swipe left - next item
                    currentItemIndex++;
                    scrollToTimelineItem(currentItemIndex);
                } else if (diff < 0 && currentItemIndex > 0) {
                    // Swipe right - previous item
                    currentItemIndex--;
                    scrollToTimelineItem(currentItemIndex);
                }
            }
        }
        
        function scrollToTimelineItem(index) {
            timelineItems[index].scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    // Image Zoom/Pinch for Evidence Photos
    const evidenceImages = document.querySelectorAll('.evidence-image img');
    
    evidenceImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            const modal = createImageModal(this.src, this.alt);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });
    
    function createImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-backdrop"></div>
            <div class="image-modal-content">
                <button class="image-modal-close" aria-label="Close">&times;</button>
                <img src="${src}" alt="${alt}" class="image-modal-img">
                <div class="image-modal-controls">
                    <button class="image-zoom-in" aria-label="Zoom in">+</button>
                    <button class="image-zoom-out" aria-label="Zoom out">−</button>
                    <button class="image-zoom-reset" aria-label="Reset zoom">Reset</button>
                </div>
            </div>
        `;
        
        let scale = 1;
        const img = modal.querySelector('.image-modal-img');
        
        modal.querySelector('.image-modal-close').addEventListener('click', () => {
            closeImageModal(modal);
        });
        
        modal.querySelector('.image-modal-backdrop').addEventListener('click', () => {
            closeImageModal(modal);
        });
        
        modal.querySelector('.image-zoom-in').addEventListener('click', () => {
            scale = Math.min(scale + 0.25, 3);
            img.style.transform = `scale(${scale})`;
        });
        
        modal.querySelector('.image-zoom-out').addEventListener('click', () => {
            scale = Math.max(scale - 0.25, 0.5);
            img.style.transform = `scale(${scale})`;
        });
        
        modal.querySelector('.image-zoom-reset').addEventListener('click', () => {
            scale = 1;
            img.style.transform = `scale(${scale})`;
        });
        
        // Pinch zoom for touch devices
        if ('ontouchstart' in window) {
            let initialDistance = 0;
            let currentDistance = 0;
            
            img.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    initialDistance = getDistance(e.touches[0], e.touches[1]);
                }
            }, { passive: true });
            
            img.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    currentDistance = getDistance(e.touches[0], e.touches[1]);
                    const diff = currentDistance - initialDistance;
                    scale = Math.max(0.5, Math.min(3, scale + diff * 0.01));
                    img.style.transform = `scale(${scale})`;
                    initialDistance = currentDistance;
                }
            });
        }
        
        function getDistance(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        return modal;
    }
    
    function closeImageModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    
    // QR Code Generator for Section Sharing
    function generateQRCodeButton() {
        const sections = document.querySelectorAll('.section[id]');
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            if (sectionId && !['hero'].includes(sectionId)) {
                const header = section.querySelector('.section-header');
                if (header) {
                    const qrBtn = document.createElement('button');
                    qrBtn.className = 'qr-code-btn';
                    qrBtn.innerHTML = '📱 QR Code';
                    qrBtn.title = 'Generate QR code for this section';
                    
                    qrBtn.addEventListener('click', () => {
                        const sectionUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;
                        generateQRCode(sectionUrl, section.querySelector('h2').textContent);
                    });
                    
                    header.appendChild(qrBtn);
                }
            }
        });
    }
    
    function generateQRCode(url, title) {
        // Using QR Server API for QR code generation
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
        
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal-backdrop"></div>
            <div class="qr-modal-content">
                <button class="qr-modal-close">&times;</button>
                <h3>QR Code for: ${title}</h3>
                <img src="${qrUrl}" alt="QR Code" class="qr-code-image">
                <p style="margin-top: 15px; font-size: 0.875rem;">Scan to share this section</p>
                <button class="btn btn-primary btn-sm" onclick="window.print()">Print QR Code</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.qr-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.qr-modal-backdrop').addEventListener('click', () => {
            modal.remove();
        });
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    
    // Initialize QR code buttons
    generateQRCodeButton();
    
    // Reading Time Calculator
    function calculateReadingTime() {
        const sections = document.querySelectorAll('.section[data-reading-time]');
        
        sections.forEach(section => {
            const readingTime = section.getAttribute('data-reading-time');
            const badge = section.querySelector('.reading-time-badge');
            
            if (badge && readingTime) {
                badge.style.display = 'flex';
            }
        });
    }
    
    calculateReadingTime();
    
    // Auto-calculate reading time for sections without it
    function autoCalculateReadingTime() {
        const sections = document.querySelectorAll('.section:not([data-reading-time])');
        
        sections.forEach(section => {
            const text = section.innerText;
            const wordCount = text.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
            
            if (readingTime > 1) {
                section.setAttribute('data-reading-time', readingTime);
                
                const header = section.querySelector('.section-header');
                if (header && !header.querySelector('.reading-time-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'reading-time-badge';
                    badge.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                        </svg>
                        <span class="reading-time-text">${readingTime} min read</span>
                    `;
                    header.appendChild(badge);
                }
            }
        });
    }
    
    autoCalculateReadingTime();
    
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

// Dynamic Day Counter
function updateDayCounters() {
    const dayCounters = document.querySelectorAll('.days-counter, .current-day-counter, .days-fighting-counter');
    
    dayCounters.forEach(counter => {
        const startDate = counter.dataset.startDate;
        if (startDate) {
            // Parse start date and set to midnight UTC
            const start = new Date(startDate + 'T00:00:00');
            // Get today at midnight UTC
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Calculate difference in days
            const diffTime = today.getTime() - start.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            // Update the data-count attribute for the counter animation
            if (counter.classList.contains('days-fighting-counter')) {
                counter.dataset.count = diffDays;
            }
            
            counter.textContent = diffDays;
        }
    });
    
    // Update ongoing since date display
    const ongoingSinceLabel = document.getElementById('ongoingSinceLabel');
    if (ongoingSinceLabel) {
        const startDate = ongoingSinceLabel.dataset.startDate;
        if (startDate) {
            const date = new Date(startDate + 'T00:00:00');
            const day = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const year = date.getFullYear();
            
            // Add ordinal suffix
            const ordinal = (day) => {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            };
            
            ongoingSinceLabel.innerHTML = `Ongoing Since:<br>${month} ${day}${ordinal(day)}, ${year}`;
        }
    }
    
    // Update last updated date display
    const lastUpdatedDate = document.getElementById('lastUpdatedDate');
    if (lastUpdatedDate) {
        const updateDate = lastUpdatedDate.dataset.updateDate;
        if (updateDate) {
            const date = new Date(updateDate + 'T00:00:00');
            const day = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const year = date.getFullYear();
            
            // Add ordinal suffix
            const ordinal = (day) => {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            };
            
            lastUpdatedDate.textContent = `${month} ${day}${ordinal(day)}, ${year}`;
        }
    }
}

// Update counters on page load
updateDayCounters();

// Update counters daily (check every hour)
setInterval(updateDayCounters, 1000 * 60 * 60);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        debounce,
        throttle
    };
}
