// Enhanced Cursor Effects
const cursorGlow = document.querySelector('.cursor-glow');
const cursorTrail = document.querySelector('.cursor-trail');
const cursorSparkle = document.querySelector('.cursor-sparkle');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let sparkleX = 0, sparkleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Main cursor glow
    cursorGlow.style.left = mouseX - 25 + 'px';
    cursorGlow.style.top = mouseY - 25 + 'px';
});

// Smooth trailing cursors
function updateTrailCursors() {
    // Trail cursor
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX - 4 + 'px';
    cursorTrail.style.top = trailY - 4 + 'px';
    
    // Sparkle cursor
    sparkleX += (mouseX - sparkleX) * 0.05;
    sparkleY += (mouseY - sparkleY) * 0.05;
    cursorSparkle.style.left = sparkleX - 2 + 'px';
    cursorSparkle.style.top = sparkleY - 2 + 'px';
    
    requestAnimationFrame(updateTrailCursors);
}
updateTrailCursors();

// Enhanced Particle System
function createParticles() {
    const container = document.getElementById('particles-container');
    
    setInterval(() => {
        if (container.children.length < 50) { // Limit particles for performance
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            // Random particle color
            const colors = ['rgba(255, 255, 255, 0.9)', 'rgba(102, 126, 234, 0.8)', 'rgba(78, 205, 196, 0.8)', 'rgba(255, 107, 107, 0.8)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 10000);
        }
    }, 400);
}

// Enhanced Discord Avatar Loader
function loadDiscordAvatar() {
    const userId = '963802319877730344';
    const avatarImg = document.getElementById('discord-avatar');
    
    // Try different avatar formats with better error handling
    const avatarFormats = [
        `https://cdn.discordapp.com/avatars/${userId}/a_default.gif`,
        `https://cdn.discordapp.com/avatars/${userId}/default.png`,
        `https://cdn.discordapp.com/embed/avatars/${parseInt(userId.slice(-1)) % 5}.png`
    ];
    
    let currentFormat = 0;
    
    function tryLoadAvatar() {
        if (currentFormat < avatarFormats.length) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                avatarImg.src = this.src;
                avatarImg.style.opacity = '1';
            };
            img.onerror = function() {
                currentFormat++;
                tryLoadAvatar();
            };
            img.src = avatarFormats[currentFormat];
        } else {
            // Fallback to a default avatar
            avatarImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="30" font-family="Arial">A</text></svg>';
            avatarImg.style.opacity = '1';
        }
    }
    
    avatarImg.style.opacity = '0';
    tryLoadAvatar();
}

// Enhanced Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Enhanced Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            
            // Special animations for different elements
            if (entry.target.classList.contains('about-card')) {
                entry.target.style.animation = 'cardReveal 1s ease forwards';
            } else if (entry.target.classList.contains('galaxy-card')) {
                entry.target.style.animation = 'galaxyReveal 1.2s ease forwards';
            } else if (entry.target.classList.contains('music-player-cosmic')) {
                entry.target.style.animation = 'playerReveal 1.5s ease forwards';
            }
            
            // Trigger counter animations
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-count]');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .galaxy-card, .music-player-cosmic, .quote-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(80px) scale(0.9) rotateX(10deg)';
    el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced Animation Keyframes
const enhancedAnimations = `
    @keyframes cardReveal {
        0% {
            opacity: 0;
            transform: translateY(80px) scale(0.9) rotateX(15deg);
        }
        60% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.02) rotateX(-2deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }
    
    @keyframes galaxyReveal {
        0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotateY(20deg);
        }
        70% {
            opacity: 0.9;
            transform: translateY(-5px) scale(1.05) rotateY(-5deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
        }
    }
    
    @keyframes playerReveal {
        0% {
            opacity: 0;
            transform: translateY(100px) scale(0.7);
        }
        50% {
            opacity: 0.7;
            transform: translateY(-20px) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = enhancedAnimations;
document.head.appendChild(animationStyleSheet);

// Enhanced Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16); // ~60fps
}

// Enhanced Card Interactions
document.querySelectorAll('.about-card, .galaxy-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
        isHovering = true;
        createCardSparkles(card);
        createCardParticles(card);
        
        // Add tilt effect
        card.addEventListener('mousemove', handleCardTilt);
    });
    
    card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        card.removeEventListener('mousemove', handleCardTilt);
    });
    
    // Enhanced click effect
    card.addEventListener('click', (e) => {
        createRippleEffect(e, card);
        createClickBurst(e, card);
        
        // Vercel Analytics tracking
        if (window.va) {
            window.va('track', 'card_click', { card: card.dataset.card || card.dataset.galaxy });
        }
    });
});

function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `translateY(-25px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function createCardSparkles(element) {
    const sparkleCount = 12;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, white, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleFloat 3s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 3000);
        }, i * 150);
    }
}

