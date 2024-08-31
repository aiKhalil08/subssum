import { Button, InputField, PasswordField } from '../../../partials/CustomElements/CustomElements';
import PageTitle from '../../../partials/PageTitle/PageTitle';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import chevronLeftIcon from '../../../../assets/icons/chevron-left.svg';
import sideImage from '../../../../assets/images/login-left-section.svg';
import { useState } from 'react';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirmation: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [networkError, setNetworkError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    function handleChange(e) {
        const {name, value} = e.target;
        setValidationErrors({...validationErrors, [name]: null})

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // validate form
        let valErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,256}$/;
        Object.keys(formData).forEach(field => {
            if (!formData[field].trim()) valErrors[field] = 'This field is required';
        })
        if (!valErrors.email && !emailRegex.test(formData.email)) valErrors.email = 'Invalid email address';
        if (!valErrors.password && !passwordRegex.test(formData.password)) valErrors.password = 'Must be at least 8 characters long and must contain at least a lower case letter, an upper case letter a digit and a special character';
        if (!valErrors.passwordConfirmation && !passwordRegex.test(formData.passwordConfirmation)) valErrors.passwordConfirmation = 'Must be at least 8 characters long and must contain at least a lower case letter, an upper case letter a digit and a special character';
        if ((!valErrors.password && !valErrors.passwordConfirmation) && formData.password !== formData.passwordConfirmation) valErrors.passwordConfirmation = 'Input a matching password'

        if (Object.keys(valErrors).length > 0) {
            setValidationErrors(valErrors);
            return;
        }

        // submit form
        try {
            setIsSubmitting(true);
            setNetworkError(null);
            let response = await fetch('https://subssumapi-production.up.railway.app/register', {method: 'POST', body: JSON.stringify(formData), headers: [['Content-Type', 'application/json']]});
            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message);
            };
            navigate('/login');
        } catch (e) {
            setNetworkError(e.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='h-full flex'>
            <PageTitle title={'Register'}/>
            <div className="hidden  lg:block h-full w-fit ">
                <img src={sideImage} className='h-full w-full' alt="" />
            </div>
            <div className='p-6 flex flex-col gap-6 grow h-full overflow-auto'>
                <div className='flex justify-between items-center w-full'>
                    <Link to={'/'} className='flex gap-[2px] items-center'>
                        <img src={chevronLeftIcon} alt="" />
                        <span className='text-secondary-blue font-semibold leading-none'>Home</span>
                    </Link>
                    <Button onClick={() => navigate('/login')} text={'Login'} />
                </div>
                <div className='w-full max-w-[500px] self-center flex flex-col gap-6'>
                    <span className='font-semibold text-grey-70 text-2xl self-center'>Register</span>
                    <div className='flex flex-col gap-6'>
                        <form method='post' onSubmit={handleSubmit} className='py-10 px-11 border border-grey-30 rounded-xl bg-white flex flex-col gap-8'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4'>
                                    {networkError && <div className='text-accent-error'>{networkError}</div>}
                                    <InputField {...{label: 'First Name', name: 'firstName', placeholder: 'Audu', value: formData.firstName, onChange: handleChange, error: validationErrors.firstName}} />
                                    <InputField {...{label: 'Last Name', name: 'lastName', placeholder: 'Kelani', value: formData.lastName, onChange: handleChange, error: validationErrors.lastName}} />
                                    <InputField {...{label: 'Email Address', name: 'email', placeholder: 'audukelani@gmail.com', value: formData.email, onChange: handleChange, error: validationErrors.email}} />
                                    <InputField {...{label: 'Phone Number', name: 'phoneNumber', placeholder: '+2348101298347', value: formData.phoneNumber, onChange: handleChange, error: validationErrors.phoneNumber}} />
                                    <PasswordField {...{label: 'Password', name: 'password', placeholder: '*******', value: formData.password, onChange: handleChange, error: validationErrors.password}} />
                                    <PasswordField {...{label: 'Confirm Password', name: 'passwordConfirmation', placeholder: '*******', value: formData.passwordConfirmation, onChange: handleChange, error: validationErrors.passwordConfirmation}} />
                                </div>
                            </div>
                            <Button {...{text: isSubmitting ? 'Please wait...' : 'Register', disabled: isSubmitting, isFormButton: true}} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;