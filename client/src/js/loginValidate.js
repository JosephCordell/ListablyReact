export default function validateInfo( values ) {
    let errors = {}

    //checks for email
    if (!values.email) {
        errors.email= "Email required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email  = 'Email address is invalid'
    }

    // checks password
    if (!values.password) {
        errors.password = 'Password is required'
    }
    
    return errors
}
