// Enhanced Global Variables
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let sparkleX = 0, sparkleY = 0;
let isAudioPlaying = false;
let audioContext = null;
let analyser = null;
let dataArray = null;

// Enhanced Cursor Effects
const cursorGlow = document.querySelector('.cursor-glow');
const cursorTrail = document.querySelector('.cursor-trail');
const cursorSparkle = document.querySelector('.cursor-sparkle');

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Main cursor glow
    cursorGlow.style.left = mouseX - 30 + 'px';
    cursorGlow.style.top = mouseY - 30 + 'px';
});

// Smooth trailing cursors with enhanced physics
function updateTrailCursors() {
    // Trail cursor with smooth easing
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    cursorTrail.style.left = trailX - 5 + 'px';
    cursorTrail.style.top = trailY - 5 + 'px';
    
    // Sparkle cursor with even smoother easing
    sparkleX += (mouseX - sparkleX) * 0.04;
    sparkleY += (mouseY - sparkleY) * 0.04;
    cursorSparkle.style.left = sparkleX - 3 + 'px';
    cursorSparkle.style.top = sparkleY - 3 + 'px';
    
    requestAnimationFrame(updateTrailCursors);
}
updateTrailCursors();

// Enhanced Audio System
const cosmicAudio = document.getElementById('cosmic-audio');
const audioControl = document.getElementById('audio-control');
const audioButton = document.getElementById('audio-button');
const audioIcon = document.getElementById('audio-icon');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const volumeBtn = document.getElementById('volume-btn');
const volumeIcon = document.getElementById('volume-icon');

// Auto-start audio with user interaction
let audioInitialized = false;

function initializeAudio() {
    if (!audioInitialized) {
        cosmicAudio.volume = 0.3; // Set comfortable volume
        cosmicAudio.play().then(() => {
            isAudioPlaying = true;
            audioButton.classList.add('playing');
            audioIcon.className = 'fas fa-volume-up';
            playIcon.className = 'fas fa-pause';
            audioInitialized = true;
            
            // Initialize Web Audio API for visualizer
            initializeAudioAnalyser();
            
            // Vercel Analytics tracking
            if (window.va) {
                window.va('track', 'audio_autoplay_success');
            }
        }).catch(error => {
            console.log('Auto-play prevented:', error);
            // Fallback: wait for user interaction
            document.addEventListener('click', initializeAudioOnInteraction, { once: true });
        });
    }
}

function initializeAudioOnInteraction() {
    if (!audioInitialized) {
        cosmicAudio.play().then(() => {
            isAudioPlaying = true;
            audioButton.classList.add('playing');
            audioIcon.className = 'fas fa-volume-up';
            playIcon.className = 'fas fa-pause';
            audioInitialized = true;
            initializeAudioAnalyser();
            
            if (window.va) {
                window.va('track', 'audio_manual_start');
            }
        });
    }
}

function initializeAudioAnalyser() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(cosmicAudio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Start visualizer
        updateMusicVisualizer();
    } catch (error) {
        console.log('Audio analyser initialization failed:', error);
    }
}

// Audio control handlers
audioButton.addEventListener('click', toggleAudio);
playPauseBtn?.addEventListener('click', toggleAudio);

function toggleAudio() {
    if (!audioInitialized) {
        initializeAudioOnInteraction();
        return;
    }
    
    if (isAudioPlaying) {
        cosmicAudio.pause();
        isAudioPlaying = false;
        audioButton.classList.remove('playing');
        audioIcon.className = 'fas fa-volume-mute';
        if (playIcon) playIcon.className = 'fas fa-play';
    } else {
        cosmicAudio.play();
        isAudioPlaying = true;
        audioButton.classList.add('playing');
        audioIcon.className = 'fas fa-volume-up';
        if (playIcon) playIcon.className = 'fas fa-pause';
    }
    
    if (window.va) {
        window.va('track', 'audio_toggle', { playing: isAudioPlaying });
    }
}

