document.addEventListener('DOMContentLoaded', function() {
    
    // Function to check if the screen is likely mobile/tablet (matches CSS media query <= 900px)
    function isMobileView() {
        return window.matchMedia('(max-width: 900px)').matches; 
    }

    // ==========================================================
    // 1. NAVIGATION LOGIC (Mobile Menu & Dropdowns)
    // ==========================================================
    
    // 1.1. Mobile Navigation Toggle Logic (Main Menu Bar)
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList'); // This is the <ul> element inside .nav

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle 'is-open' class to show/hide the main navigation menu
            navList.classList.toggle('is-open'); 
            
            // Jab main nav close ho, toh saare open dropdowns ko band kar do
            if (!navList.classList.contains('is-open')) {
                document.querySelectorAll('.has-dropdown').forEach(dd => {
                    dd.classList.remove('dropdown-open');
                    dd.querySelector('.dropdown-menu')?.classList.remove('is-open');
                });
            }
        });
    }

    // 1.2. Dropdown Toggle Logic (Mobile View Only)
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Dropdown sirf tab toggle ho jab hum mobile view mein hon
            if (isMobileView()) {
                
                const parentLi = link.closest('.has-dropdown');
                const dropdownMenu = parentLi.querySelector('.dropdown-menu');

                if (parentLi && dropdownMenu) {
                    
                    // CRITICAL FIX: Default link action ko rokenge taaki page redirect na ho
                    event.preventDefault(); 
                    
                    // Agar dropdown pehle se khula hai toh band kar do
                    if (parentLi.classList.contains('dropdown-open')) {
                         parentLi.classList.remove('dropdown-open');
                         dropdownMenu.classList.remove('is-open');
                    } else {
                        // Agar band hai toh baaqi saare dropdowns band karke isko kholo
                        document.querySelectorAll('.has-dropdown').forEach(dd => {
                            if (dd !== parentLi) {
                                dd.classList.remove('dropdown-open');
                                dd.querySelector('.dropdown-menu')?.classList.remove('is-open');
                            }
                        });
                        
                        parentLi.classList.add('dropdown-open');
                        dropdownMenu.classList.add('is-open');
                    }
                }
            }
            // Agar desktop view hai toh link ko normally follow hone do (CSS hover se khulega)
        });
    });

    // ==========================================================
    // 2. OTHER FUNCTIONALITY (Countdown & Tabs)
    // ==========================================================

    // 2.1. Umrah Group Countdown Timer
    const umrahDepartureDate = new Date("December 20, 2025 09:00:00").getTime(); 

    function startUmrahCountdown() {
        const timerElement = document.getElementById('umrahCountdownTimer');
        if (!timerElement) return;

        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = umrahDepartureDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(updateCountdown);
                timerElement.innerHTML = "Group Departed! Contact us for the Next Group.";
                return;
            }

            timerElement.innerHTML = 
                `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
        }, 1000);
    }

    // 2.2. Tab Functionality (For search or package filtering)
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to the clicked button and its corresponding content
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            document.getElementById(target)?.classList.add('active');
        });
    });

    // Ensure the countdown function runs when the page loads
    startUmrahCountdown();
});