function createCardParticles(element) {
    const particleCount = 8;
    const rect = element.getBoundingClientRect();
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: particleBurst 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 2000);
        }, i * 100);
    }
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 150;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 1s ease-out;
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
    }, 1000);
}

function createClickBurst(e, element) {
    const burstCount = 6;
    const rect = element.getBoundingClientRect();
    const centerX = e.clientX;
    const centerY = e.clientY;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        const angle = (i / burstCount) * 2 * Math.PI;
        const distance = 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        burst.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1001;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: burstOut 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 800);
    }
}

// Enhanced Profile Avatar Effects
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    let clickCount = 0;
    let lastClickTime = 0;
    
    profileAvatar.addEventListener('click', (e) => {
        const currentTime = Date.now();
        
        // Reset click count if too much time has passed
        if (currentTime - lastClickTime > 2000) {
            clickCount = 0;
        }
        
        clickCount++;
        lastClickTime = currentTime;
        
        // Create orbital sparkles
        createOrbitalSparkles(profileAvatar);
        
        // Special effects based on click count
        if (clickCount === 3) {
            createAuraWave(profileAvatar);
        } else if (clickCount === 5) {
            triggerCosmicExplosion();
            clickCount = 0;
            
            // Vercel Analytics tracking
            if (window.va) {
                window.va('track', 'cosmic_explosion');
            }
        }
    });
    
    profileAvatar.addEventListener('mouseenter', () => {
        createAuraEffect(profileAvatar);
    });
}

function createOrbitalSparkles(element) {
    const sparkleCount = 16;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const angle = (i / sparkleCount) * 2 * Math.PI;
        const radius = 120;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        sparkle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: orbitalSparkle 4s ease-out forwards;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 4000);
    }
}

function createAuraWave(element) {
    const wave = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    wave.style.cssText = `
        position: fixed;
        width: ${rect.width + 100}px;
        height: ${rect.height + 100}px;
        left: ${rect.left - 50}px;
        top: ${rect.top - 50}px;
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: auraWave 3s ease-out forwards;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
    `;
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (document.body.contains(wave)) {
            document.body.removeChild(wave);
        }
    }, 3000);
}

function createAuraEffect(element) {
    const aura = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    aura.style.cssText = `
        position: fixed;
        width: ${rect.width + 80}px;
        height: ${rect.height + 80}px;
        left: ${rect.left - 40}px;
        top: ${rect.top - 40}px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: auraExpand 2.5s ease-out forwards;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    `;
    
    document.body.appendChild(aura);
    
    setTimeout(() => {
        if (document.body.contains(aura)) {
            document.body.removeChild(aura);
        }
    }, 2500);
}

function triggerCosmicExplosion() {
    // Create multiple colored particles
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe', '#6c5ce7'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: cosmicExplosion 5s ease-out forwards;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 5000);
        }, i * 30);
    }
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: cosmicFlash 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (document.body.contains(flash)) {
            document.body.removeChild(flash);
        }
    }, 1500);
    
    // Add screen shake
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Enhanced Effect Animations
const enhancedEffects = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-40px) scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-80px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes burstOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    @keyframes orbitalSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(2) rotate(180deg);
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
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes auraWave {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes cosmicExplosion {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 600 - 300}px, ${Math.random() * 600 - 300}px) scale(0);
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
    
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

const effectStyleSheet = document.createElement('style');
effectStyleSheet.textContent = enhancedEffects;
document.head.appendChild(effectStyleSheet);

// Enhanced Parallax Effects
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Floating elements parallax
    document.querySelectorAll('.floating-elements > div').forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${rate * speed}px)`;
    });
    
    // Background elements parallax
    const stars = document.querySelector('.stars');
    const twinkling = document.querySelector('.twinkling');
    const clouds = document.querySelector('.clouds');
    
    if (stars) stars.style.transform = `translateY(${scrolled * 0.2}px)`;
    if (twinkling) twinkling.style.transform = `translateY(${scrolled * 0.1}px)`;
    if (clouds) clouds.style.transform = `translateY(${scrolled * 0.15}px)`;
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced Music Visualizer
function enhanceMusicVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    
    setInterval(() => {
        bars.forEach((bar, index) => {
            const height = Math.random() * 60 + 15;
            const delay = index * 50;
            setTimeout(() => {
                bar.style.height = height + 'px';
            }, delay);
        });
    }, 300);
}

// Enhanced Loading Screen
function createLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;
    
    // Animate loading progress
    const progress = loader.querySelector('.loading-progress');
    if (progress) {
        setTimeout(() => {
            progress.style.width = '100%';
        }, 500);
    }
    
    // Remove loader after animation
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 1000);
    }, 3500);
}

// Enhanced Name Letter Interactions
document.querySelectorAll('.name-letter').forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.transform = `translateY(-20px) scale(1.3) rotate(${Math.random() * 20 - 10}deg)`;
        letter.style.filter = 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.9))';
        
        // Create letter sparkles
        createLetterSparkles(letter);
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.transform = '';
        letter.style.filter = '';
    });
    
    letter.addEventListener('click', () => {
        // Create letter burst effect
        createLetterBurst(letter);
        
        // Vercel Analytics tracking
        if (window.va) {
            window.va('track', 'name_letter_click', { letter: letter.textContent, index });
        }
    });
});

function createLetterSparkles(letter) {
    const rect = letter.getBoundingClientRect();
    const sparkleCount = 6;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
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
                animation: letterSparkle 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

function createLetterBurst(letter) {
    const rect = letter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const burstCount = 8;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        const angle = (i / burstCount) * 2 * Math.PI;
        
        burst.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: letterBurst 1s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 1000);
    }
}

// Letter effect animations
const letterEffects = `
    @keyframes letterSparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-30px);
            opacity: 0;
        }
    }
    
    @keyframes letterBurst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px);
            opacity: 0;
        }
    }