volumeBtn?.addEventListener('click', () => {
    if (cosmicAudio.volume > 0) {
        cosmicAudio.volume = 0;
        volumeIcon.className = 'fas fa-volume-mute';
    } else {
        cosmicAudio.volume = 0.3;
        volumeIcon.className = 'fas fa-volume-up';
    }
});

// Enhanced Particle System
function createParticles() {
    const container = document.getElementById('particles-container');
    const cosmicContainer = document.getElementById('cosmic-particles');
    
    setInterval(() => {
        if (container.children.length < 60) { // Increased particle limit
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            // Enhanced particle colors
            const colors = [
                'rgba(255, 255, 255, 0.9)', 
                'rgba(102, 126, 234, 0.8)', 
                'rgba(78, 205, 196, 0.8)', 
                'rgba(255, 107, 107, 0.8)',
                'rgba(240, 147, 251, 0.8)',
                'rgba(255, 234, 167, 0.8)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 13000);
        }
        
        // Create cosmic particles
        if (cosmicContainer && cosmicContainer.children.length < 30) {
            createCosmicParticle(cosmicContainer);
        }
    }, 500);
}

function createCosmicParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: cosmicFloat ${Math.random() * 10 + 15}s linear infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
        }
    }, 25000);
}

// Enhanced Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
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
            const offsetTop = targetSection.offsetTop - 100; // Account for fixed nav
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
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            
            // Special animations for different elements
            if (entry.target.classList.contains('about-card')) {
                entry.target.style.animation = 'cardReveal 1.2s ease forwards';
            } else if (entry.target.classList.contains('galaxy-card')) {
                entry.target.style.animation = 'galaxyReveal 1.5s ease forwards';
            } else if (entry.target.classList.contains('music-player-cosmic')) {
                entry.target.style.animation = 'playerReveal 2s ease forwards';
            } else if (entry.target.classList.contains('contact-card')) {
                entry.target.style.animation = 'contactReveal 1s ease forwards';
            }
            
            // Trigger counter animations
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-count]');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            
            // Create entrance sparkles
            createEntranceSparkles(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .galaxy-card, .music-player-cosmic, .quote-container, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(100px) scale(0.9) rotateX(15deg)';
    el.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced Animation Keyframes
const enhancedAnimations = `
    @keyframes cardReveal {
        0% {
            opacity: 0;
            transform: translateY(100px) scale(0.9) rotateX(20deg);
        }
        60% {
            opacity: 0.8;
            transform: translateY(-15px) scale(1.03) rotateX(-3deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }
    
    @keyframes galaxyReveal {
        0% {
            opacity: 0;
            transform: translateY(80px) scale(0.8) rotateY(25deg);
        }
        70% {
            opacity: 0.9;
            transform: translateY(-8px) scale(1.08) rotateY(-8deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
        }
    }
    
    @keyframes playerReveal {
        0% {
            opacity: 0;
            transform: translateY(120px) scale(0.7);
        }
        50% {
            opacity: 0.7;
            transform: translateY(-25px) scale(1.15);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes contactReveal {
        0% {
            opacity: 0;
            transform: translateY(60px) scale(0.9) rotateZ(5deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateZ(0deg);
        }
    }
    
    @keyframes cosmicFloat {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(200px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = enhancedAnimations;
document.head.appendChild(animationStyleSheet);

// Enhanced Counter Animation
function animateCounter(element) {
    const target = element.getAttribute('data-count');
    if (!target || target === '∞') {
        if (target === '∞') {
            element.style.animation = 'infinityPulse 2s ease-in-out infinite';
        }
        return;
    }
    
    const numericTarget = parseInt(target);
    if (isNaN(numericTarget)) return;
    
    let current = 0;
    const increment = numericTarget / 80; // 80 frames for ultra-smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            element.textContent = target + (target.includes('%') ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target.includes('%') ? '%' : '+');
        }
    }, 25); // ~40fps for smooth counting
}

// Enhanced Card Interactions
document.querySelectorAll('.about-card, .galaxy-card, .contact-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
        isHovering = true;
        createCardSparkles(card);
        createCardParticles(card);
        createCardAura(card);
        
        // Add enhanced tilt effect
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
        createShockwave(e, card);
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        
        // Vercel Analytics tracking
        if (window.va) {
            window.va('track', 'card_click', { 
                card: card.dataset.card || card.dataset.galaxy,
                timestamp: Date.now()
            });
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
    
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    
    card.style.transform = `translateY(-30px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function createCardSparkles(element) {
    const sparkleCount = 15;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, white, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleFloat 4s ease-out forwards;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 4000);
        }, i * 200);
    }
}

