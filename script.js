/*==================================================
            PORTFOLIO WEBSITE V7
            Premium Edition
==================================================*/

/*==================================================
                    DOM
==================================================*/

const body = document.body;

const loader =
    document.querySelector(".loader-screen");

const progressBar =
    document.querySelector(".progress-bar");

const toastContainer =
    document.getElementById("toastContainer");

const copyEmailButton =
    document.getElementById("copyEmailBtn");

const emailText =
    document.getElementById("emailText");

const navbar =
    document.getElementById("navbar");

const navToggle =
    document.getElementById("navToggle");

const navbarLinks =
    document.getElementById("navbarLinks");

const navLinks =
    document.querySelectorAll(".nav-link");

const backToTopBtn =
    document.getElementById("backToTopBtn");

/*==================================================
                INIT
==================================================*/

/*==================================================
                THEME
==================================================*/

function initTheme() {
    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );
    if (savedTheme) {
        body.dataset.theme =
            savedTheme;
    }
    updateThemeButtonLabel();
}

function updateThemeButtonLabel() {
    const button =
        document.getElementById("themeToggleBtn");
    if (!button) return;
    const icon =
        button.querySelector("i");
    if (!icon) return;
    icon.className =
        body.dataset.theme === "light"
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";
    button.setAttribute(
        "aria-label",
        body.dataset.theme === "light"
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

function toggleTheme() {
    const theme =
        body.dataset.theme === "dark"
            ?
            "light"
            :
            "dark";
    body.dataset.theme = theme;
    localStorage.setItem(
        "portfolio-theme",
        theme
    );
    updateThemeButtonLabel();
    showToast(
        "Theme Changed"
    );
}

function initThemeToggleButton() {
    const button =
        document.getElementById("themeToggleBtn");
    if (!button) return;
    button.addEventListener(
        "click",
        toggleTheme
    );
}

/*==================================================
            NAVBAR / SMOOTH SCROLL
==================================================*/

function initNavigation() {
    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        link => {
            link.addEventListener(
                "click",
                e => {
                    const id =
                        link.getAttribute("href");
                    const target =
                        document.querySelector(id);
                    if (!target) return;
                    e.preventDefault();
                    const offset = 90;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: top,
                        behavior: "smooth"
                    });
                    closeMobileMenu();
                }
            );
        }
    );
}

function initMobileMenu() {
    if (!navToggle || !navbarLinks) return;
    navToggle.addEventListener(
        "click",
        () => {
            const isOpen =
                navbarLinks.classList.toggle("open");
            navToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        }
    );
}

function closeMobileMenu() {
    if (!navbarLinks || !navToggle) return;
    navbarLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
}

function initScrollSpy() {
    const sections =
        document.querySelectorAll("main > section[id]");
    if (!sections.length) return;
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(
                    entry => {
                        if (!entry.isIntersecting) return;
                        const id =
                            entry.target.id;
                        navLinks.forEach(
                            link => {
                                const match =
                                    link.dataset.section === id;
                                if (match) {
                                    link.setAttribute(
                                        "aria-current",
                                        "page"
                                    );
                                }
                                else {
                                    link.removeAttribute(
                                        "aria-current"
                                    );
                                }
                            }
                        );
                    }
                );
            },
            {
                rootMargin: "-45% 0px -50% 0px",
                threshold: 0
            }
        );
    sections.forEach(
        section => observer.observe(section)
    );
}

/*==================================================
                LOADER
==================================================*/

function initLoader() {
    window.addEventListener(
        "load",
        () => {
            setTimeout(
                () => {
                    loader.classList.add(
                        "hide"
                    );
                },
                600
            );
        }
    );
}

/*==================================================
                TOAST
==================================================*/

function showToast(message) {
    const toast =
        document.createElement(
            "div"
        );
    toast.className = "toast";
    toast.textContent =
        message;
    toastContainer.appendChild(
        toast
    );
    setTimeout(
        () => {
            toast.classList.add(
                "hide"
            );
        },
        2200
    );
    setTimeout(
        () => {
            toast.remove();
        },
        2600
    );
}

/*==================================================
                RIPPLE
==================================================*/

