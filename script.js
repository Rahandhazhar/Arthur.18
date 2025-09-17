// Cursor Effects
const cursorGlow = document.querySelector('.cursor-glow');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    // Main cursor glow
    cursorGlow.style.left = e.clientX - 20 + 'px';
    cursorGlow.style.top = e.clientY - 20 + 'px';
    
    // Trailing cursor
    setTimeout(() => {
        cursorTrail.style.left = e.clientX - 3 + 'px';
        cursorTrail.style.top = e.clientY - 3 + 'px';
    }, 50);
});

// Particle System
function createParticles() {
    const container = document.getElementById('particles-container');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
            }
        }, 8000);
    }, 300);
}

// Discord Avatar Loader
function loadDiscordAvatar() {
    const userId = '963802319877730344';
    const avatarImg = document.getElementById('discord-avatar');
    
    // Try different avatar formats
    const avatarFormats = [
        `https://cdn.discordapp.com/avatars/${userId}/a_default.gif`,
        `https://cdn.discordapp.com/avatars/${userId}/default.png`,
        `https://cdn.discordapp.com/embed/avatars/${userId.slice(-1)}.png`
    ];
    
    let currentFormat = 0;
    
    function tryLoadAvatar() {
        if (currentFormat < avatarFormats.length) {
            avatarImg.src = avatarFormats[currentFormat];
            avatarImg.onerror = () => {
                currentFormat++;
                tryLoadAvatar();
            };
        }
    }
    
    tryLoadAvatar();
}

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Special animation for cards
            if (entry.target.classList.contains('about-card') || 
                entry.target.classList.contains('galaxy-card')) {
                entry.target.style.animation = 'cardReveal 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .galaxy-card, .music-player-cosmic, .quote-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Add card reveal animation
const cardRevealStyles = `
    @keyframes cardReveal {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9) rotateX(20deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cardRevealStyles;
document.head.appendChild(styleSheet);

// Enhanced Card Interactions
document.querySelectorAll('.about-card, .galaxy-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Create sparkle effect
        createSparkleEffect(card);
        
        // Add tilt effect
        card.addEventListener('mousemove', handleCardTilt);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        card.removeEventListener('mousemove', handleCardTilt);
    });
    
    // Click ripple effect
    card.addEventListener('click', (e) => {
        createRippleEffect(e, card);
    });
});

function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function createSparkleEffect(element) {
    const sparkleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 100;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s linear;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (element.contains(ripple)) {
            element.removeChild(ripple);
        }
    }, 800);
}

// Add sparkle and ripple animations
const effectStyles = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-30px) scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-60px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const effectStyleSheet = document.createElement('style');
effectStyleSheet.textContent = effectStyles;
document.head.appendChild(effectStyleSheet);

// Profile Avatar Special Effects
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    let clickCount = 0;
    
    profileAvatar.addEventListener('click', () => {
        clickCount++;
        
        // Create orbital sparkles
        createOrbitalSparkles(profileAvatar);
        
        // Special effect after 5 clicks
        if (clickCount === 5) {
            triggerCosmicExplosion();
            clickCount = 0;
        }
    });
    
    profileAvatar.addEventListener('mouseenter', () => {
        createAuraEffect(profileAvatar);
    });
}

function createOrbitalSparkles(element) {
    const sparkleCount = 12;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const angle = (i / sparkleCount) * 2 * Math.PI;
        const radius = 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: orbitalSparkle 3s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 3000);
    }
}

function createAuraEffect(element) {
    const aura = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    aura.style.cssText = `
        position: fixed;
        width: ${rect.width + 60}px;
        height: ${rect.height + 60}px;
        left: ${rect.left - 30}px;
        top: ${rect.top - 30}px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: auraExpand 2s ease-out forwards;
    `;
    
    document.body.appendChild(aura);
    
    setTimeout(() => {
        if (document.body.contains(aura)) {
            document.body.removeChild(aura);
        }
    }, 2000);
}

function triggerCosmicExplosion() {
    // Create multiple colored particles
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                width: 12px;
                height: 12px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: cosmicExplosion 4s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 4000);
        }, i * 20);
    }
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: cosmicFlash 1s ease-out forwards;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (document.body.contains(flash)) {
            document.body.removeChild(flash);
        }
    }, 1000);
}

// Add cosmic effect animations
const cosmicStyles = `
    @keyframes orbitalSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes auraExpand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes cosmicExplosion {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes cosmicFlash {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const cosmicStyleSheet = document.createElement('style');
cosmicStyleSheet.textContent = cosmicStyles;
document.head.appendChild(cosmicStyleSheet);

// Dynamic Background Color Shift
let hueShift = 0;
setInterval(() => {
    hueShift += 0.5;
    document.documentElement.style.setProperty('--hue-shift', hueShift + 'deg');
}, 100);

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    document.querySelectorAll('.floating-elements > div').forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${rate * speed}px)`;
    });
    
    // Parallax for background elements
    document.querySelector('.stars').style.transform = `translateY(${scrolled * 0.2}px)`;
    document.querySelector('.twinkling').style.transform = `translateY(${scrolled * 0.1}px)`;
});

// Music Visualizer Enhancement
function enhanceMusicVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    
    setInterval(() => {
        bars.forEach(bar => {
            const height = Math.random() * 50 + 10;
            bar.style.height = height + 'px';
        });
    }, 200);
}

// Constellation Effect for Section Headers
function createConstellation(element) {
    const constellation = element.querySelector('.title-constellation');
    if (!constellation) return;
    
    // Create connecting lines between stars
    const stars = 8;
    for (let i = 0; i < stars; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite;
        `;
        constellation.appendChild(star);
    }
}