function createCardParticles(element) {
    const particleCount = 12;
    const rect = element.getBoundingClientRect();
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: particleBurst 3s ease-out forwards;
                box-shadow: 0 0 10px ${colors[Math.floor(Math.random() * colors.length)]};
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 3000);
        }, i * 150);
    }
}

function createCardAura(element) {
    const aura = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    aura.style.cssText = `
        position: fixed;
        width: ${rect.width + 100}px;
        height: ${rect.height + 100}px;
        left: ${rect.left - 50}px;
        top: ${rect.top - 50}px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 30px;
        pointer-events: none;
        z-index: 998;
        animation: auraExpand 3s ease-out forwards;
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
    `;
    
    document.body.appendChild(aura);
    
    setTimeout(() => {
        if (document.body.contains(aura)) {
            document.body.removeChild(aura);
        }
    }, 3000);
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 200;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 1.2s ease-out;
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
    }, 1200);
}

function createClickBurst(e, element) {
    const burstCount = 8;
    const rect = element.getBoundingClientRect();
    const centerX = e.clientX;
    const centerY = e.clientY;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        const angle = (i / burstCount) * 2 * Math.PI;
        
        burst.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1001;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: burstOut 1s ease-out forwards;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 1000);
    }
}

function createShockwave(e, element) {
    const shockwave = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;
    
    shockwave.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        left: ${centerX - 10}px;
        top: ${centerY - 10}px;
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 11;
        animation: shockwave 0.8s ease-out forwards;
    `;
    
    element.appendChild(shockwave);
    
    setTimeout(() => {
        if (element.contains(shockwave)) {
            element.removeChild(shockwave);
        }
    }, 800);
}

function createEntranceSparkles(element) {
    const sparkleCount = 20;
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
                top: ${rect.top + rect.height + 50}px;
                animation: entranceSparkle 2s ease-out forwards;
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
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

// Enhanced Profile Avatar Effects
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    let clickCount = 0;
    let lastClickTime = 0;
    
    profileAvatar.addEventListener('click', (e) => {
        const currentTime = Date.now();
        
        // Reset click count if too much time has passed
        if (currentTime - lastClickTime > 3000) {
            clickCount = 0;
        }
        
        clickCount++;
        lastClickTime = currentTime;
        
        // Create orbital sparkles
        createOrbitalSparkles(profileAvatar);
        
        // Special effects based on click count
        if (clickCount === 3) {
            createAuraWave(profileAvatar);
            createProfileLightning(profileAvatar);
        } else if (clickCount === 5) {
            triggerCosmicExplosion();
            clickCount = 0;
            
            // Vercel Analytics tracking
            if (window.va) {
                window.va('track', 'cosmic_explosion', { timestamp: currentTime });
            }
        } else if (clickCount === 7) {
            triggerUniverseTransformation();
            clickCount = 0;
        }
    });
    
    profileAvatar.addEventListener('mouseenter', () => {
        createAuraEffect(profileAvatar);
        createProfileGlow(profileAvatar);
    });
}

function createOrbitalSparkles(element) {
    const sparkleCount = 20;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const angle = (i / sparkleCount) * 2 * Math.PI;
        const radius = 150;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        sparkle.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: orbitalSparkle 5s ease-out forwards;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 5000);
    }
}

function createAuraWave(element) {
    const wave = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    wave.style.cssText = `
        position: fixed;
        width: ${rect.width + 150}px;
        height: ${rect.height + 150}px;
        left: ${rect.left - 75}px;
        top: ${rect.top - 75}px;
        border: 4px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: auraWave 4s ease-out forwards;
        box-shadow: 0 0 50px rgba(255, 255, 255, 0.8);
    `;
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (document.body.contains(wave)) {
            document.body.removeChild(wave);
        }
    }, 4000);
}

function createProfileLightning(element) {
    const lightningCount = 6;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < lightningCount; i++) {
        const lightning = document.createElement('div');
        const angle = (i / lightningCount) * 2 * Math.PI;
        const length = 200;
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;
        
        lightning.style.cssText = `
            position: fixed;
            width: 3px;
            height: ${length}px;
            left: ${centerX}px;
            top: ${centerY}px;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 1), transparent);
            transform-origin: top center;
            transform: rotate(${angle * 180 / Math.PI + 90}deg);
            pointer-events: none;
            z-index: 1000;
            animation: lightning 0.5s ease-out forwards;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(lightning);
        
        setTimeout(() => {
            if (document.body.contains(lightning)) {
                document.body.removeChild(lightning);
            }
        }, 500);
    }
}