function initRipple() {
    const buttons =
        document.querySelectorAll(
            ".btn"
        );
    buttons.forEach(
        button => {
            button.addEventListener(
                "click",
                function (e) {
                    const ripple =
                        document.createElement(
                            "span"
                        );
                    ripple.className =
                        "ripple";
                    const rect =
                        this.getBoundingClientRect();
                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );
                    ripple.style.width =
                        size + "px";
                    ripple.style.height =
                        size + "px";
                    ripple.style.left =
                        e.clientX -
                        rect.left -
                        size / 2 +
                        "px";
                    ripple.style.top =
                        e.clientY -
                        rect.top -
                        size / 2 +
                        "px";
                    this.appendChild(
                        ripple
                    );
                    setTimeout(
                        () => {
                            ripple.remove();
                        },
                        700
                    );
                }
            );
        }
    );
}

/*==================================================
            PROGRESS BAR
==================================================*/

function initProgressBar() {
    const scrollPercentageEl =
        document.getElementById("scrollPercentage");
    window.addEventListener(
        "scroll",
        () => {
            const scroll =
                window.scrollY;
            const height =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;
            const width =
                scroll /
                height *
                100;
            progressBar.style.width =
                width + "%";
            if (scrollPercentageEl) {
                scrollPercentageEl.textContent =
                    Math.min(100, Math.max(0, Math.round(width))) + "%";
            }
        },
        { passive: true }
    );
}

/*==================================================
                TYPEWRITER
==================================================*/

function initTyping() {
    const element =
        document.getElementById(
            "typingText"
        );
    if (!element) return;
    const words = [
        "Front-End Developer",
        "Web Developer",
        "UI-UX Designer",
        "Competitive Programmer",
        "Full Stack"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    function type() {
        const current =
            words[wordIndex];
        if (!deleting) {
            charIndex++;
        }
        else {
            charIndex--;
        }
        element.textContent =
            current.substring(
                0,
                charIndex
            );
        let speed = 100;
        if (deleting) {
            speed = 45;
        }
        if (
            !deleting &&
            charIndex === current.length
        ) {
            speed = 1600;
            deleting = true;
        }
        if (
            deleting &&
            charIndex === 0
        ) {
            deleting = false;
            wordIndex++;
            wordIndex %=
                words.length;
            speed = 250;
        }
        setTimeout(
            type,
            speed
        );
    }
    type();
}

/*==================================================
                COUNTERS
==================================================*/

function initCounters() {
    const counters =
        document.querySelectorAll(
            ".stat-number"
        );
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(
                    entry => {
                        if (
                            entry.isIntersecting
                        ) {
                            animateCounter(
                                entry.target
                            );
                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: .6
            }
        );
    counters.forEach(
        counter => {
            observer.observe(
                counter
            );
        }
    );
}

function animateCounter(counter, explicitTarget) {
    const target =
        explicitTarget !== undefined
            ? Number(explicitTarget)
            : Number(
                counter.dataset.target
            );
    let current = 0;
    const step =
        Math.max(
            1,
            Math.ceil(target / 80)
        );
    const timer =
        setInterval(
            () => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(
                        timer
                    );
                }
                counter.textContent =
                    current;
            },
            20
        );
}

/*==================================================
            REVEAL ANIMATIONS
==================================================*/

function initRevealAnimations() {
    const elements =
        document.querySelectorAll(
            ".reveal"
        );
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(
                    entry => {
                        if (
                            entry.isIntersecting
                        ) {
                            entry.target
                                .classList
                                .add(
                                    "show"
                                );
                        }
                    }
                );
            },
            {
                threshold: .15
            }
        );
    elements.forEach(
        element => {
            observer.observe(
                element
            );
        }
    );
    // Safety net: guarantee every .reveal element becomes visible
    // even if the IntersectionObserver never fires for it (e.g. an
    // element that starts inside a display:none page).
    setTimeout(
        () => {
            elements.forEach(
                element => {
                    element.classList.add("show");
                }
            );
        },
        1200
    );
}

/*==================================================
            CLICKABLE CONTACT CARDS
==================================================*/

function initClickableCards() {
    const cards =
        document.querySelectorAll(
            ".contact-card[data-href]"
        );
    cards.forEach(
        card => {
            card.addEventListener(
                "click",
                e => {
                    // Don't double-handle clicks that already hit
                    // the Copy button or the Send/Visit/Explore link.
                    if (
                        e.target.closest("a, button")
                    ) return;
                    const href =
                        card.dataset.href;
                    const target =
                        card.dataset.hrefTarget;
                    if (target) {
                        window.open(href, target);
                    }
                    else {
                        window.location.href = href;
                    }
                }
            );
        }
    );
}

/*==================================================
                COPY EMAIL
==================================================*/

