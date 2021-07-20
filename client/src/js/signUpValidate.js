export default function validateInfo(values) {
    let errors = {};

    //checks for username
    if (!values.username.trim()) {
        errors.username = 'Username Required';
    }

    //checks for email
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    // checks password
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }

    //checks for matching password
    if (!values.password2) {
        errors.password2 = 'Please confirm password';
    } else if (values.password !== values.password2) {
        errors.password2 = 'Passwords do not match';
    }

    return errors;
}