function createAuraEffect(element) {
    const aura = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    aura.style.cssText = `
        position: fixed;
        width: ${rect.width + 120}px;
        height: ${rect.height + 120}px;
        left: ${rect.left - 60}px;
        top: ${rect.top - 60}px;
        border: 3px solid rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: auraExpand 3s ease-out forwards;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
    `;
    
    document.body.appendChild(aura);
    
    setTimeout(() => {
        if (document.body.contains(aura)) {
            document.body.removeChild(aura);
        }
    }, 3000);
}

function createProfileGlow(element) {
    const glow = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    glow.style.cssText = `
        position: fixed;
        width: ${rect.width + 200}px;
        height: ${rect.height + 200}px;
        left: ${rect.left - 100}px;
        top: ${rect.top - 100}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 998;
        animation: profileGlow 2s ease-out forwards;
    `;
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        if (document.body.contains(glow)) {
            document.body.removeChild(glow);
        }
    }, 2000);
}

function triggerCosmicExplosion() {
    // Create multiple colored particles
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe', '#6c5ce7', '#00cec9', '#e17055'];
    
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 12 + 6;
            
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
                animation: cosmicExplosion 6s ease-out forwards;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px ${color};
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 6000);
        }, i * 40);
    }
    
    // Enhanced screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.95), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: cosmicFlash 2s ease-out forwards;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (document.body.contains(flash)) {
            document.body.removeChild(flash);
        }
    }, 2000);
    
    // Add enhanced screen shake
    document.body.style.animation = 'screenShake 1s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1000);
    
    // Create cosmic rings
    createCosmicRings();
}

function triggerUniverseTransformation() {
    // Ultimate effect - transform the entire universe
    document.body.style.animation = 'universeTransform 8s ease-in-out';
    
    // Create galaxy spiral
    createGalaxySpiral();
    
    // Create time distortion
    createTimeDistortion();
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 8000);
    
    if (window.va) {
        window.va('track', 'universe_transformation');
    }
}

function createCosmicRings() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const ring = document.createElement('div');
            ring.style.cssText = `
                position: fixed;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border: 3px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: cosmicRing 3s ease-out forwards;
            `;
            
            document.body.appendChild(ring);
            
            setTimeout(() => {
                if (document.body.contains(ring)) {
                    document.body.removeChild(ring);
                }
            }, 3000);
        }, i * 300);
    }
}

