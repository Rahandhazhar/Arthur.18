// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.cursor-trail');
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
});

// Discord Avatar Loader
function loadDiscordAvatar() {
    const userId = '963802319877730344';
    const avatarImg = document.getElementById('discord-avatar');
    
    // Try to load the actual Discord avatar
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/`;
    
    // Fallback to default Discord avatar if user avatar doesn't exist
    avatarImg.onerror = function() {
        this.src = `https://cdn.discordapp.com/embed/avatars/${userId.slice(-1)}.png`;
    };
    
    // Set initial source
    avatarImg.src = `https://cdn.discordapp.com/embed/avatars/${userId.slice(-1)}.png`;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.aesthetic-card, .music-container, .quote-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Floating shapes animation enhancement
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// Aesthetic cards interactive effects
document.querySelectorAll('.aesthetic-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click ripple effect
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = 60;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Smooth scroll for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dynamic background color change based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = 240 + (scrollPercent * 60); // Changes from blue to purple
    
    document.body.style.background = `linear-gradient(135deg, 
        hsl(${hue}, 70%, 65%) 0%, 
        hsl(${hue + 20}, 60%, 60%) 50%, 
        hsl(${hue + 40}, 80%, 70%) 100%)`;
});

// Add sparkle effect on profile image hover
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        createSparkles(profileImage);
    });
}

function createSparkles(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const rect = element.getBoundingClientRect();
            
            sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkle 1s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
}

// Add sparkle animation CSS
const sparkleStyles = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

const sparkleStyleSheet = document.createElement('style');
sparkleStyleSheet.textContent = sparkleStyles;
document.head.appendChild(sparkleStyleSheet);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    loadDiscordAvatar();
    enhanceFloatingShapes();
});

// Add loading screen styles
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '✨';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 10001;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .loaded::before,
    .loaded::after {
        display: none !important;
    }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

// Easter egg: Click profile image 5 times for surprise
let clickCount = 0;
if (profileImage) {
    profileImage.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            document.body.style.animation = 'rainbow 3s ease-in-out';
            createConfetti();
            clickCount = 0;
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
        }
    });
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 1000;
                pointer-events: none;
                animation: confetti 3s ease-out forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add confetti and rainbow animations
const confettiStyles = `
    @keyframes confetti {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
    }
`;

const confettiStyleSheet = document.createElement('style');
confettiStyleSheet.textContent = confettiStyles;
document.head.appendChild(confettiStyleSheet);

console.log('✨ Welcome to Arthur\'s space! ✨');
console.log('🎵 Enjoy the vibes and good music! 🎵');