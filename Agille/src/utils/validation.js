// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation (minimum 6 characters)
export const validatePassword = (password) => {
    return password.length >= 6;
};

// Name validation
export const validateName = (name) => {
    return name.trim().length >= 2;
};

// Form validation for login
export const validateLoginForm = (email, password) => {
    const errors = {};

    if (!email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

// Form validation for registration
export const validateRegisterForm = (name, email, password, confirmPassword, role) => {
    const errors = {};

    if (!name) {
        errors.name = 'Name is required';
    } else if (!validateName(name)) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (!role) {
        errors.role = 'Please select a role';
    }

    return errors;
};