// Initialize constellation effects
document.querySelectorAll('.section-header').forEach(createConstellation);

// Add star twinkle animation
const starStyles = `
    @keyframes starTwinkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`;

const starStyleSheet = document.createElement('style');
starStyleSheet.textContent = starStyles;
document.head.appendChild(starStyleSheet);

// Loading Screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'cosmic-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `;
    
    loader.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 2rem; animation: loaderPulse 2s ease-in-out infinite;">✨</div>
        <div style="font-size: 1.5rem; color: white; opacity: 0.8;">Entering Arthur's Universe...</div>
        <div style="width: 200px; height: 2px; background: rgba(255,255,255,0.2); margin-top: 2rem; border-radius: 1px; overflow: hidden;">
            <div style="width: 0; height: 100%; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); animation: loaderProgress 3s ease-out forwards;"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 3 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 1000);
    }, 3000);
}

// Add loader animations
const loaderStyles = `
    @keyframes loaderPulse {
        0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.7;
        }
    }
    
    @keyframes loaderProgress {
        0% { width: 0; }
        100% { width: 100%; }
    }
`;

const loaderStyleSheet = document.createElement('style');
loaderStyleSheet.textContent = loaderStyles;
document.head.appendChild(loaderStyleSheet);

// Initialize everything when page loads
window.addEventListener('load', () => {
    createLoadingScreen();
    loadDiscordAvatar();
    createParticles();
    enhanceMusicVisualizer();
    
    // Add some initial sparkles
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createRandomSparkle();
            }, i * 200);
        }
    }, 4000);
});

function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1;
        animation: randomSparkle 3s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 3000);
}

const randomSparkleStyles = `
    @keyframes randomSparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;

const randomSparkleStyleSheet = document.createElement('style');
randomSparkleStyleSheet.textContent = randomSparkleStyles;
document.head.appendChild(randomSparkleStyleSheet);

// Console Easter Egg
console.log(`
    ✨ Welcome to Arthur's Cosmic Universe! ✨
    
    🌙 Night Owl Mode: ACTIVATED
    ☕ Coffee Level: MAXIMUM
    🐱 Cat Vibes: PURRING
    🎵 Music: FLOWING
    
    Try clicking the profile picture 5 times for a cosmic surprise! 🌟
    
    Made with cosmic love and endless creativity 💜
`);

// Add some cosmic console styling
console.log('%c🌌 COSMIC PORTFOLIO LOADED 🌌', 'color: #4ecdc4; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #4ecdc4;');

// Keyboard shortcuts easter egg
document.addEventListener('keydown', (e) => {
    // Press 'C' for cosmic mode
    if (e.key.toLowerCase() === 'c') {
        document.body.style.animation = 'cosmicRainbow 5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
    
    // Press 'S' for sparkle shower
    if (e.key.toLowerCase() === 's') {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createRandomSparkle();
            }, i * 100);
        }
    }
});

const keyboardStyles = `
    @keyframes cosmicRainbow {
        0% { filter: hue-rotate(0deg) saturate(1); }
        25% { filter: hue-rotate(90deg) saturate(1.5); }
        50% { filter: hue-rotate(180deg) saturate(2); }
        75% { filter: hue-rotate(270deg) saturate(1.5); }
        100% { filter: hue-rotate(360deg) saturate(1); }
    }
`;

const keyboardStyleSheet = document.createElement('style');
keyboardStyleSheet.textContent = keyboardStyles;
document.head.appendChild(keyboardStyleSheet);