// Contact form validation with accessibility features
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // Validation functions
    function validateName(value) {
        if (!value || value.trim().length === 0) {
            return 'Name is required. Please enter your full name.';
        }
        if (value.trim().length < 2) {
            return 'Name must be at least 2 characters long.';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value || value.trim().length === 0) {
            return 'Email is required. Please enter a valid email address.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address (example: name@domain.com).';
        }
        return '';
    }

    function validatePhone(value) {
        // Phone is optional, but if provided, validate format
        if (!value || value.trim().length === 0) {
            return '';
        }
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 7) {
            return 'Please enter a valid phone number with at least 7 digits.';
        }
        return '';
    }

    function validateMessage(value) {
        if (!value || value.trim().length === 0) {
            return 'Message is required. Please enter your message.';
        }
        if (value.trim().length < 10) {
            return 'Message must be at least 10 characters long.';
        }
        return '';
    }

    // Clear error on input
    function clearError(field) {
        field.classList.remove('has-error');
    }

    function setError(field, errorElement, message) {
        if (message) {
            field.classList.add('has-error');
            errorElement.textContent = message;
            // Announce error to screen readers
            errorElement.setAttribute('role', 'alert');
        } else {
            field.classList.remove('has-error');
            errorElement.textContent = '';
        }
    }

    // Real-time validation on blur
    nameInput.addEventListener('blur', function() {
        const error = validateName(this.value);
        setError(this, nameError, error);
    });

    emailInput.addEventListener('blur', function() {
        const error = validateEmail(this.value);
        setError(this, emailError, error);
    });

    phoneInput.addEventListener('blur', function() {
        const error = validatePhone(this.value);
        setError(this, phoneError, error);
    });

    messageInput.addEventListener('blur', function() {
        const error = validateMessage(this.value);
        setError(this, messageError, error);
    });

    // Clear errors on input
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) clearError(this);
    });

    emailInput.addEventListener('input', function() {
        if (emailError.textContent) clearError(this);
    });

    phoneInput.addEventListener('input', function() {
        if (phoneError.textContent) clearError(this);
    });

    messageInput.addEventListener('input', function() {
        if (messageError.textContent) clearError(this);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous success message
        formSuccess.textContent = '';

        // Validate all fields
        const nameValidation = validateName(nameInput.value);
        const emailValidation = validateEmail(emailInput.value);
        const phoneValidation = validatePhone(phoneInput.value);
        const messageValidation = validateMessage(messageInput.value);

        setError(nameInput, nameError, nameValidation);
        setError(emailInput, emailError, emailValidation);
        setError(phoneInput, phoneError, phoneValidation);
        setError(messageInput, messageError, messageValidation);

        // If there are errors, focus on the first error field and announce to screen readers
        if (nameValidation || emailValidation || phoneValidation || messageValidation) {
            if (nameValidation) {
                nameInput.focus();
            } else if (emailValidation) {
                emailInput.focus();
            } else if (phoneValidation) {
                phoneInput.focus();
            } else if (messageValidation) {
                messageInput.focus();
            }

            // Announce all errors to screen readers
            const allErrors = [nameValidation, emailValidation, phoneValidation, messageValidation]
                .filter(e => e)
                .join(' ');
            
            // Create a live region announcement for screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'alert');
            announcement.setAttribute('aria-live', 'assertive');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = 'Form validation failed. ' + allErrors;
            document.body.appendChild(announcement);

            setTimeout(() => announcement.remove(), 3000);
            return;
        }

        // Success - all fields are valid
        formSuccess.textContent = 'Thank you for your message! We will get back to you shortly.';
        formSuccess.setAttribute('role', 'status');
        formSuccess.setAttribute('aria-live', 'polite');

        // Optional: Reset form after successful submission
        setTimeout(() => {
            form.reset();
            formSuccess.textContent = '';
        }, 3000);
    });
});