`;

const letterEffectSheet = document.createElement('style');
letterEffectSheet.textContent = letterEffects;
document.head.appendChild(letterEffectSheet);

// Enhanced Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'C' for cosmic mode
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        document.body.style.animation = 'cosmicRainbow 6s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 6000);
        
        if (window.va) {
            window.va('track', 'cosmic_mode_activated');
        }
    }
    
    // Press 'S' for sparkle shower
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createRandomSparkle();
            }, i * 150);
        }
        
        if (window.va) {
            window.va('track', 'sparkle_shower_activated');
        }
    }
    
    // Press 'Space' for random cosmic effect
    if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const effects = [createRandomSparkle, createRandomParticle, createRandomBurst];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
        
        if (window.va) {
            window.va('track', 'random_effect_triggered');
        }
    }
});

function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, white, transparent);
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1000;
        animation: randomSparkle 4s ease-out forwards;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 4000);
}

function createRandomParticle() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1000;
        animation: randomParticle 3s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    }, 3000);
}

function createRandomBurst() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const burstCount = 8;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: randomBurst 2s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 2000);
    }
}

// Random effect animations
const randomEffects = `
    @keyframes randomSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes randomParticle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes randomBurst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px);
            opacity: 0;
        }
    }
    
    @keyframes cosmicRainbow {
        0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
        25% { filter: hue-rotate(90deg) saturate(1.5) brightness(1.2); }
        50% { filter: hue-rotate(180deg) saturate(2) brightness(1.4); }
        75% { filter: hue-rotate(270deg) saturate(1.5) brightness(1.2); }
        100% { filter: hue-rotate(360deg) saturate(1) brightness(1); }
    }
`;

const randomEffectSheet = document.createElement('style');
randomEffectSheet.textContent = randomEffects;
document.head.appendChild(randomEffectSheet);

// Performance Optimization
let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    isReducedMotion = e.matches;
    if (isReducedMotion) {
        // Disable heavy animations for better performance
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
});

// Intersection Observer for performance
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
});

document.querySelectorAll('.floating-elements > div').forEach(el => {
    performanceObserver.observe(el);
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    createLoadingScreen();
    loadDiscordAvatar();
    
    if (!isReducedMotion) {
        createParticles();
        enhanceMusicVisualizer();
        
        // Add some initial sparkles after loading
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createRandomSparkle();
                }, i * 300);
            }
        }, 4000);
    }
    
    // Vercel Analytics page view
    if (window.va) {
        window.va('track', 'page_loaded');
    }
});

// Enhanced Console Messages
console.log(`
    ✨ Welcome to Arthur's Enhanced Cosmic Universe! ✨
    
    🌙 Night Owl Mode: ACTIVATED
    ☕ Coffee Level: MAXIMUM OVERDRIVE
    🐱 Cat Vibes: PURRING AT MAXIMUM FREQUENCY
    🎵 Music: FLOWING THROUGH THE COSMOS
    🚀 Performance: OPTIMIZED FOR LIGHT SPEED
    
    🎮 Interactive Features:
    • Click the profile picture 5 times for a cosmic explosion! 🌟
    • Press 'C' for cosmic rainbow mode 🌈
    • Press 'S' for sparkle shower ✨
    • Press 'Space' for random cosmic effects 🎆
    • Hover over name letters for magical effects 🔮
    
    📱 Mobile Optimized: YES
    🔍 Vercel Analytics: TRACKING COSMIC INTERACTIONS
    ⚡ Performance: STELLAR
    
    Made with cosmic love, endless creativity, and way too much coffee ☕
    
    🌌 Arthur's Universe v2.0 - Now 100x Better! 🌌
`);

console.log('%c🌌 ENHANCED COSMIC PORTFOLIO LOADED 🌌', 'color: #4ecdc4; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #4ecdc4; background: linear-gradient(45deg, #667eea, #764ba2); padding: 10px; border-radius: 5px;');

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}