document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            main.style.paddingTop = '17.5rem';
        } else {
            main.style.paddingTop = '4rem';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggleButton = item.querySelector('.toggle-symbol');
        toggleButton.addEventListener('click', function() {
            const openItem = document.querySelector('.faq-item.open');
            if (openItem && openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.toggle-symbol').textContent = '+';
            }
            item.classList.toggle('open');
            const symbol = item.classList.contains('open') ? '-' : '+';
            item.querySelector('.toggle-symbol').textContent = symbol;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const validatePassword = document.getElementById('validate-password');
    const imageContainer = document.querySelector('.image-container img');

    form.addEventListener('submit', function(event) {
        let isValid = true;
        clearErrors();

        if (!validateNotEmpty(firstName, '*First name is required')) isValid = false;
        if (!validateNotEmpty(lastName, '*Last name is required')) isValid = false;
        if (!validateEmail(email, '*Invalid email format')) isValid = false;
        if (!validatePasswordLength(password, '*Password must be at least 10 characters')) isValid = false;
        if (!validatePasswordNumber(password, '*Password must contain at least one number')) isValid = false;
        if (!validatePasswordMatch(password, validatePassword, '*Passwords do not match')) isValid = false;

        if (!isValid) {
            event.preventDefault();
            adjustImageHeight();
        }
    });

    function validateNotEmpty(input, errorMessage) {
        if (input.value.trim() === '') {
            showError(input, errorMessage);
            return false;
        }
        return true;
    }

    function validateEmail(input, errorMessage) {
        if (input.value.indexOf('@') === -1 || input.value.indexOf('.') === -1) {
            showError(input, errorMessage);
            return false;
        }
        return true;
    }

    function validatePasswordLength(input, errorMessage) {
        if (input.value.length < 10) {
            showError(input, errorMessage);
            return false;
        }
        return true;
    }

    function validatePasswordNumber(input, errorMessage) {
        if (!/\d/.test(input.value)) {
            showError(input, errorMessage);
            return false;
        }
        return true;
    }

    function validatePasswordMatch(input1, input2, errorMessage) {
        if (input1.value !== input2.value) {
            showError(input2, errorMessage);
            return false;
        }
        return true;
    }

    function showError(input, message) {
        const error = document.createElement('small');
        error.classList.add('error-message');
        error.style.color = 'red';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        adjustImageHeight();
    }

    function adjustImageHeight() {
        const formContainer = document.querySelector('.form-container');
        const formHeight = formContainer.offsetHeight;
        imageContainer.style.height = `${formHeight}px`;
    }

    adjustImageHeight();
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    const updateSlides = () => {
        slides.forEach(slide => {
            slide.style.transform = 'scale(0.8)';
            slide.style.opacity = '0.5';
        });

        const currentSlide = track.querySelector('.current-slide');
        currentSlide.style.transform = 'scale(1)';
        currentSlide.style.opacity = '1';
    };

    const moveToSlide = (currentSlide, targetSlide) => {
        const slideIndex = slides.indexOf(targetSlide);
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        updateSlides();
    };

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(currentSlide, prevSlide);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, nextSlide);
    });

    updateSlides();
});


