/**
 * My Samsung Nightmare V2 - Dynamic Dark Theme
 * Advanced JavaScript for modern interactions
 */

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeTimeline();
    initializeAnimations();
    initializeBackToTop();
    logConsoleMessage();
});

// ===================================
// Mobile Navigation
// ===================================

function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => span.style.transform = 'none');
                spans[1].style.opacity = '1';
            });
        });
    }
}

// ===================================
// Smooth Scroll & Active Navigation
// ===================================

function initializeScrollEffects() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('.section[id]');
    const navHeight = document.getElementById('mainNav')?.offsetHeight || 60;
    
    // Smooth scroll with offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Scroll progress bar
    createScrollProgress();
}

// ===================================
// Scroll Progress Bar
// ===================================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ff4757, #a55eea, #45aaf2);
        z-index: 10000;
        transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 20px rgba(255, 71, 87, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// ===================================
// Timeline Features
// ===================================

function initializeTimeline() {
    const downloadButton = document.getElementById('downloadTimeline');
    
    if (downloadButton) {
        // Download timeline
        downloadButton.addEventListener('click', downloadTimelineText);
        
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-outline';
        copyButton.innerHTML = '<span>📋</span> Copy';
        copyButton.addEventListener('click', copyTimelineToClipboard);
        downloadButton.parentNode.insertBefore(copyButton, downloadButton.nextSibling);
    }
    
    // Timeline item hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function downloadTimelineText() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let text = '═══════════════════════════════════════════\n';
    text += 'MY SAMSUNG NIGHTMARE - COMPLETE TIMELINE\n';
    text += '═══════════════════════════════════════════\n\n';
    text += 'DISCLAIMER: This timeline documents my personal experience\n';
    text += 'and is not affiliated with or endorsed by Samsung.\n\n';
    text += '═══════════════════════════════════════════\n\n';
    
    timelineItems.forEach((item, index) => {
        const badge = item.querySelector('.timeline-date-badge');
        const month = badge?.querySelector('.month')?.textContent || '';
        const day = badge?.querySelector('.day')?.textContent || '';
        const header = item.querySelector('.timeline-header h3')?.textContent || 'Event';
        const tag = item.querySelector('.timeline-tag')?.textContent || '';
        const content = item.querySelector('.timeline-content');
        
        // Get clean text content
        const contentClone = content.cloneNode(true);
        const elementsToRemove = contentClone.querySelectorAll('.timeline-header, .damage-highlights');
        elementsToRemove.forEach(el => el.remove());
        const textContent = contentClone.textContent.trim().replace(/\s+/g, ' ');
        
        text += `[${index + 1}] ${month} ${day} - ${header}\n`;
        if (tag) text += `    Status: ${tag}\n`;
        text += '─'.repeat(60) + '\n';
        text += wrapText(textContent, 60) + '\n\n';
    });
    
    text += '═══════════════════════════════════════════\n';
    text += 'END OF TIMELINE\n';
    text += '═══════════════════════════════════════════\n\n';
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += 'Source: My Samsung Nightmare Documentation Site\n';
    text += 'Not affiliated with Samsung Electronics\n';
    
    // Download file
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `samsung-nightmare-timeline-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Success feedback
    showButtonFeedback(document.getElementById('downloadTimeline'), '✓ Downloaded!', '#26de81');
}

async function copyTimelineToClipboard() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let text = 'MY SAMSUNG NIGHTMARE - TIMELINE\n\n';
    
    timelineItems.forEach((item, index) => {
        const header = item.querySelector('.timeline-header h3')?.textContent || 'Event';
        const badge = item.querySelector('.timeline-date-badge');
        const month = badge?.querySelector('.month')?.textContent || '';
        const day = badge?.querySelector('.day')?.textContent || '';
        
        text += `${index + 1}. ${month} ${day} - ${header}\n\n`;
    });
    
    try {
        await navigator.clipboard.writeText(text);
        const copyButton = document.querySelector('.btn-outline');
        if (copyButton) {
            showButtonFeedback(copyButton, '✓ Copied!', '#26de81');
        }
    } catch (err) {
        alert('Failed to copy. Please try downloading instead.');
    }
}

function showButtonFeedback(button, text, color) {
    const originalHTML = button.innerHTML;
    const originalBg = button.style.background;
    
    button.innerHTML = text;
    button.style.background = `linear-gradient(135deg, ${color}, ${adjustBrightness(color, -20)})`;
    button.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = originalBg;
        button.style.transform = '';
    }, 2000);
}

function wrapText(text, width) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        if ((currentLine + word).length > width) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });
    
    if (currentLine) lines.push(currentLine.trim());
    return lines.join('\n');
}

function adjustBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// ===================================
// Intersection Observer Animations
// ===================================

function initializeAnimations() {
    // Fade-in animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate cards
    const animatedElements = document.querySelectorAll(`
        .timeline-item,
        .overview-card,
        .damage-card,
        .action-card,
        .resolution-card,
        .evidence-card,
        .faq-card,
        .contact-card
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        fadeInObserver.observe(el);
    });
    
    // Counter animations for stats
    animateCounters();
}

function animateCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateValue(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => counterObserver.observe(stat));
}

function animateValue(element) {
    const text = element.textContent;
    const hasNumber = /\d+/.exec(text);
    
    if (hasNumber) {
        const targetNumber = parseInt(hasNumber[0]);
        const prefix = text.substring(0, hasNumber.index);
        const suffix = text.substring(hasNumber.index + hasNumber[0].length);
        
        let current = 0;
        const increment = targetNumber / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                element.textContent = prefix + targetNumber + suffix;
                clearInterval(timer);
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// ===================================
// Back to Top Button
// ===================================

function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Dynamic Particle Effects
// ===================================

function createFloatingParticles() {
    const container = document.querySelector('.bg-animation');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Call on load if desired
// createFloatingParticles();

// ===================================
// Mouse Trail Effect (Optional)
// ===================================

function createMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Draw trail
        drawTrail(trail);
    });
}

function drawTrail(points) {
    const canvas = document.getElementById('trailCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    points.forEach((point, index) => {
        const alpha = index / points.length;
        const size = 3 * alpha;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 94, 234, ${alpha})`;
        ctx.fill();
    });
}

// Uncomment to enable
// createMouseTrail();

// ===================================
// Easter Egg: Konami Code
// ===================================

(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s ease-in-out';
        console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'font-size: 24px; font-weight: bold; color: #a55eea;');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
})();

// ===================================
// Performance Monitoring
// ===================================

if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.loadTime > 3000) {
                console.warn('Slow resource detected:', entry.name);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['resource', 'navigation'] });
}

// ===================================
// Console Message
// ===================================

function logConsoleMessage() {
    const styles = {
        title: 'font-size: 32px; font-weight: 900; background: linear-gradient(135deg, #ff4757, #a55eea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 20px 0;',
        subtitle: 'font-size: 16px; color: #b8bcc4; font-weight: 600;',
        info: 'font-size: 14px; color: #6c7383;',
        divider: 'color: #333;'
    };
    
    console.log('%c🔴 My Samsung Nightmare V2', styles.title);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.divider);
    console.log('%cDark Theme - Modern & Dynamic', styles.subtitle);
    console.log('%cThis website documents a personal consumer experience.', styles.info);
    console.log('%cNot affiliated with Samsung Electronics.', styles.subtitle);
    console.log('%cLast Updated: January 6, 2026', styles.info);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.divider);
    console.log('%c💡 Tip: Try scrolling to see animations!', 'color: #45aaf2; font-style: italic;');
}

// ===================================
// Service Worker Registration (Optional)
// ===================================

if ('serviceWorker' in navigator && location.protocol === 'https:') {
    // Uncomment to enable offline support
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ===================================
// Export functions for testing
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        downloadTimelineText,
        copyTimelineToClipboard,
        wrapText,
        adjustBrightness
    };
}
