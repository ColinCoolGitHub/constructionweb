// ============================================
// CORBO DIGITAL - Main JavaScript
// ============================================

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP ScrollTrigger integration with Lenis
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// LOADER ANIMATION
// ============================================
const loader = document.querySelector('.loader');
const loaderText = document.querySelectorAll('.loader-text span');
const loaderProgress = document.querySelector('.loader-progress');
const loaderLogo = document.querySelector('.loader-logo img');

if (loader && loaderText.length && loaderProgress) {
    const tl = gsap.timeline();
    
    // Animate logo
    if (loaderLogo) {
        tl.to(loaderLogo, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    // Animate text letters
    tl.to(loaderText, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.4')
    // Progress bar fills
    .to(loaderProgress, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    }, '-=0.3')
    // Slide loader up
    .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.3,
        onComplete: () => {
            loader.style.display = 'none';
            initHeroAnimations();
        }
    });
}

// ============================================
// THREE.JS CONTACT BACKGROUND
// ============================================
function initThreeJS() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles with brand colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xD2A517, // Gold accent color
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating geometric shapes with brand colors
    const geometries = [
        new THREE.IcosahedronGeometry(0.4, 0),
        new THREE.OctahedronGeometry(0.35, 0),
        new THREE.TetrahedronGeometry(0.3, 0)
    ];

    const shapeMaterial = new THREE.MeshBasicMaterial({
        color: 0x103877, // Primary blue
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });

    const shapes = [];
    for (let i = 0; i < 5; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const shape = new THREE.Mesh(geometry, shapeMaterial);
        shape.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3
        );
        shape.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        shapes.push(shape);
        scene.add(shape);
    }

    camera.position.z = 3;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0003;

        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.004 * (i + 1) * 0.5;
            shape.rotation.y += 0.003 * (i + 1) * 0.5;
            shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
        });

        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Initialize Three.js when page loads
setTimeout(initThreeJS, 100);

// ============================================
// HERO ANIMATIONS
// ============================================
function initHeroAnimations() {
    const heroTag = document.querySelector('.hero-tag');
    const titleWords = document.querySelectorAll('.title-word');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(heroTag, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    })
    .to(titleWords, {
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.4')
    .to(heroSubtitle, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .to(heroCta, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .to(scrollIndicator, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4');
}

// ============================================
// IMPACT SECTION - Horizontal Wipe Reveal
// ============================================
const impactSection = document.querySelector('.impact-section');
const impactPanel = document.querySelector('.impact-panel');
const impactWords = document.querySelectorAll('.impact-word');
const impactOutlineWords = document.querySelectorAll('.impact-word.outline');
const impactScrollHint = document.querySelector('.impact-scroll-hint');

if (impactSection && impactPanel && impactWords.length) {
    // Initial animation when section comes into view
    const impactTl = gsap.timeline({
        scrollTrigger: {
            trigger: impactSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    impactTl.to(impactWords, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.out'
    })
    .to(impactScrollHint, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.5');

    // Slide left to right and fade out animation - panel moves left to reveal About section
    gsap.to(impactPanel, {
        x: '-100%',
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: impactSection,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            markers: false
        }
    });

    // About section slides in from right while impact slides left
    const wipeReveal = document.querySelector('.wipe-reveal');
    if (wipeReveal) {
        gsap.to(wipeReveal, {
            x: 0,
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: impactSection,
                start: 'top top',
                end: '+=200%',
                scrub: 1
            }
        });
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');

ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: navbar }
});

// ============================================
// MOBILE MENU
// ============================================
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });

    mobileLinks.forEach((link, i) => {
        link.style.transitionDelay = `${i * 0.1}s`;
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            lenis.start();
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Section tags animation
gsap.utils.toArray('.section-tag').forEach(tag => {
    gsap.to(tag, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: tag,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// About section animations
const aboutTexts = document.querySelectorAll('.about-text');
const statItems = document.querySelectorAll('.stat-item');
const visualCard = document.querySelector('.visual-card');

gsap.to(aboutTexts, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

gsap.to(statItems, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    }
});

if (visualCard) {
    gsap.to(visualCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: visualCard,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 80%',
    onEnter: () => {
        if (!countersStarted) {
            countersStarted = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                gsap.to(num, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'power2.out'
                });
            });
        }
    }
});

// Service cards animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, i) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Work items animation
const workItems = document.querySelectorAll('.work-item');
const workSubtitle = document.querySelector('.work-subtitle');
const workCta = document.querySelector('.work-cta');

workItems.forEach((item, i) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

if (workSubtitle) {
    gsap.to(workSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: workSubtitle,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

if (workCta) {
    gsap.to(workCta, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: workCta,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Reviews horizontal scroll animation
const reviewsSection = document.querySelector('.reviews-section');
const reviewsTrack = document.querySelector('.reviews-track');
const reviewsProgressBar = document.querySelector('.reviews-progress-bar');

if (reviewsSection && reviewsTrack) {
    // Calculate how far to scroll (total width minus one card width to show last card fully)
    const getScrollAmount = () => {
        return -(reviewsTrack.scrollWidth - window.innerWidth + 60);
    };

    gsap.to(reviewsTrack, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
            trigger: reviewsSection,
            start: 'top 20%',  // Start when section is near top of viewport
            end: '+=2000',     // Scroll for 2000px - slower, more time to read
            scrub: 1.5,        // Smoother scrub
            onUpdate: (self) => {
                // Update progress bar
                if (reviewsProgressBar) {
                    reviewsProgressBar.style.width = `${self.progress * 100}%`;
                }
            }
        }
    });
}

// Contact section animations
const contactSubtitle = document.querySelector('.contact-subtitle');
const contactLinks = document.querySelectorAll('.contact-link');

if (contactSubtitle) {
    gsap.to(contactSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: contactSubtitle,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

contactLinks.forEach((link, i) => {
    gsap.to(link, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: link,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ============================================
// FLIP CARDS
// ============================================
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// ============================================
// IMAGE REVEAL SECTION
// ============================================
const revealSection = document.querySelector('.image-reveal-section');
const revealImage = document.querySelector('.reveal-image');
const revealImageWrapper = document.querySelector('.reveal-image-wrapper');
const revealContent = document.querySelector('.reveal-content');

if (revealSection && revealImage && revealContent && revealImageWrapper) {
    // Create timeline for the reveal animation
    const revealTl = gsap.timeline({
        scrollTrigger: {
            trigger: revealSection,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    revealTl
        .fromTo(revealImageWrapper, 
            { width: '100%' },
            { width: '50%', duration: 1, ease: 'power2.inOut' }
        )
        .fromTo(revealImage,
            { scale: 1.1 },
            { scale: 1, duration: 1, ease: 'power2.out' },
            0
        )
        .fromTo(revealContent,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
            0.3
        );
}

// ============================================
// PARALLAX EFFECTS
// ============================================
gsap.utils.toArray('.flip-card-front img').forEach(img => {
    gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// ============================================
// SMOOTH SCROLL TO ANCHORS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.2
            });
        }
    });
});

// ============================================
// PAGE VISIBILITY
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

console.log('Corbo Digital - Website Loaded Successfully');
