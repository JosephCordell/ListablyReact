import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
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
        }
    }, [errors]);

    return { handleChange, values, handleSubmit, errors };
};

export default useForm;