function createGalaxySpiral() {
    const spiralCount = 50;
    for (let i = 0; i < spiralCount; i++) {
        setTimeout(() => {
            const spiral = document.createElement('div');
            const angle = (i / spiralCount) * 4 * Math.PI;
            const radius = i * 5;
            
            spiral.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: galaxySpiral 6s ease-out forwards;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            `;
            
            document.body.appendChild(spiral);
            
            setTimeout(() => {
                if (document.body.contains(spiral)) {
                    document.body.removeChild(spiral);
                }
            }, 6000);
        }, i * 50);
    }
}

function createTimeDistortion() {
    const distortion = document.createElement('div');
    distortion.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.3) 70%);
        pointer-events: none;
        z-index: 9998;
        animation: timeDistortion 8s ease-in-out forwards;
    `;
    
    document.body.appendChild(distortion);
    
    setTimeout(() => {
        if (document.body.contains(distortion)) {
            document.body.removeChild(distortion);
        }
    }, 8000);
}

// Enhanced Effect Animations
const enhancedEffects = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) scale(2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(5);
            opacity: 0;
        }
    }
    
    @keyframes burstOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px);
            opacity: 0;
        }
    }
    
    @keyframes shockwave {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes entranceSparkle {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes orbitalSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(2.5) rotate(180deg);
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
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes auraWave {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(5);
            opacity: 0;
        }
    }
    
    @keyframes lightning {
        0% {
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg) scaleY(1);
        }
        100% {
            opacity: 0;
            transform: rotate(${Math.random() * 360}deg) scaleY(0);
        }
    }
    
    @keyframes profileGlow {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes cosmicExplosion {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 800 - 400}px, ${Math.random() * 800 - 400}px) scale(0);
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
        10% { transform: translateX(-10px); }
        20% { transform: translateX(10px); }
        30% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        50% { transform: translateX(-6px); }
        60% { transform: translateX(6px); }
        70% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
        90% { transform: translateX(-2px); }
    }
    
    @keyframes cosmicRing {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
        }
    }
    
    @keyframes galaxySpiral {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(720deg) translateX(300px);
            opacity: 0;
        }
    }
    
    @keyframes timeDistortion {
        0%, 100% {
            filter: blur(0px) hue-rotate(0deg);
            transform: scale(1);
        }
        50% {
            filter: blur(5px) hue-rotate(180deg);
            transform: scale(1.1);
        }
    }
    
    @keyframes universeTransform {
        0%, 100% {
            filter: hue-rotate(0deg) saturate(1) brightness(1);
            transform: scale(1);
        }
        25% {
            filter: hue-rotate(90deg) saturate(2) brightness(1.5);
            transform: scale(1.02);
        }
        50% {
            filter: hue-rotate(180deg) saturate(3) brightness(2);
            transform: scale(1.05);
        }
        75% {
            filter: hue-rotate(270deg) saturate(2) brightness(1.5);
            transform: scale(1.02);
        }
    }
    
    @keyframes infinityPulse {
        0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
        50% {
            transform: scale(1.2);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
        }
    }
`;

const effectStyleSheet = document.createElement('style');
effectStyleSheet.textContent = enhancedEffects;
document.head.appendChild(effectStyleSheet);

// Enhanced Music Visualizer
function updateMusicVisualizer() {
    if (!analyser || !dataArray) return;
    
    analyser.getByteFrequencyData(dataArray);
    
    const bars = document.querySelectorAll('.visualizer-bar');
    const bassRange = Math.floor(dataArray.length * 0.1);
    const midRange = Math.floor(dataArray.length * 0.5);
    const trebleRange = dataArray.length;
    
    bars.forEach((bar, index) => {
        let dataIndex;
        if (index < 5) {
            // Bass frequencies
            dataIndex = Math.floor((index / 5) * bassRange);
        } else if (index < 10) {
            // Mid frequencies
            dataIndex = bassRange + Math.floor(((index - 5) / 5) * (midRange - bassRange));
        } else {
            // Treble frequencies
            dataIndex = midRange + Math.floor(((index - 10) / 5) * (trebleRange - midRange));
        }
        
        const value = dataArray[dataIndex] || 0;
        const height = (value / 255) * 100;
        bar.style.height = Math.max(height, 20) + 'px';
        
        // Add color based on frequency
        if (index < 5) {
            bar.style.background = `linear-gradient(to top, #ff6b6b, #ff8e8e)`;
        } else if (index < 10) {
            bar.style.background = `linear-gradient(to top, #4ecdc4, #6ee6de)`;
        } else {
            bar.style.background = `linear-gradient(to top, #45b7d1, #67c7e1)`;
        }
    });
    
    requestAnimationFrame(updateMusicVisualizer);
}