function initCopyEmail() {
    if (
        !copyEmailButton ||
        !emailText
    ) return;
    copyEmailButton
        .addEventListener(
            "click",
            async () => {
                try {
                    await navigator
                        .clipboard
                        .writeText(
                            emailText
                                .textContent
                        );
                    showToast(
                        "Email copied successfully!"
                    );
                }
                catch {
                    showToast(
                        "Unable to copy email."
                    );
                }
            }
        );
}

/*==================================================
                PARTICLES
==================================================*/

function initParticles() {
    const container =
        document.querySelector(".particles");
    if (!container) return;
    const particleCount = 28;
    for (let i = 0; i < particleCount; i++) {
        const particle =
            document.createElement("span");
        particle.className = "particle";
        const size =
            Math.random() * 5 + 3;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left =
            Math.random() * 100 + "%";
        particle.style.animationDuration =
            8 + Math.random() * 12 + "s";
        particle.style.animationDelay =
            Math.random() * 8 + "s";
        particle.style.opacity =
            Math.random() * 0.5 + 0.5;
        container.appendChild(
            particle
        );
    }
}

/*==================================================
                CONFETTI (CANVAS)
==================================================*/

function launchConfetti() {
    const canvas =
        document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99998";
    const dpr =
        window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    document.body.appendChild(canvas);
    const ctx =
        canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const pieces =
        Array.from(
            { length: 45 },
            () => ({
                x: Math.random() * window.innerWidth,
                y: -20 - Math.random() * 200,
                size: 5 + Math.random() * 5,
                speedY: 2 + Math.random() * 3,
                speedX: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                color: `hsl(${Math.random() * 360},90%,60%)`
            })
        );
    let frame = 0;
    const maxFrames = 150;
    function draw() {
        frame++;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        pieces.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        });
        if (frame < maxFrames) {
            requestAnimationFrame(draw);
        }
        else {
            canvas.remove();
        }
    }
    requestAnimationFrame(draw);
}

/*==================================================
                KEYBOARD SHORTCUTS
==================================================*/

function initKeyboard() {
    document.addEventListener(
        "keydown",
        e => {
            if (
                e.key === "Escape"
            ) {
                closeMobileMenu();
            }
        }
    );
}

/*==================================================
            WINDOW RESIZE
==================================================*/

function initResize() {
    let timer;
    window.addEventListener(
        "resize",
        () => {
            clearTimeout(timer);
            timer =
                setTimeout(
                    () => {
                        window.dispatchEvent(
                            new Event(
                                "scroll"
                            )
                        );
                    },
                    120
                );
        }
    );
}

/*==================================================
                PERFORMANCE
==================================================*/

function initPerformance() {
    document.querySelectorAll(
        "img"
    ).forEach(
        img => {
            img.loading = "lazy";
            img.decoding = "async";
        }
    );
}

/*==================================================
                FOOTER YEAR
==================================================*/

function initFooterYear() {
    const el =
        document.getElementById("footerYear");
    if (!el) return;
    el.textContent =
        new Date().getFullYear();
}

/*==================================================
                BACK TO TOP
==================================================*/

function initBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
    window.addEventListener(
        "scroll",
        () => {
            backToTopBtn.classList.toggle(
                "visible",
                window.scrollY > 500
            );
        },
        { passive: true }
    );
}

/*==================================================
                EASTER EGG
==================================================*/

function initEasterEgg() {
    const brand =
        document.getElementById("navbarBrand");
    if (!brand) return;
    let clickCount = 0;
    let resetTimer = null;
    brand.addEventListener(
        "click",
        () => {
            clickCount++;
            clearTimeout(resetTimer);
            resetTimer = setTimeout(
                () => { clickCount = 0; },
                2000
            );
            if (clickCount >= 3) {
                clickCount = 0;
                launchConfetti();
                showToast("Thanks for visiting 😊");
            }
        }
    );
}

/*==================================================
                FEEDBACK WIDGET
==================================================*/

// ⚙️ REQUIRED: replace with your own Formspree form ID
// (sign up free at https://formspree.io, create a form, and paste
// its ID here — without it the form has nowhere to send messages).
const FORMSPREE_FORM_ID = "xkjwvqye";

