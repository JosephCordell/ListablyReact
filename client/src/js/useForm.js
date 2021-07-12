import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const [ errors, setErrors ] = useState({});
    const [ signingUp, setSigningUp ] = useState(false);
    const [ loggingIn, setLoggingIn ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        setErrors(validate(values));
        setSigningUp(true);
    };

    const handleLogIn = (e) => {
        e.preventDefault();

        setErrors(validate(values));
        setLoggingIn(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && signingUp) {
            const fetchData = async () => {
                const { username, email, password } = values;
                console.log(username, email, password);

                /* const response = await fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password }),
                    headers: { 'Content-type': 'application/json' },
                });
                console.log('2');
    
                if (response.ok) {
                    document.location.replace('/user');
                } else {
                    modal.classList.remove('hide');
                    return;
                }  */
            };
            fetchData();
        } else if (Object.keys(errors).length === 0 && loggingIn) {
            const { email, password } = values;
            console.log('signin');
        }
    }, [errors]);

    return { handleChange, values, handleSignUp, errors, handleLogIn };
};

export default useForm;