// Enhanced Parallax Effects
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.4;
    
    // Floating elements parallax
    document.querySelectorAll('.floating-elements > div').forEach((element, index) => {
        const speed = 0.2 + (index * 0.05);
        element.style.transform = `translateY(${rate * speed}px)`;
    });
    
    // Background elements parallax
    const stars = document.querySelector('.stars');
    const twinkling = document.querySelector('.twinkling');
    const clouds = document.querySelector('.clouds');
    const aurora = document.querySelector('.aurora');
    
    if (stars) stars.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (twinkling) twinkling.style.transform = `translateY(${scrolled * 0.15}px)`;
    if (clouds) clouds.style.transform = `translateY(${scrolled * 0.2}px)`;
    if (aurora) aurora.style.transform = `translateY(${scrolled * 0.1}px)`;
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced Name Letter Interactions
document.querySelectorAll('.name-letter').forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.transform = `translateY(-25px) scale(1.4) rotate(${Math.random() * 30 - 15}deg)`;
        letter.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 1))';
        
        // Create letter sparkles
        createLetterSparkles(letter);
        createLetterAura(letter);
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.transform = '';
        letter.style.filter = '';
    });
    
    letter.addEventListener('click', () => {
        // Create letter burst effect
        createLetterBurst(letter);
        createLetterShockwave(letter);
        
        // Vercel Analytics tracking
        if (window.va) {
            window.va('track', 'name_letter_click', { 
                letter: letter.textContent, 
                index,
                timestamp: Date.now()
            });
        }
    });
});

function createLetterSparkles(letter) {
    const rect = letter.getBoundingClientRect();
    const sparkleCount = 8;
    
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
                animation: letterSparkle 2s ease-out forwards;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 150);
    }
}

function createLetterAura(letter) {
    const aura = document.createElement('div');
    const rect = letter.getBoundingClientRect();
    
    aura.style.cssText = `
        position: fixed;
        width: ${rect.width + 40}px;
        height: ${rect.height + 40}px;
        left: ${rect.left - 20}px;
        top: ${rect.top - 20}px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        pointer-events: none;
        z-index: 999;
        animation: letterAura 2s ease-out forwards;
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
    `;
    
    document.body.appendChild(aura);
    
    setTimeout(() => {
        if (document.body.contains(aura)) {
            document.body.removeChild(aura);
        }
    }, 2000);
}

function createLetterBurst(letter) {
    const rect = letter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const burstCount = 10;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        const angle = (i / burstCount) * 2 * Math.PI;
        
        burst.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: letterBurst 1.5s ease-out forwards;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 1500);
    }
}