function initFeedbackWidget() {
    const fab =
        document.getElementById("feedbackFab");
    const overlay =
        document.getElementById("feedbackModal");
    const closeBtn =
        document.getElementById("feedbackCloseBtn");
    const modal =
        overlay ? overlay.querySelector(".feedback-modal") : null;
    const form =
        document.getElementById("feedbackForm");
    const stars =
        document.querySelectorAll(".star-btn");
    const ratingValue =
        document.getElementById("feedbackRatingValue");
    const messageField =
        document.getElementById("feedbackMessage");
    const errorEl =
        document.getElementById("feedbackError");
    const submitBtn =
        document.getElementById("feedbackSubmitBtn");

    if (!fab || !overlay || !form) return;

    function openModal() {
        overlay.hidden = false;
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            if (messageField) messageField.focus();
        }, 50);
    }

    function closeModal() {
        overlay.hidden = true;
        document.body.style.overflow = "";
        fab.focus();
    }

    fab.addEventListener("click", openModal);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    overlay.addEventListener(
        "click",
        e => {
            // only close when the backdrop itself was clicked,
            // never when the click originated inside the modal card
            if (e.target === overlay) {
                closeModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        e => {
            if (e.key === "Escape" && !overlay.hidden) {
                closeModal();
            }
        }
    );

    // ---- star rating ----
    function paintStars(upTo, className) {
        stars.forEach(star => {
            const value =
                Number(star.dataset.value);
            star.classList.toggle(className, value <= upTo);
        });
    }

    stars.forEach(star => {
        star.addEventListener(
            "mouseenter",
            () => paintStars(Number(star.dataset.value), "hovered")
        );
        star.addEventListener(
            "click",
            () => {
                const value =
                    Number(star.dataset.value);
                if (ratingValue) ratingValue.value = value;
                paintStars(value, "selected");
                stars.forEach(s => {
                    s.setAttribute(
                        "aria-checked",
                        Number(s.dataset.value) === value ? "true" : "false"
                    );
                });
            }
        );
    });

    const starRatingEl =
        document.getElementById("starRating");
    if (starRatingEl) {
        starRatingEl.addEventListener(
            "mouseleave",
            () => paintStars(0, "hovered")
        );
    }

    // ---- submit ----
    form.addEventListener(
        "submit",
        async e => {
            // Always prevent the browser's default form submission first —
            // this is what was sending people to a blank new page before.
            e.preventDefault();

            if (!messageField || !messageField.value.trim()) {
                if (errorEl) errorEl.hidden = false;
                if (messageField) messageField.focus();
                return;
            }
            if (errorEl) errorEl.hidden = true;

            if (FORMSPREE_FORM_ID === "YOUR_FORM_ID_HERE") {
                showToast("Feedback form isn't connected yet — add a Formspree ID in script.js");
                return;
            }

            const originalHTML =
                submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending…";

            try {
                const response =
                    await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
                        method: "POST",
                        headers: { "Accept": "application/json" },
                        body: new FormData(form)
                    });

                if (response.ok) {
                    modal.innerHTML =
                        '<div class="feedback-success">' +
                        '<i class="fa-solid fa-circle-check"></i>' +
                        '<h3>Thanks for the feedback!</h3>' +
                        '<p>Really appreciate you taking the time.</p>' +
                        '</div>';
                    setTimeout(closeModal, 2200);
                }
                else {
                    showToast("Something went wrong — please try again.");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                }
            }
            catch (err) {
                console.error("Feedback submit error:", err);
                showToast("Something went wrong — please try again.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }
        }
    );
}

/*==================================================
        GITHUB & CODEFORCES LIVE STATS
==================================================*/

const GITHUB_USERNAME = "abdelrahmanOsman2525";
const CODEFORCES_HANDLE = "abdelrahman.osman2525";

async function initLiveStats() {
    const note =
        document.getElementById("liveStatsNote");
    const results =
        await Promise.allSettled([
            fetchGithubStats(),
            fetchCodeforcesStats()
        ]);
    const failed =
        results.some(r => r.status === "rejected");
    if (!note) return;
    if (failed) {
        note.textContent =
            "Some live stats couldn't be loaded right now — refresh to try again.";
    }
    else {
        note.textContent =
            "Updated automatically from GitHub and Codeforces (Codeforces count reflects the regular archive, may not include older acmsguru problems).";
    }
}

async function fetchGithubStats() {
    const ghRepos =
        document.getElementById("ghRepos");
    const ghStars =
        document.getElementById("ghStars");
    try {
        const userRes =
            await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error("github user fetch failed");
        const user =
            await userRes.json();
        if (ghRepos) {
            animateCounter(ghRepos, user.public_repos || 0);
        }
        const reposRes =
            await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error("github repos fetch failed");
        const repos =
            await reposRes.json();
        const totalStars =
            Array.isArray(repos)
                ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
                : 0;
        if (ghStars) {
            animateCounter(ghStars, totalStars);
        }
    }
    catch (err) {
        if (ghRepos) ghRepos.textContent = "—";
        if (ghStars) ghStars.textContent = "—";
        throw err;
    }
}

async function fetchCodeforcesStats() {
    const cfRating =
        document.getElementById("cfRating");
    const cfRankLabel =
        document.getElementById("cfRankLabel");
    const cfSolved =
        document.getElementById("cfSolved");
    const cfSolvedStat =
        document.getElementById("cfSolvedStat");
    try {
        const infoRes =
            await fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`);
        if (!infoRes.ok) throw new Error("codeforces info fetch failed");
        const infoData =
            await infoRes.json();
        const user =
            infoData.result && infoData.result[0];
        if (user && cfRating) {
            animateCounter(cfRating, user.rating || 0);
            updateCFRatingVisual(
                user.rating || 0,
                document.getElementById("cfRatingBarFill"),
                document.getElementById("cfRatingMarker")
            );
        }
        if (user && cfRankLabel) {
            cfRankLabel.textContent =
                user.rank
                    ? `Codeforces (${user.rank})`
                    : "Codeforces Rating";
        }
        const statusRes =
            await fetch(`https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}&from=1&count=100000`);
        if (!statusRes.ok) throw new Error("codeforces status fetch failed");
        const statusData =
            await statusRes.json();
        const submissions =
            statusData.result || [];
        const solvedSet =
            new Set();
        submissions.forEach(sub => {
            if (sub.verdict === "OK" && sub.problem) {
                const key =
                    `${sub.problem.contestId || sub.problem.problemsetName}-${sub.problem.index}-${sub.problem.name}`;
                solvedSet.add(key);
            }
        });
        const solvedCount =
            solvedSet.size;
        if (cfSolved) {
            animateCounter(cfSolved, solvedCount);
        }
        if (cfSolvedStat) {
            cfSolvedStat.dataset.target = solvedCount;
            animateCounter(cfSolvedStat, solvedCount);
        }
    }
    catch (err) {
        console.error("Codeforces stats error:", err);
        if (cfRating) cfRating.textContent = "—";
        if (cfSolved) cfSolved.textContent = "—";
        throw err;
    }
}

/*==================================================
                PROJECT DETAILS MODAL
==================================================*/

const PROJECTS_DATA = [
    {
        title: "TaskFlow — Task Manager",
        icon: "devicon-react-original",
        colorA: "#3b82f6",
        colorB: "#1d4ed8",
        idea: "A full-stack task management app built around boards and drag-and-drop columns, so a team can move work through stages visually instead of digging through a flat list.",
        features: [
            { icon: "fa-solid fa-table-columns", text: "Drag-and-drop kanban boards" },
            { icon: "fa-solid fa-bolt", text: "Real-time updates across sessions" },
            { icon: "fa-solid fa-users", text: "Multi-user task assignment" }
        ],
        challenges: [
            { icon: "fa-solid fa-arrows-rotate", text: "Keeping drag-and-drop state in sync in real time" },
            { icon: "fa-solid fa-database", text: "Designing a schema flexible enough for custom boards" }
        ],
        technologies: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/abdelrahmanOsman2525",
        demo: "https://github.com/abdelrahmanOsman2525"
    },
    {
        title: "Weather Now",
        icon: "fa-solid fa-cloud-sun",
        colorA: "#0ea5e9",
        colorB: "#0369a1",
        idea: "A clean weather dashboard that pulls live forecasts from a public API, built to be fast, readable and useful at a glance rather than cluttered with data.",
        features: [
            { icon: "fa-solid fa-magnifying-glass", text: "City search with autocomplete" },
            { icon: "fa-solid fa-location-crosshairs", text: "One-tap geolocation forecast" },
            { icon: "fa-solid fa-calendar-days", text: "5-day outlook view" }
        ],
        challenges: [
            { icon: "fa-solid fa-gauge-high", text: "Handling API rate limits gracefully" },
            { icon: "fa-solid fa-icons", text: "Mapping weather codes to clear icon states" }
        ],
        technologies: ["JavaScript", "REST API", "CSS3"],
        github: "https://github.com/abdelrahmanOsman2525",
        demo: "https://github.com/abdelrahmanOsman2525"
    },
    {
        title: "Personal Portfolio",
        icon: "devicon-nextjs-plain",
        colorA: "#8b5cf6",
        colorB: "#6d28d9",
        idea: "This very portfolio — a hand-built, animated single-page site focused on performance, accessibility and a clean, consistent UI across light and dark themes.",
        features: [
            { icon: "fa-solid fa-palette", text: "Full light/dark theme support" },
            { icon: "fa-solid fa-compass", text: "Interactive, data-driven timeline section" },
            { icon: "fa-solid fa-gauge", text: "Live GitHub & Codeforces stats" }
        ],
        challenges: [
            { icon: "fa-solid fa-mobile-screen", text: "Getting every section right across breakpoints" },
            { icon: "fa-solid fa-feather", text: "Keeping animations smooth without hurting performance" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/abdelrahmanOsman2525/abdelrahmanOsman2525.github.io",
        demo: "#",
        isCurrentSite: true
    }
];

function initProjectModal() {
    const cards =
        document.querySelectorAll(".project-card[data-project]");
    const overlay =
        document.getElementById("projectModal");
    const closeBtn =
        document.getElementById("projectCloseBtn");
    if (!cards.length || !overlay) return;

    const modal =
        overlay.querySelector(".feedback-modal");
    const thumbEl =
        document.getElementById("projectModalThumb");
    const iconEl =
        document.getElementById("projectModalIcon");
    const titleEl =
        document.getElementById("projectModalTitle");
    const ideaEl =
        document.getElementById("projectModalIdea");
    const featuresEl =
        document.getElementById("projectModalFeatures");
    const challengesEl =
        document.getElementById("projectModalChallenges");
    const techEl =
        document.getElementById("projectModalTech");
    const demoEl =
        document.getElementById("projectModalDemo");
    const githubEl =
        document.getElementById("projectModalGithub");

    let lastFocused = null;

    function listHTML(items) {
        return items
            .map(item => `<li><i class="${item.icon}"></i> ${item.text}</li>`)
            .join("");
    }

    function openModal(project) {
        thumbEl.style.setProperty("--thumb-a", project.colorA);
        thumbEl.style.setProperty("--thumb-b", project.colorB);
        iconEl.className = project.icon;
        titleEl.textContent = project.title;
        ideaEl.textContent = project.idea;
        featuresEl.innerHTML = listHTML(project.features);
        challengesEl.innerHTML = listHTML(project.challenges);
        techEl.innerHTML = project.technologies
            .map(tag => `<span class="details-tag">${tag}</span>`)
            .join("");
        if (project.isCurrentSite) {
            demoEl.removeAttribute("href");
            demoEl.removeAttribute("target");
            demoEl.classList.add("current-site-btn");

            demoEl.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            You're Here`;
        } else {
            demoEl.href = project.demo;
            demoEl.target = "_blank";
            demoEl.classList.remove("current-site-btn");

            demoEl.innerHTML = `
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            Live Demo`;
        }

        githubEl.href = project.github;

        lastFocused = document.activeElement;
        overlay.hidden = false;
        document.body.style.overflow = "hidden";
        setTimeout(() => { closeBtn.focus(); }, 50);
    }

    function closeModal() {
        overlay.hidden = true;
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
    }

    cards.forEach(card => {
        const project =
            PROJECTS_DATA[Number(card.dataset.project)];
        if (!project) return;

        card.addEventListener(
            "click",
            e => {
                // Ignore clicks on the GitHub icon in the hover overlay —
                // that link handles itself (stopPropagation in its own onclick).
                if (e.target.closest(".project-overlay-icon")) return;
                openModal(project);
            }
        );

        card.addEventListener(
            "keydown",
            e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(project);
                }
            }
        );
    });

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener(
        "click",
        e => {
            if (e.target === overlay) closeModal();
        }
    );

    document.addEventListener(
        "keydown",
        e => {
            if (e.key === "Escape" && !overlay.hidden) {
                closeModal();
            }
        }
    );
}

