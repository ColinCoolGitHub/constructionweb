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

// Reviews Section - 3-Card Carousel with Click Navigation
const reviewsSection = document.querySelector('.reviews-section');
const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');

if (reviewsSection && reviewsTrack && reviewCards.length > 0) {

    let currentIndex = 0;
    let animTimeout = null;

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
        'hero.tag': 'Studio de Production Num\u00E9rique',
        'hero.title1': 'Nous Cr\u00E9ons',
        'hero.title2': 'des Exp\u00E9riences',
        'hero.title3': 'Num\u00E9riques',
        'hero.subtitle': 'L\u00E0 o\u00F9 la construction rencontre l\'innovation num\u00E9rique. Nous transformons vos visions en r\u00E9alit\u00E9s visuelles \u00E9poustouflantes.',
        'hero.cta1': 'Voir Nos R\u00E9alisations',
        'hero.cta2': 'Nous Contacter',
        'hero.scroll': 'D\u00E9filer',
        
        // Impact
        'impact.line1': 'Cr\u00E9er',
        'impact.line2': 'des Histoires',
        'impact.line3a': '\u00C0 Travers',
        'impact.line3b': 'la Construction',
        'impact.line4a': 'les M\u00E9dias',
        'impact.line4b': 'Num\u00E9riques',
        
        // About
        'about.tag': '\u00C0 Propos',
        'about.title': 'Qui Sommes-Nous',
        'about.text1': 'Nous sommes un studio cr\u00E9atif qui fait le pont entre la construction physique et la narration num\u00E9rique.',
        'about.text2': 'Des maisons individuelles aux d\u00E9veloppements multi-unit\u00E9s, nous collaborons avec les constructeurs et promoteurs pour mettre en valeur leurs projets avec des visuels modernes et cin\u00E9matographiques. Chaque image que nous capturons raconte l\'histoire du savoir-faire, du d\u00E9vouement et de l\'innovation.',
        'about.stat1': 'Ann\u00E9es d\'Exp\u00E9rience',
        'about.stat2': 'Projets R\u00E9alis\u00E9s',
        'about.stat3': 'Clients Satisfaits',
        
        // Services
        'services.tag': 'Ce Que Nous Faisons',
        'services.title': 'Des services qui transforment votre vision',
        'services.s1.title': 'Production Num\u00E9rique',
        'services.s1.desc': 'Production vid\u00E9o de haute qualit\u00E9 mettant en valeur les projets de construction du concept \u00E0 la r\u00E9alisation.',
        'services.s1.f1': 'Films de Projets Cin\u00E9matographiques',
        'services.s1.f2': 'Couverture A\u00E9rienne par Drone',
        'services.s1.f3': 'Documentation Time-lapse',
        'services.s2.title': 'Visualisation 3D',
        'services.s2.desc': 'Rendus 3D photor\u00E9alistes et visites virtuelles donnant vie aux plans architecturaux.',
        'services.s2.f1': 'Rendus Architecturaux',
        'services.s2.f2': 'Visites Virtuelles',
        'services.s2.f3': 'Exp\u00E9riences Interactives',
        'services.s3.title': 'Web & Digital',
        'services.s3.desc': 'Sites web personnalis\u00E9s et plateformes num\u00E9riques con\u00E7us pour mettre en valeur votre portfolio.',
        'services.s3.f1': 'Sites Portfolio',
        'services.s3.f2': 'Galeries Interactives',
        'services.s3.f3': 'Marketing Digital',
        'services.s4.title': 'Photographie',
        'services.s4.desc': 'Photographie professionnelle capturant chaque d\u00E9tail de vos projets de construction.',
        'services.s4.f1': 'Photographie Architecturale',
        'services.s4.f2': 'Documentation de Progression',
        'services.s4.f3': 'Photographie A\u00E9rienne',
        
        // Reveal Section
        'reveal.tag': '\u00C0 la Une',
        'reveal.title': 'Chaque Image<br>Raconte une Histoire',
        'reveal.text': 'Notre \u00E9quipe combine expertise technique et vision artistique pour cr\u00E9er du contenu qui repr\u00E9sente vraiment votre travail. De la premi\u00E8re fondation \u00E0 la visite finale, nous sommes l\u00E0 pour capturer chaque \u00E9tape importante.',
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
        'hero.tag': 'Digital Production Studio',
        'hero.title1': 'We Build',
        'hero.title2': 'Digital',
        'hero.title3': 'Experiences',
        'hero.subtitle': 'Where construction meets digital innovation. We transform visions into stunning visual realities.',
        'hero.cta1': 'View Our Work',
        'hero.cta2': 'Get in Touch',
        'hero.scroll': 'Scroll',
        
        // Impact
        'impact.line1': 'Crafting',
        'impact.line2': 'Stories',
        'impact.line3a': 'Through',
        'impact.line3b': 'Construction',
        'impact.line4a': 'Digital',
        'impact.line4b': 'Media',
        
        // About
        'about.tag': 'About Us',
        'about.title': 'Who We Are',
        'about.text1': 'We are a creative studio that bridges the gap between physical construction and digital storytelling.',
        'about.text2': 'From ground-up homes to multi-unit developments, we collaborate with builders and developers to showcase their projects with modern, cinematic visuals. Every frame we capture tells the story of craftsmanship, dedication, and innovation.',
        'about.stat1': 'Years Experience',
        'about.stat2': 'Projects Completed',
        'about.stat3': 'Client Satisfaction',
        
        // Services
        'services.tag': 'What We Do',
        'services.title': 'Services that transform your vision',
        'services.s1.title': 'Digital Production',
        'services.s1.desc': 'High-quality video production showcasing construction projects from concept to completion.',
        'services.s1.f1': 'Cinematic Project Films',
        'services.s1.f2': 'Drone Aerial Coverage',
        'services.s1.f3': 'Time-lapse Documentation',
        'services.s2.title': '3D Visualization',
        'services.s2.desc': 'Photorealistic 3D renders and virtual tours bringing architectural plans to life.',
        'services.s2.f1': 'Architectural Renders',
        'services.s2.f2': 'Virtual Walkthroughs',
        'services.s2.f3': 'Interactive Experiences',
        'services.s3.title': 'Web & Digital',
        'services.s3.desc': 'Custom websites and digital platforms designed to showcase your portfolio.',
        'services.s3.f1': 'Portfolio Websites',
        'services.s3.f2': 'Interactive Galleries',
        'services.s3.f3': 'Digital Marketing',
        'services.s4.title': 'Photography',
        'services.s4.desc': 'Professional photography capturing every detail of your construction projects.',
        'services.s4.f1': 'Architectural Photography',
        'services.s4.f2': 'Progress Documentation',
        'services.s4.f3': 'Aerial Photography',
        
        // Reveal Section
        'reveal.tag': 'Featured',
        'reveal.title': 'Every Frame<br>Tells a Story',
        'reveal.text': 'Our team combines technical expertise with artistic vision to create content that truly represents your work. From the first foundation pour to the final walkthrough, we\'re there to capture every milestone.',
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
        ? 'Corbo Digital | La Construction Rencontre l\'Innovation'
        : 'Corbo Digital | Construction Meets Innovation';
    
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