function createLetterShockwave(letter) {
    const shockwave = document.createElement('div');
    const rect = letter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    shockwave.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        left: ${centerX - 5}px;
        top: ${centerY - 5}px;
        border: 2px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: letterShockwave 1s ease-out forwards;
    `;
    
    document.body.appendChild(shockwave);
    
    setTimeout(() => {
        if (document.body.contains(shockwave)) {
            document.body.removeChild(shockwave);
        }
    }, 1000);
}

// Enhanced Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'C' for cosmic mode
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        document.body.style.animation = 'cosmicRainbow 8s ease-in-out';
        createCosmicStorm();
        setTimeout(() => {
            document.body.style.animation = '';
        }, 8000);
        
        if (window.va) {
            window.va('track', 'cosmic_mode_activated');
        }
    }
    
    // Press 'S' for sparkle shower
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createRandomSparkle();
            }, i * 200);
        }
        
        if (window.va) {
            window.va('track', 'sparkle_shower_activated');
        }
    }
    
    // Press 'Space' for random cosmic effect
    if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const effects = [createRandomSparkle, createRandomParticle, createRandomBurst, createRandomLightning];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
        
        if (window.va) {
            window.va('track', 'random_effect_triggered');
        }
    }
    
    // Press 'M' to toggle music
    if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey) {
        toggleAudio();
    }
    
    // Press 'U' for universe mode
    if (e.key.toLowerCase() === 'u' && !e.ctrlKey && !e.metaKey) {
        triggerUniverseTransformation();
    }
});

function createCosmicStorm() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createRandomLightning();
            createRandomSparkle();
            createRandomParticle();
        }, i * 100);
    }
}

function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, white, transparent);
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1000;
        animation: randomSparkle 5s ease-out forwards;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 5000);
}

function createRandomParticle() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'];
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1000;
        animation: randomParticle 4s ease-out forwards;
        box-shadow: 0 0 15px ${colors[Math.floor(Math.random() * colors.length)]};
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    }, 4000);
}

function createRandomBurst() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const burstCount = 12;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: randomBurst 3s ease-out forwards;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 3000);
    }
}

function createRandomLightning() {
    const lightning = document.createElement('div');
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.3;
    const endX = Math.random() * window.innerWidth;
    const endY = startY + Math.random() * 200 + 100;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    lightning.style.cssText = `
        position: fixed;
        width: 3px;
        height: ${length}px;
        left: ${startX}px;
        top: ${startY}px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3));
        transform-origin: top center;
        transform: rotate(${angle + 90}deg);
        pointer-events: none;
        z-index: 1000;
        animation: lightning 0.3s ease-out forwards;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
    `;
    
    document.body.appendChild(lightning);
    
    setTimeout(() => {
        if (document.body.contains(lightning)) {
            document.body.removeChild(lightning);
        }
    }, 300);
}

// Enhanced Loading Screen
function createLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;
    
    const tips = [
        'Brewing cosmic coffee...',
        'Awakening the night owls...',
        'Summoning digital cats...',
        'Tuning the universe frequency...',
        'Loading infinite creativity...',
        'Initializing stellar vibes...',
        'Connecting to the cosmic network...',
        'Preparing magical experiences...'
    ];
    
    const tipElement = document.getElementById('loading-tip');
    let tipIndex = 0;
    
    // Rotate loading tips
    const tipInterval = setInterval(() => {
        if (tipElement) {
            tipElement.style.opacity = '0';
            setTimeout(() => {
                tipElement.textContent = tips[tipIndex];
                tipElement.style.opacity = '1';
                tipIndex = (tipIndex + 1) % tips.length;
            }, 300);
        }
    }, 2000);
    
    // Animate loading progress
    const progress = loader.querySelector('.loading-progress');
    if (progress) {
        setTimeout(() => {
            progress.style.width = '100%';
        }, 1000);
    }
    
    // Remove loader after animation
    setTimeout(() => {
        clearInterval(tipInterval);
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 1500);
    }, 5000);
}

// Letter effect animations
const letterEffects = `
    @keyframes letterSparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-40px);
            opacity: 0;
        }
    }
    
    @keyframes letterAura {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes letterBurst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
            opacity: 0;
        }
    }
    
    @keyframes letterShockwave {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(15);
            opacity: 0;
        }
    }