/*==================================================
            CODEFORCES RATING VISUAL
==================================================*/

// Standard Codeforces rank tiers and colors, used to color the
// rating bar and marker regardless of whether the number is the
// static placeholder or the live-fetched value.
const CF_RANK_TIERS = [
    { max: 1199, name: "Newbie", color: "#808080" },
    { max: 1399, name: "Pupil", color: "#008000" },
    { max: 1599, name: "Specialist", color: "#03a89e" },
    { max: 1899, name: "Expert", color: "#0000ff" },
    { max: 2199, name: "Candidate Master", color: "#aa00aa" },
    { max: 2299, name: "Master", color: "#ff8c00" },
    { max: 2399, name: "International Master", color: "#ff8c00" },
    { max: 2599, name: "Grandmaster", color: "#ff0000" },
    { max: 2999, name: "International Grandmaster", color: "#ff0000" },
    { max: Infinity, name: "Legendary Grandmaster", color: "#ff0000", gradient: "linear-gradient(90deg, #000000, #ff0000)" }
];


function initCFRatingVisual() {
    const card =
        document.getElementById("cfRatingCard");
    if (!card) return;

    const numberEl =
        card.querySelector(".live-stat-number");
    const fillEl =
        document.getElementById("cfRatingBarFill");
    const markerEl =
        document.getElementById("cfRatingMarker");

    updateCFRatingVisual(
        Number(numberEl.textContent.replace(/[^\d]/g, "")) || 0,
        fillEl,
        markerEl
    );
}

