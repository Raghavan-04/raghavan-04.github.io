// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                alert(`Thank you for reaching out, ${name}! I'll get back to you at ${email} soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards and blog cards
    document.querySelectorAll('.project-card, .blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(card);
    });
    
    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Add shadow to nav on scroll
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
    
    // Project card click handler (you can customize this to open modals or navigate)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            console.log('Clicked on project:', projectTitle);
            // You can add modal functionality or navigation here
            // For now, it just logs to console
        });
    });
    
    // Blog card click handler
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the "Read More" link
            if (e.target.classList.contains('read-more')) {
                return;
            }
            
            const blogTitle = this.querySelector('h3').textContent;
            console.log('Clicked on blog:', blogTitle);
            // You can add navigation to full blog post here
        });
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Typing effect for hero title (optional - can be removed if not desired)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.style.opacity = '1'; // Ensure it's visible
        
        // You can uncomment below to add a typing effect
        /*
        heroTitle.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
        */
    }
    
    // Add hover effect sound (optional - requires audio files)
    // Uncomment and add audio files if you want sound effects
    /*
    const hoverSound = new Audio('path/to/hover-sound.mp3');
    document.querySelectorAll('.project-card, .blog-card, .cta-button').forEach(element => {
        element.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log('Audio play failed:', e));
        });
    });
    */
    
    // Cursor trail effect (optional - can be removed if too much)
    /*
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trail');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    */
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll handler
    window.addEventListener('scroll', debounce(function() {
        // Heavy scroll operations here are debounced
    }, 10));
    
    // Log page load time for performance monitoring
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
    
    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
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
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 You found the Easter egg! - Raghavan');
        }, 2000);
    }
    
});

// Add CSS for rainbow animation via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    nav a.active {
        color: var(--accent);
    }
    
    nav a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Prevent right-click on images (optional - for portfolio protection)
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Images are protected');
    });
});
*/