`;

const letterEffectSheet = document.createElement('style');
letterEffectSheet.textContent = letterEffects;
document.head.appendChild(letterEffectSheet);

// Random effect animations
const randomEffects = `
    @keyframes randomSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(3) rotate(180deg);
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
            transform: scale(0) translate(${Math.random() * 250 - 125}px, ${Math.random() * 250 - 125}px);
            opacity: 0;
        }
    }
    
    @keyframes randomBurst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes cosmicRainbow {
        0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
        25% { filter: hue-rotate(90deg) saturate(1.8) brightness(1.3); }
        50% { filter: hue-rotate(180deg) saturate(2.5) brightness(1.6); }
        75% { filter: hue-rotate(270deg) saturate(1.8) brightness(1.3); }
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
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    createLoadingScreen();
    
    // Try to initialize audio immediately
    setTimeout(() => {
        initializeAudio();
    }, 2000);
    
    if (!isReducedMotion) {
        createParticles();
        
        // Add some initial sparkles after loading
        setTimeout(() => {
            for (let i = 0; i < 25; i++) {
                setTimeout(() => {
                    createRandomSparkle();
                }, i * 400);
            }
        }, 6000);
    }
    
    // Vercel Analytics page view
    if (window.va) {
        window.va('track', 'page_loaded', {
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`
        });
    }
});

// Enhanced Console Messages
console.log(`
    ✨ Welcome to Arthur's ULTIMATE Cosmic Universe! ✨
    
    🌙 Night Owl Mode: MAXIMUM POWER
    ☕ Coffee Level: INFINITE OVERDRIVE
    🐱 Cat Vibes: PURRING AT COSMIC FREQUENCY
    🎵 Music: AUTO-PLAYING COSMIC SYMPHONY
    🚀 Performance: OPTIMIZED FOR WARP SPEED
    🎨 Design: 100X BETTER THAN BEFORE
    
    🎮 Enhanced Interactive Features:
    • Click the profile picture 5 times for cosmic explosion! 🌟
    • Click 7 times for universe transformation! 🌌
    • Press 'C' for cosmic rainbow mode 🌈
    • Press 'S' for enhanced sparkle shower ✨
    • Press 'Space' for random cosmic effects 🎆
    • Press 'M' to toggle music 🎵
    • Press 'U' for universe transformation 🌌
    • Hover over name letters for magical effects 🔮
    
    📱 Mobile Optimized: PERFECT
    🔍 Vercel Analytics: TRACKING ALL COSMIC INTERACTIONS
    ⚡ Performance: STELLAR WITH AUTO-PLAYING MUSIC
    🎵 Audio: AUTO-STARTS WITH VISUALIZER
    
    Made with cosmic love, endless creativity, infinite coffee, and feline wisdom ☕🐱
    
    🌌 Arthur's Universe v3.0 - NOW 100X BETTER WITH AUTO-MUSIC! 🌌
`);

console.log('%c🌌 ULTIMATE COSMIC PORTFOLIO LOADED 🌌', 'color: #4ecdc4; font-size: 28px; font-weight: bold; text-shadow: 0 0 15px #4ecdc4; background: linear-gradient(45deg, #667eea, #764ba2, #f093fb); padding: 15px; border-radius: 10px;');

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

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('Cosmic error detected:', e.error);
    if (window.va) {
        window.va('track', 'error', { 
            message: e.message,
            filename: e.filename,
            lineno: e.lineno
        });
    }
});

// Enhanced Visibility Change Handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause audio when tab is hidden
        if (isAudioPlaying && cosmicAudio) {
            cosmicAudio.pause();
        }
    } else {
        // Resume audio when tab is visible
        if (isAudioPlaying && cosmicAudio && audioInitialized) {
            cosmicAudio.play();
        }
    }
});

// Enhanced Touch Support for Mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
        // Initialize audio on first touch for mobile
        if (!audioInitialized) {
            initializeAudioOnInteraction();
        }
        
        // Create touch sparkles
        const touch = e.touches[0];
        createTouchSparkle(touch.clientX, touch.clientY);
    });
}

function createTouchSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 15px;
        height: 15px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
        border-radius: 50%;
        left: ${x - 7.5}px;
        top: ${y - 7.5}px;
        pointer-events: none;
        z-index: 1000;
        animation: touchSparkle 1s ease-out forwards;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 1000);
}

const touchEffects = `
    @keyframes touchSparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;

const touchEffectSheet = document.createElement('style');
touchEffectSheet.textContent = touchEffects;
document.head.appendChild(touchEffectSheet);