function updateCFRatingVisual(rating, fillEl, markerEl) {
    if (!fillEl || !markerEl) return;

    const tier =
        CF_RANK_TIERS.find(t => rating < t.max) || CF_RANK_TIERS[CF_RANK_TIERS.length - 1];

    const scaleMax = 3000;
    const percent =
        Math.min(100, Math.max(2, (rating / scaleMax) * 100));

    fillEl.style.width = percent + "%";
    fillEl.style.background = tier.gradient || tier.color; markerEl.style.left = percent + "%";
    markerEl.style.background = tier.color;
}

/*==================================================
                TIMELINE — INTERACTIVE JOURNEY
==================================================*/

const TIMELINE_STAGES = [
    {
        year: "2024",
        title: "Started Programming",
        icon: "fa-solid fa-seedling",
        desc: "The very beginning of my programming journey — learning how to think like a programmer and building a solid foundation.",
        focus: [
            { icon: "devicon-cplusplus-plain", text: "C++ Fundamentals" },
            { icon: "fa-solid fa-book-open", text: "Programming Fundamentals" },
            { icon: "fa-solid fa-puzzle-piece", text: "Problem Solving Basics" }
        ],
        milestones: [
            { icon: "fa-solid fa-keyboard", text: "Wrote my first programs" },
            { icon: "fa-solid fa-circle-check", text: "Solved my first practice problems" }
        ],
        tags: ["C++", "Fundamentals"]
    },
    {
        year: "2025",
        title: "Competitive Programming",
        icon: "fa-solid fa-trophy",
        desc: "Went deeper into algorithms and data structures, practicing consistently on Codeforces to sharpen problem-solving speed.",
        focus: [
            { icon: "fa-solid fa-diagram-project", text: "Algorithms" },
            { icon: "fa-solid fa-sitemap", text: "Data Structures" },
            { icon: "fa-solid fa-ranking-star", text: "Codeforces Practice" }
        ],
        milestones: [
            { icon: "fa-solid fa-calendar-check", text: "Built a steady problem-solving habit" },
            { icon: "fa-solid fa-chart-line", text: "Grew my Codeforces solve count" }
        ],
        tags: ["Algorithms", "Data Structures", "Codeforces"]
    },
    {
        year: "2026",
        title: "Front-End Development",
        icon: "fa-solid fa-laptop-code",
        desc: "Shifted focus to building real interfaces — learning the web fundamentals and putting them to work on real projects.",
        focus: [
            { icon: "devicon-html5-plain", text: "HTML & CSS" },
            { icon: "devicon-javascript-plain", text: "JavaScript" },
            { icon: "fa-solid fa-hammer", text: "Building Web Projects" }
        ],
        milestones: [
            { icon: "fa-solid fa-rocket", text: "Built and shipped this portfolio" },
            { icon: "fa-solid fa-brain", text: "Started combining CP thinking with UI work" }
        ],
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        year: "Future",
        title: "Software Engineer",
        icon: "fa-solid fa-road",
        desc: "The road ahead — going deeper into engineering fundamentals to build serious, real-world software.",
        focus: [
            { icon: "fa-solid fa-microchip", text: "Advanced Algorithms" },
            { icon: "fa-solid fa-server", text: "Backend Development" },
            { icon: "fa-solid fa-network-wired", text: "System Design" }
        ],
        milestones: [
            { icon: "fa-solid fa-cloud-arrow-up", text: "Ship a full-stack application" },
            { icon: "fa-solid fa-arrow-trend-up", text: "Keep leveling up on Codeforces" }
        ],
        tags: ["Backend", "System Design"],
        isFuture: true
    }
];

