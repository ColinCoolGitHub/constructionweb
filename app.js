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
const impactScrollHint = document.querySelector('.impact-scroll-hint');

if (impactSection && impactPanel && impactWords.length) {
    // Get wipe reveal element
    const wipeReveal = document.querySelector('.wipe-reveal');
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    // Always make impact words visible with animation
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

    // Only apply wipe animation on desktop (not mobile)
    if (!isMobile) {
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
    } else {
        // On mobile, make sure impact words and about section are visible without animation
        gsap.set(impactWords, { opacity: 1, y: 0 });
        if (wipeReveal) {
            gsap.set(wipeReveal, { x: 0, opacity: 1 });
        }
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

// Reviews Section - 3-Card Carousel with Click Navigation
const reviewsSection = document.querySelector('.reviews-section');
const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');

if (reviewsSection && reviewsTrack && reviewCards.length > 0) {

    let currentIndex = 0;
    let animTimeout = null;

    // Create navigation dots
    const dotsContainer = document.querySelector('.reviews-dots');
    if (dotsContainer) {
        reviewCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'reviews-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to review ${index + 1}`);
            dot.addEventListener('click', () => goToReview(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Update dots
    const updateDots = () => {
        const dots = document.querySelectorAll('.reviews-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    // Go to specific review
    const goToReview = (index) => {
        if (index === currentIndex) return;
        const direction = index > currentIndex ? 'next' : 'prev';
        currentIndex = index;
        reviewsTrack.classList.remove('carousel-anim-left', 'carousel-anim-right');
        reviewsTrack.classList.add(direction === 'next' ? 'carousel-anim-right' : 'carousel-anim-left');
        updateCarousel();
        updateDots();
        clearTimeout(animTimeout);
        animTimeout = setTimeout(() => {
            reviewsTrack.classList.remove('carousel-anim-left', 'carousel-anim-right');
        }, 700);
    };

    // Rotate to specific review with direction class
    const rotateCarousel = (direction) => {
        // Remove any previous direction class
        reviewsTrack.classList.remove('carousel-anim-left', 'carousel-anim-right');
        if (direction === 'next') {
            reviewsTrack.classList.add('carousel-anim-right');
            currentIndex = (currentIndex + 1) % reviewCards.length;
        } else {
            reviewsTrack.classList.add('carousel-anim-left');
            currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        }
        updateCarousel();
        updateDots();
        // Remove the direction class after animation duration
        clearTimeout(animTimeout);
        animTimeout = setTimeout(() => {
            reviewsTrack.classList.remove('carousel-anim-left', 'carousel-anim-right');
        }, 700); // match CSS transition duration
    };

    // Update carousel display
    const updateCarousel = () => {
        reviewCards.forEach((card, index) => {
            card.classList.remove('left', 'center', 'right', 'hidden');
            
            let position = (index - currentIndex + reviewCards.length) % reviewCards.length;
            
            if (position === 0) {
                card.classList.add('center');
            } else if (position === 1) {
                card.classList.add('right');
            } else if (position === reviewCards.length - 1) {
                card.classList.add('left');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    // Add click handlers to cards
    reviewCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Calculate which direction to rotate
            let position = (index - currentIndex + reviewCards.length) % reviewCards.length;
            
            if (position === 1) {
                // Right card clicked - rotate next
                rotateCarousel('next');
            } else if (position === reviewCards.length - 1) {
                // Left card clicked - rotate previous
                rotateCarousel('prev');
            }
            // Center card does nothing
        });
    });

    // Initial setup
    updateCarousel();

    // Navigation buttons for mobile
    const prevBtn = document.querySelector('.reviews-prev');
    const nextBtn = document.querySelector('.reviews-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => rotateCarousel('prev'));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => rotateCarousel('next'));
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    reviewsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            rotateCarousel('next');
        } else if (touchEndX - touchStartX > swipeThreshold) {
            rotateCarousel('prev');
        }
    }, { passive: true });
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
    // Create timeline for the reveal animation on all devices
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

// ============================================
// LANGUAGE SWITCHING (FR/EN)
// ============================================
const translations = {
fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': '\u00C0 propos',
    'nav.services': 'Services',
    'nav.work': 'R\u00E9alisations',
    'nav.contact': 'Contact',
        
    // Hero
    'hero.tag': 'Agence de Marketing Num\u00E9rique',
    'hero.title1': 'Contenu',
    'hero.title2': 'Authentique.',
    'hero.title3': 'R\u00E9sultats Concrets.',
    'hero.subtitle': 'Nous aidons les entreprises \u00E0 b\u00E2tir une pr\u00E9sence en ligne forte, coh\u00E9rente et performante gr\u00E2ce \u00E0 du contenu strat\u00E9gique.',
    'hero.cta1': 'Nos Services',
    'hero.cta2': 'Nous Contacter',
    'hero.scroll': 'D\u00E9filer',
        
    // Impact
    'impact.line1': 'Strat\u00E9gie.',
    'impact.line2': 'Cr\u00E9ativit\u00E9.',
    'impact.line3b': 'R\u00E9sultats.',
        
    // About
    'about.tag': '\u00C0 Propos',
    'about.title': 'Qui Sommes-Nous',
    'about.text1': 'Corbo Digital est une agence de marketing num\u00E9rique sp\u00E9cialis\u00E9e en cr\u00E9ation de contenu.',
    'about.text2': 'Nous offrons des services complets, de la cr\u00E9ation de sites web \u00E0 la gestion des m\u00E9dias sociaux, afin d\'aider les entreprises \u00E0 b\u00E2tir une pr\u00E9sence en ligne forte, coh\u00E9rente et performante. Notre approche est ax\u00E9e sur du contenu authentique, strat\u00E9gique et orient\u00E9e sur les r\u00E9sultats.',
    'about.stat1': 'Clients Accompagn\u00E9s',
    'about.stat2': 'Projets R\u00E9alis\u00E9s',
    'about.stat3': 'Engagement',
        
    // Services
    'services.tag': 'Ce Que Nous Faisons',
    'services.title': 'Des services qui transforment votre vision',
    'services.s1.title': 'Pr\u00E9sence',
    'services.s1.desc': '\u00CAtre visible au bon endroit, au bon moment.',
        'services.s1.f1': 'Cr\u00E9ation de sites web orient\u00E9s vers les conversions',
        'services.s1.f2': 'Optimisation SEO locale (Google & Maps)',
        'services.s1.f3': 'Cr\u00E9ation et gestion de profils Google Business',
        'services.s1.f4': 'Cr\u00E9ation de contenu',
        'services.s1.f5': 'Pr\u00E9sence coh\u00E9rente sur les r\u00E9seaux sociaux',
        'services.s2.title': 'Positionnement',
        'services.s2.desc': 'Une base solide avant d\'investir en publicit\u00E9.',
        'services.s2.f1': 'Positionnement clair et cr\u00E9dible pour entrepreneurs',
        'services.s2.f2': 'Image de marque adapt\u00E9e au secteur',
        'services.s2.f3': 'Messages simples qui inspirent confiance',
        'services.s2.f4': 'Structure marketing pens\u00E9e pour convertir',
        'services.s2.f5': 'Optimisation pour le march\u00E9 local',
        'services.s3.title': 'Croissance',
        'services.s3.desc': 'Plus de demandes, sans surcharger l\'op\u00E9rationnel.',
        'services.s3.f1': 'G\u00E9n\u00E9ration de leads qualifi\u00E9s',
        'services.s3.f2': 'Campagnes publicitaires cibl\u00E9es (Meta, TikTok & Google)',
        'services.s3.f3': 'Suivi des performances et optimisation continue',
        'services.s3.f4': 'Automatisation des demandes entrantes',
        'services.s3.f5': 'Strat\u00E9gies d\'embauche adapt\u00E9es',
        
        // Reveal Section
        'reveal.tag': 'Notre Approche',
        'reveal.title': 'Contenu Authentique.<br>R\u00E9sultats Mesurables.',
        'reveal.text': 'Notre \u00E9quipe combine strat\u00E9gie marketing et cr\u00E9ativit\u00E9 pour cr\u00E9er du contenu qui repr\u00E9sente vraiment votre entreprise. De la premi\u00E8re id\u00E9e \u00E0 la conversion, nous sommes l\u00E0 pour maximiser votre pr\u00E9sence en ligne.',
        'reveal.cta': 'D\u00E9marrer Votre Projet',
        
        // Work Section
        'work.tag': 'Nos R\u00E9alisations',
        'work.title': 'Projets S\u00E9lectionn\u00E9s',
        'work.subtitle': 'Cliquez sur un projet pour en d\u00E9couvrir plus',
        'work.cta': 'D\u00E9marrer Votre Projet',
        'work.viewProject': 'Voir le Projet',
        'work.duration': 'Dur\u00E9e',
        'work.services': 'Services',
        'work.p1.cat': 'Commercial',
        'work.p1.title': 'Complexe Tour Moderne',
        'work.p1.desc': 'Documentation num\u00E9rique compl\u00E8te d\'un d\u00E9veloppement commercial de 20 \u00E9tages au centre-ville de Montr\u00E9al. Comprend des images par drone, time-lapse de construction et visualisation 3D.',
        'work.p1.dur': '18 mois',
        'work.p2.cat': 'R\u00E9sidentiel',
        'work.p2.title': 'R\u00E9sidence de Luxe',
        'work.p2.desc': 'Pr\u00E9sentation cin\u00E9matographique d\'une maison sur mesure de 4,5M$ \u00E0 Tremblant. Documentation compl\u00E8te du design int\u00E9rieur et photographie lifestyle.',
        'work.p2.dur': '12 mois',
        'work.p3.cat': 'Mixte',
        'work.p3.title': 'D\u00E9veloppement Urbain',
        'work.p3.desc': 'R\u00E9sidentiel multi-unit\u00E9s avec commerce au rez-de-chauss\u00E9e. Documentation compl\u00E8te incluant visites virtuelles pour le marketing pr\u00E9-vente.',
        'work.p3.dur': '24 mois',
        'work.p4.cat': 'R\u00E9sidentiel',
        'work.p4.title': 'Villa Contemporaine',
        'work.p4.desc': 'Chef-d\'\u0153uvre architectural moderne avec design durable. Pr\u00E9-visualisation 3D et couverture drone compl\u00E8te.',
        'work.p4.dur': '14 mois',
        
        // Reviews
        'reviews.tag': 'T\u00E9moignages',
        'reviews.title': 'Ce Que Disent Nos Clients',
        
        // Contact
        'contact.tag': 'Nous Contacter',
        'contact.title': 'Cr\u00E9ons quelque chose d\'incroyable ensemble',
        'contact.subtitle': 'Pr\u00EAt \u00E0 donner vie \u00E0 vos projets de construction gr\u00E2ce \u00E0 du contenu num\u00E9rique \u00E9poustouflant?',
        'contact.email': 'Courriel',
        'contact.phone': 'T\u00E9l\u00E9phone',
        'contact.location': 'Emplacement',
        'contact.city': 'Montr\u00E9al, QC',
        'contact.cta': 'D\u00E9marrer un Projet',
        
        // Footer
        'footer.copyright': '\u00A9 2025 Corbo Digital \u2014 Tous droits r\u00E9serv\u00E9s.'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.work': 'Work',
        'nav.contact': 'Contact',
        
        // Hero
        'hero.tag': 'Digital Marketing Agency',
        'hero.title1': 'Authentic',
        'hero.title2': 'Content.',
        'hero.title3': 'Real Results.',
        'hero.subtitle': 'We help businesses build a strong, consistent and high-performing online presence through strategic content.',
        'hero.cta1': 'Our Services',
        'hero.cta2': 'Get in Touch',
        'hero.scroll': 'Scroll',
        
        // Impact
        'impact.line1': 'Strategy.',
        'impact.line2': 'Creativity.',
        'impact.line3b': 'Results.',
        
        // About
        'about.tag': 'About Us',
        'about.title': 'Who We Are',
        'about.text1': 'Corbo Digital is a digital marketing agency specializing in content creation.',
        'about.text2': 'We offer comprehensive services, from website creation to social media management, to help businesses build a strong, consistent and high-performing online presence. Our approach focuses on authentic, strategic and results-oriented content.',
        'about.stat1': 'Clients Served',
        'about.stat2': 'Projects Completed',
        'about.stat3': 'Engagement',
        
        // Services
        'services.tag': 'What We Do',
        'services.title': 'Services that transform your vision',
        'services.s1.title': 'Presence',
        'services.s1.desc': 'Be visible in the right place, at the right time.',
        'services.s1.f1': 'Conversion-focused website creation',
        'services.s1.f2': 'Local SEO optimization (Google & Maps)',
        'services.s1.f3': 'Google Business profile creation & management',
        'services.s1.f4': 'Content creation',
        'services.s1.f5': 'Consistent social media presence',
        'services.s2.title': 'Positioning',
        'services.s2.desc': 'A solid foundation before investing in advertising.',
        'services.s2.f1': 'Clear and credible positioning for entrepreneurs',
        'services.s2.f2': 'Brand image adapted to the sector',
        'services.s2.f3': 'Simple messages that inspire trust',
        'services.s2.f4': 'Marketing structure designed to convert',
        'services.s2.f5': 'Optimization for the local market',
        'services.s3.title': 'Growth',
        'services.s3.desc': 'More leads, without overloading operations.',
        'services.s3.f1': 'Qualified lead generation',
        'services.s3.f2': 'Targeted advertising campaigns (Meta, TikTok & Google)',
        'services.s3.f3': 'Performance tracking and continuous optimization',
        'services.s3.f4': 'Automation of incoming requests',
        'services.s3.f5': 'Adapted hiring strategies',
        
        // Reveal Section
        'reveal.tag': 'Featured',
        'reveal.tag': 'Our Approach',
        'reveal.title': 'Authentic Content.<br>Measurable Results.',
        'reveal.text': 'Our team combines marketing strategy and creativity to create content that truly represents your business. From the first idea to conversion, we\'re here to maximize your online presence.',
        'reveal.cta': 'Start Your Project',
        
        // Work Section
        'work.tag': 'Our Work',
        'work.title': 'Selected Projects',
        'work.subtitle': 'Click on a project to discover more',
        'work.cta': 'Start Your Project',
        'work.viewProject': 'View Project',
        'work.duration': 'Duration',
        'work.services': 'Services',
        'work.p1.cat': 'Commercial',
        'work.p1.title': 'Modern Tower Complex',
        'work.p1.desc': 'Full digital documentation of a 20-story commercial development in downtown Montreal. Includes drone footage, time-lapse construction, and 3D visualization.',
        'work.p1.dur': '18 months',
        'work.p2.cat': 'Residential',
        'work.p2.title': 'Luxury Residence',
        'work.p2.desc': 'Cinematic showcase of a custom $4.5M home construction in Tremblant. Complete with interior design documentation and lifestyle photography.',
        'work.p2.dur': '12 months',
        'work.p3.cat': 'Mixed-Use',
        'work.p3.title': 'Urban Development',
        'work.p3.desc': 'Multi-unit residential with ground-floor retail space. Full documentation including virtual tours for pre-sales marketing.',
        'work.p3.dur': '24 months',
        'work.p4.cat': 'Residential',
        'work.p4.title': 'Contemporary Villa',
        'work.p4.desc': 'Modern architectural masterpiece featuring sustainable design. 3D pre-visualization and complete drone coverage package.',
        'work.p4.dur': '14 months',
        
        // Reviews
        'reviews.tag': 'Testimonials',
        'reviews.title': 'What Our Clients Say',
        
        // Contact
        'contact.tag': 'Get in Touch',
        'contact.title': 'Let\'s create something amazing together',
        'contact.subtitle': 'Ready to bring your construction projects to life through stunning digital content?',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.city': 'Montreal, QC',
        'contact.cta': 'Start a Project',
        
        // Footer
        'footer.copyright': '© 2025 Corbo Digital — All rights reserved.'
    }
};

// Language state
let currentLang = localStorage.getItem('preferred-lang') || 'fr';

// Initialize language on page load
function initLanguage() {
    setLanguage(currentLang);
    updateLangButtons();
}

// Set language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);
    document.documentElement.lang = lang;
    
    // Update page title
    document.title = lang === 'fr' 
        ? 'Corbo Digital | Agence de Marketing Num\u00E9rique'
        : 'Corbo Digital | Digital Marketing Agency';
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    updateLangButtons();
}

// Update active state of language buttons
function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', btnLang === currentLang);
    });
}

// Add event listeners to language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang !== currentLang) {
            setLanguage(lang);
        }
    });
});

// Initialize language when DOM is ready
document.addEventListener('DOMContentLoaded', initLanguage);

// Also call immediately in case DOM is already loaded
if (document.readyState !== 'loading') {
    initLanguage();
}

console.log('Corbo Digital - Website Loaded Successfully');
