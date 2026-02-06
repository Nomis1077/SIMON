// script.js - External JavaScript for Simon Mumo's Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Form Validation for Contact Page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.style.display = 'none';
            });
            
            // Validate name
            const name = document.getElementById('name').value;
            if (name.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validate subject
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            const message = document.getElementById('message').value;
            if (message.trim() === '') {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            // If valid, show success message and reset form
            if (isValid) {
                alert('Thank you for your message, Simon will get back to you soon!');
                contactForm.reset();
                
                // In a real application, you would send the form data to a server here
                // Example: 
                // const formData = new FormData(contactForm);
                // fetch('/contact', { method: 'POST', body: formData })
                //   .then(response => response.json())
                //   .then(data => console.log(data))
                //   .catch(error => console.error('Error:', error));
            }
        });
    }
    
    // Animate skill bars on skills page
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate skill bars
        function animateSkillBars() {
            skillBars.forEach(bar => {
                if (isInViewport(bar)) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            });
        }
        
        // Animate on scroll
        window.addEventListener('scroll', animateSkillBars);
        // Animate on page load
        setTimeout(animateSkillBars, 500);
    }
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add smooth scrolling for anchor links within the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchor links
            if (href !== '#' && href.startsWith('#') && window.location.pathname.split('/').pop() === currentPage) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Simple typing animation for homepage (optional enhancement)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
    }
});