function initTimelineInteractive() {
    const stageButtons =
        document.querySelectorAll(".stage-btn");
    const detailsPanel =
        document.getElementById("timelineDetails");
    const iconEl =
        document.getElementById("detailsIcon");
    const yearEl =
        document.getElementById("detailsYear");
    const titleEl =
        document.getElementById("detailsTitle");
    const descEl =
        document.getElementById("detailsDesc");
    const focusEl =
        document.getElementById("detailsFocus");
    const milestonesEl =
        document.getElementById("detailsMilestones");
    const tagsEl =
        document.getElementById("detailsTags");
    const counterEl =
        document.getElementById("stageCounter");
    const progressFill =
        document.getElementById("journeyProgressFill");
    const progressText =
        document.getElementById("journeyProgressText");

    if (!stageButtons.length || !detailsPanel) return;

    let currentIndex = 0;
    let fadeTimer = null;

    function itemsHTML(items) {
        return items
            .map(item => `<li><i class="${item.icon}"></i> ${item.text}</li>`)
            .join("");
    }

    function renderStage(index) {
        const stage =
            TIMELINE_STAGES[index];
        if (!stage) return;

        if (iconEl) iconEl.className = stage.icon;
        yearEl.textContent = stage.year;
        titleEl.textContent = stage.title;
        descEl.textContent = stage.desc;

        focusEl.innerHTML = itemsHTML(stage.focus);
        milestonesEl.innerHTML = itemsHTML(stage.milestones);

        tagsEl.innerHTML = stage.tags
            .map(tag => `<span class="details-tag">${tag}</span>`)
            .join("");

        counterEl.textContent =
            String(index + 1).padStart(2, "0") + " / " + String(TIMELINE_STAGES.length).padStart(2, "0");

        if (progressFill) {
            progressFill.style.width =
                ((index + 1) / TIMELINE_STAGES.length * 100) + "%";
        }
        if (progressText) {
            progressText.textContent =
                `Stage ${index + 1} of ${TIMELINE_STAGES.length}`;
        }
    }

    function switchStage(index) {
        if (index === currentIndex && !fadeTimer) return;
        currentIndex = index;

        stageButtons.forEach(btn => {
            const isActive =
                Number(btn.dataset.stage) === index;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        // Cancel any fade already in flight — without this, moving the
        // mouse quickly across stages queued up several delayed
        // switches and felt laggy, since each one waited its own 160ms.
        if (fadeTimer) clearTimeout(fadeTimer);

        detailsPanel.classList.add("is-fading");
        fadeTimer = setTimeout(
            () => {
                renderStage(index);
                detailsPanel.classList.remove("is-fading");
                fadeTimer = null;
            },
            120
        );
    }

    stageButtons.forEach(btn => {
        const index =
            Number(btn.dataset.stage);

        // Desktop: hover previews the stage.
        btn.addEventListener(
            "mouseenter",
            () => {
                if (window.matchMedia("(hover:hover)").matches) {
                    switchStage(index);
                }
            }
        );

        // Works everywhere, including touch/mobile.
        btn.addEventListener(
            "click",
            () => switchStage(index)
        );
    });

    // Default state — first stage filled in and active on load.
    renderStage(0);
}

/*==================================================
                START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {
        initTheme();
        initThemeToggleButton();
        initNavigation();
        initMobileMenu();
        initScrollSpy();
        initLoader();
        initRipple();
        initProgressBar();
        initTyping();
        initCounters();
        initRevealAnimations();
        initCopyEmail();
        initClickableCards();
        initParticles();
        initKeyboard();
        initResize();
        initPerformance();
        initFooterYear();
        initBackToTop();
        initEasterEgg();
        initFeedbackWidget();
        initTimelineInteractive();
        initProjectModal();
        initCFRatingVisual();
        // Coding Stats section is currently static (see comments in
        // index.html) — uncomment once you've added the ids back:
        // initLiveStats();
    }

);

/*==================================================
        CONFETTI AFTER COPYING EMAIL
==================================================*/

if (copyEmailButton) {
    copyEmailButton.addEventListener(
        "click",
        () => {
            launchConfetti();
        }
    );
}

/*==================================================
                END OF FILE
==================================================*/

