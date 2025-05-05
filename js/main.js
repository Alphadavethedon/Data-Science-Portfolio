// Main JavaScript for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.cyber-nav ul');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.style.display = isExpanded ? 'none' : 'flex';
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.cyber-nav a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.style.display = 'none';
            navToggle.classList.remove('active');
        });
    });

    // Typing effect for hero subtitle
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const strings = JSON.parse(typingElement.getAttribute('data-strings'));
        let typed = new Typed(typingElement, {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Tab functionality for expertise section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update button states
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Initialize skill charts
    initSkillCharts();

    // Matrix background effect
    initMatrixBackground();

    // Particle network for hero section
    initParticleNetwork();

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Form is valid - you would typically send data to server here
                showNotification('Message sent successfully!', 'success');
                this.reset();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize tooltips
    initTooltips();

    // Initialize tilt effects
    initTiltEffects();
});

// Initialize skill charts
function initSkillCharts() {
    // Cloud Skills Chart
    const cloudCtx = document.getElementById('cloudSkillsChart');
    if (cloudCtx) {
        new Chart(cloudCtx, {
            type: 'radar',
            data: {
                labels: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'CI/CD', 'Serverless'],
                datasets: [{
                    label: 'Cloud Skills',
                    data: [95, 90, 85, 90, 88, 82],
                    backgroundColor: 'rgba(0, 240, 255, 0.2)',
                    borderColor: 'rgba(0, 240, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 240, 255, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        suggestedMin: 50,
                        suggestedMax: 100,
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'white',
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: {
                                family: 'Chakra Petch, sans-serif'
                            }
                        }
                    }
                }
            }
        });
    }

    // AI Skills Chart
    const aiCtx = document.getElementById('aiSkillsChart');
    if (aiCtx) {
        new Chart(aiCtx, {
            type: 'bar',
            data: {
                labels: ['PyTorch', 'TensorFlow', 'MLOps', 'NLP', 'Computer Vision', 'LLMs'],
                datasets: [{
                    label: 'AI/ML Skills',
                    data: [90, 85, 88, 82, 80, 78],
                    backgroundColor: 'rgba(238, 76, 44, 0.7)',
                    borderColor: 'rgba(238, 76, 44, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: {
                                family: 'Chakra Petch, sans-serif'
                            }
                        }
                    }
                }
            }
        });
    }

    // Security Skills Chart
    const securityCtx = document.getElementById('securitySkillsChart');
    if (securityCtx) {
        new Chart(securityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Zero Trust', 'OPA/Gatekeeper', 'SPIFFE/SPIRE', 'Falco', 'Sigstore', 'Confidential Computing'],
                datasets: [{
                    label: 'Security Skills',
                    data: [85, 80, 75, 82, 78, 70],
                    backgroundColor: [
                        'rgba(125, 

                        <head>
  <!-- Add these -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js"></script>
</head>
<body>
  <!-- Your content -->
  <script src="js/main.js"></script> <!-- This should come LAST -->
</body>
// In initMatrixBackground() and initParticleNetwork():
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;