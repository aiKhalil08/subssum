import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import chevronLeftIcon from '../../../../assets/icons/chevron-left.svg';
import googleLogo from '../../../../assets/logos/google.svg';
import SlideToggle, { Button, InputField, PasswordField } from '../../../partials/CustomElements/CustomElements';
import sideImage from '../../../../assets/images/login-left-section.svg';

function Login() {
    return (
        <div className='h-full flex'>
            <div className="hidden  lg:block h-full w-fit ">
                <img src={sideImage} className='h-full w-full' alt="" />
            </div>
            <div className='p-6 flex flex-col gap-6 grow'>
                <div className='flex justify-between items-center w-full'>
                    <Link to={'/'} className='flex gap-[2px] items-center'>
                        <img src={chevronLeftIcon} alt="" />
                        <span className='text-secondary-blue font-semibold leading-none'>Home</span>
                    </Link>
                    <Button text={'Sign up'} />
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
                        <form className='py-10 px-11 border border-grey-30 rounded-xl bg-white flex flex-col gap-8'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <InputField {...{label: 'Email Address', name: 'email', placeholder: 'audukelani@gmail.com'}} />
                                    <PasswordField {...{label: 'Password', name: 'password', placeholder: '*******'}} />
                                </div>
                                <div className='flex justify-between flex-wrap gap-4'>
                                    <div className='flex gap-2'>
                                        <SlideToggle {...{initialState: false}} />
                                        <span className='text-sm text-grey-70'>Remember me</span>
                                    </div>
                                    <Link className='text-accent-error text-sm'>Recover Password</Link>
                                </div>
                            </div>
                            <Button {...{text: 'Login', isFormButton: true, onClick: () => {location = '/'}}} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;