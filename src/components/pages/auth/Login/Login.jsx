import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import chevronLeftIcon from '../../../../assets/icons/chevron-left.svg';
import googleLogo from '../../../../assets/logos/google.svg';
import SlideToggle, { Button, InputField, PasswordField } from '../../../partials/CustomElements/CustomElements';
import sideImage from '../../../../assets/images/login-left-section.svg';
import PageTitle from '../../../partials/PageTitle/PageTitle';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (!formData.email) valErrors.email = 'This field is required';
        if (!formData.password) valErrors.password = 'This field is required';

        if (Object.keys(valErrors).length > 0) {
            setValidationErrors(valErrors);
            return;
        }

        // submit form
        try {
            setIsSubmitting(true);
            setNetworkError(null);
            let response = await fetch('https://subssumapi-production.up.railway.app/api/login', {method: 'POST', body: JSON.stringify(formData), headers: [['Content-Type', 'application/json']]});
            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message);
            };
            let data = await response.json();
            let token = data.token;
            localStorage.setItem('access', token);
            document.location = '/';
        } catch (e) {
            setNetworkError(e.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='h-full flex'>
            <PageTitle title={'Login'}/>
            <div className="hidden  lg:block h-full w-fit ">
                <img src={sideImage} className='h-full w-full' alt="" />
            </div>
            <div className='p-6 flex flex-col gap-6 grow'>
                <div className='flex justify-between items-center w-full'>
                    <Link to={'/'} className='flex gap-[2px] items-center'>
                        <img src={chevronLeftIcon} alt="" />
                        <span className='text-secondary-blue font-semibold leading-none'>Home</span>
                    </Link>
                    <Button onClick={() => navigate('/register')} text={'Sign up'} />
                </div>
                <div className='w-full max-w-[500px] self-center flex flex-col gap-6'>
                    <span className='font-semibold text-grey-70 text-2xl self-center'>Login</span>
                    <div className='flex flex-col gap-6'>
                        <Link className='rounded-xl py-5 flex gap-[10px] justify-center items-center bg-white border border-grey-30 shadow-[0px_18px_30px_0px_#E5EFF9]'>
                            <img src={googleLogo} alt="" />
                            <span className='font-medium text-xl text-grey-90 leading-none font-["BR_Firma"]'>Login with Google</span>
                        </Link>
                        <div className='flex gap-4 items-center'>
                            <hr className='bg-grey-40 flex-1 h-[2px]' />
                            <span className='text-sm text-grey-100 font-[Poppins]'>Or continue with</span>
                            <hr className='bg-grey-40 flex-1 h-[2px]' />
                        </div>
                        <form method='post' onSubmit={handleSubmit} className='py-10 px-11 border border-grey-30 rounded-xl bg-white flex flex-col gap-8'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4'>
                                    {networkError && <div className='text-accent-error'>{networkError}</div>}
                                    <InputField {...{label: 'Email Address', name: 'email', placeholder: 'audukelani@gmail.com', value: formData.email, onChange: handleChange, error: validationErrors.email}} />
                                    <PasswordField {...{label: 'Password', name: 'password', placeholder: '*******', value: formData.password, onChange: handleChange, error: validationErrors.password}} />
                                </div>
                                <div className='flex justify-between flex-wrap gap-4'>
                                    <div className='flex gap-2'>
                                        <SlideToggle {...{initialState: false}} />
                                        <span className='text-sm text-grey-70'>Remember me</span>
                                    </div>
                                    <Link className='text-accent-error text-sm'>Recover Password</Link>
                                </div>
                            </div>
                            <Button {...{text: isSubmitting ? 'Please wait...' : 'Login', disabled: isSubmitting, isFormButton: true}} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;