document.addEventListener('DOMContentLoaded', function() {
    const utbkButton = document.querySelector('#utbk-button');
    const internationalButton = document.querySelector('#international-button');
    const highschoolButton = document.querySelector('#highschool-button');
    const middleschoolButton = document.querySelector('#middleschool-button');
    const elementaryschoolButton = document.querySelector('#elementaryschool-button');
    const utbkCourses = document.querySelectorAll('#utbk-courses .course-card');
    const internationalCourses = document.querySelectorAll('#international-courses .course-card');
    const highschoolCourses = document.querySelectorAll('#highschool-courses .course-card');
    const middleschoolCourses = document.querySelectorAll('#middleschool-courses .course-card');
    const elementaryschoolCourses = document.querySelectorAll('#elementaryschool-courses .course-card');
    const utbkHidden = document.querySelector('#utbk-hidden');
    const internationalHidden = document.querySelector('#international-hidden');
    const highschoolHidden = document.querySelector('#highschool-hidden');
    const middleschoolHidden = document.querySelector('#middleschool-hidden');
    const elementaryschoolHidden = document.querySelector('#elementaryschool-hidden');
    
    function toggleVisibility(button, courses, hiddenCourses) {
        let isShown = false;
        
        function updateVisibility() {
            courses.forEach((card, index) => {
                if (window.innerWidth < 768) {
                    if (index > 0) card.style.display = isShown ? 'block' : 'none';
                } else if (window.innerWidth < 1200) {
                    if (index > 1) card.style.display = isShown ? 'block' : 'none';
                } 
            });

            button.textContent = isShown ? 'Show Less' : 'Show More';
        }
    
        button.addEventListener('click', function() {
            isShown = !isShown;
            hiddenCourses.style.display = isShown ? 'flex' : 'none';
            updateVisibility();
        });
    
        window.addEventListener('resize', updateVisibility);
        updateVisibility();
    }

    if (window.innerWidth >= 1200) {
        utbkButton.addEventListener('click', function() {
            if (utbkHidden.classList.contains('hidden')) {
                utbkHidden.classList.remove('hidden');
                utbkHidden.style.display = 'flex';
                utbkButton.textContent = 'Show Less';
            } else {
                utbkHidden.classList.add('hidden');
                utbkHidden.style.display = 'none';
                utbkButton.textContent = 'Show More';
            }
        });

        internationalButton.addEventListener('click', function() {
            if (internationalHidden.classList.contains('hidden')) {
                internationalHidden.classList.remove('hidden');
                internationalHidden.style.display = 'flex';
                internationalButton.textContent = 'Show Less';
            } else {
                internationalHidden.classList.add('hidden');
                internationalHidden.style.display = 'none';
                internationalButton.textContent = 'Show More';
            }
        });

        highschoolButton.addEventListener('click', function() {
            if (highschoolHidden.classList.contains('hidden')) {
                highschoolHidden.classList.remove('hidden');
                highschoolHidden.style.display = 'flex';
                highschoolButton.textContent = 'Show Less';
            } else {
                highschoolHidden.classList.add('hidden');
                highschoolHidden.style.display = 'none';
                highschoolButton.textContent = 'Show More';
            }
        });

        middleschoolButton.addEventListener('click', function() {
            if (middleschoolHidden.classList.contains('hidden')) {
                middleschoolHidden.classList.remove('hidden');
                middleschoolHidden.style.display = 'flex';
                middleschoolButton.textContent = 'Show Less';
            } else {
                middleschoolHidden.classList.add('hidden');
                middleschoolHidden.style.display = 'none';
                middleschoolButton.textContent = 'Show More';
            }
        });

        elementaryschoolButton.addEventListener('click', function() {
            if (elementaryschoolHidden.classList.contains('hidden')) {
                elementaryschoolHidden.classList.remove('hidden');
                elementaryschoolHidden.style.display = 'flex';
                elementaryschoolButton.textContent = 'Show Less';
            } else {
                elementaryschoolHidden.classList.add('hidden');
                elementaryschoolHidden.style.display = 'none';
                elementaryschoolButton.textContent = 'Show More';
            }
        });
    } else {
        toggleVisibility(utbkButton, utbkCourses, utbkHidden);
        toggleVisibility(internationalButton, internationalCourses, internationalHidden);
        toggleVisibility(highschoolButton, highschoolCourses, highschoolHidden);
        toggleVisibility(middleschoolButton, middleschoolCourses, middleschoolHidden);
        toggleVisibility(elementaryschoolButton, elementaryschoolCourses, elementaryschoolHidden);
    }
});

function toggleText(element) {
    const feedback = element.closest('.feedback');
    const fullText = feedback.getAttribute('data-full-text');
    
    if (element.textContent === 'Show more') {
        feedback.textContent = fullText;
        feedback.innerHTML += ' <span class="show-more" onclick="toggleText(this)">Show less</span>';
    } else {
        const truncatedText = fullText.substring(0, 100) + '... ';
        feedback.textContent = truncatedText;
        feedback.innerHTML += '<span class="show-more" onclick="toggleText(this)">Show more</span>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const feedbackElements = document.querySelectorAll('.feedback');
    feedbackElements.forEach(feedback => {
        const fullText = feedback.getAttribute('data-full-text');
        if (fullText.length > 100) {
            const truncatedText = fullText.substring(0, 100) + '... ';
            feedback.textContent = truncatedText;
            feedback.innerHTML += '<span class="show-more" onclick="toggleText(this)">Show more</span>';
        }
    });
});