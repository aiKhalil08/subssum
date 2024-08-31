import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './Profile.module.css';

import profilePicIcon from '../../../assets/icons/profile-pic.svg';
import cameraIcon from '../../../assets/icons/camera.svg';
import copyIcon from '../../../assets/icons/copy.svg';
import { useContext, useEffect, useState } from 'react';
import { Button, InputField, PasswordField } from '../../partials/CustomElements/CustomElements';
import AuthContext from '../../../contexts/auth-context';
import { useSearchParams } from 'react-router-dom';

function Profile() {
    const auth = useContext(AuthContext);
    const user = auth.getUser();

    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={`Welcome, ${user.firstName} ${user.lastName}`} />
            <div className='flex flex-wrap gap-6'>
               <div className='flex flex-col gap-4 w-full max-w-[416px]'>
                    <div className='rounded-3xl p-6 border border-grey-30 flex flex-col gap-4 items-center'>
                        <span>
                            <img src={profilePicIcon} alt="" />
                        </span>
                        <button type='button' className='flex gap-2'>
                            <img src={cameraIcon} alt="" />
                            <span className='text-secondary-blue font-semibold'>Upload Image</span>
                        </button>
                    </div>
                    <div className='rounded-3xl p-6 border border-grey-30 flex flex-col gap-4'>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Name</span>
                            <span className='text-grey-70 font-semibold'>{user.firstName} {user.lastName}</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Email</span>
                            <span className='text-grey-70 font-semibold'>{user.email}</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Phone Number</span>
                            <span className='text-grey-70 font-semibold'>{user.phoneNumber}</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Account Status</span>
                            <span className='text-accent-success font-semibold'>Active</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Referral link</span>
                            <div className='flex flex-col gap-2'>
                                <span className='text-grey-70 font-semibold'>www.subsum.com/tre/wd...</span>
                                <button type="button" className='flex gap-[3px] self-end'>
                                    <img src={copyIcon} alt="" />
                                    <span className='text-secondary-blue font-semibold'>Copy</span>
                                </button>
                            </div>
                        </div>
                        <div className='text-left'>
                            <button type="button" className='text-secondary-blue font-semibold'>
                                Edit Details
                            </button>
                        </div>
                    </div>
               </div>
               <ChangePinAndPassword />
            </div>
        </div>
    );
}


function ChangePinAndPassword() {

    const [section, setSection] = useState('password');
    const [passwordFormData, setPasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: ''
    });
    const [pinFormData, setPinFormData] = useState({
        oldPin: '',
        newPin: '',
        pinConfirmation: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [networkError, setNetworkError] = useState(null);
    const [actionSuccessful, setActionSuccessful] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    function handleChange(e) {
        const {name, value} = e.target;
        setValidationErrors({...validationErrors, [name]: null})

        section === 'password' ?
        setPasswordFormData({
            ...passwordFormData,
            [name]: value
        }) :
        setPinFormData({
            ...pinFormData,
            [name]: value
        })
    }

    useEffect(() => {
        setNetworkError(null);
    }, [section])

    async function handleSubmit(e) {
        e.preventDefault();

        // validate form
        let valErrors = {};
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,256}$/;
        if (section === 'password') {
            Object.keys(passwordFormData).forEach(field => {
                if (!passwordFormData[field].trim()) valErrors[field] = 'This field is required';
            })
            if (!valErrors.newPassword && !passwordRegex.test(passwordFormData.newPassword)) valErrors.newPassword = 'Must be at least 8 characters long and must contain at least a lower case letter, an upper case letter a digit and a special character';
            if (!valErrors.passwordConfirmation && !passwordRegex.test(passwordFormData.passwordConfirmation)) valErrors.passwordConfirmation = 'Must be at least 8 characters long and must contain at least a lower case letter, an upper case letter a digit and a special character';
            if ((!valErrors.newPassword && !valErrors.passwordConfirmation) && passwordFormData.newPassword !== passwordFormData.passwordConfirmation) valErrors.passwordConfirmation = 'Input a matching password'
        } else if (section === 'pin') {
            Object.keys(pinFormData).forEach(field => {
                if (!pinFormData[field].trim()) valErrors[field] = 'This field is required';
            })
            if (!valErrors.newPin && !/^\d{4}$/.test(pinFormData.newPin)) valErrors.newPassword = 'Must be exactly 4 digits';
            if (!valErrors.pinConfirmation && !/^\d{4}$/.test(pinFormData.pinConfirmation)) valErrors.pinConfirmation = 'Must be exactly 4 digits';
            if ((!valErrors.newPin && !valErrors.pinConfirmation) && pinFormData.newPin !== pinFormData.pinConfirmation) valErrors.pinConfirmation = 'Input a matching pin'
        }

        if (Object.keys(valErrors).length > 0) {
            setValidationErrors(valErrors);
            return;
        }

        // submit form
        try {
            setIsSubmitting(true);
            setNetworkError(null);
            let url = section === 'password' ? 'https://subssumapi-production.up.railway.app/change-password' : 'https://subssumapi-production.up.railway.app/change-pin';
            let response = await fetch(url, {method: 'POST', body: JSON.stringify(section === 'password' ? passwordFormData : pinFormData), headers: [['Content-Type', 'application/json'], ['Authorization', `Bearer ${localStorage.getItem('access')}`]]});
            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message);
            };
            let data = await response.json();
            setActionSuccessful(data.message);
        } catch (e) {
            setNetworkError(e.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className='flex flex-col gap-3 w-full max-w-[432px]'>
            <div className='p-2 flex gap-[10px] border border-grey-30 rounded-full'>
                <button type="button" onClick={() => {setSection('password')}} className={`py-3 rounded-full flex-1 text-center text-sm font-semibold ${section === 'password' ? 'bg-[#EFF5FB] text-[#3C517C]' : 'text-[#A9BADA]'}`}>
                    Change Password
                </button>
                <button type="button" onClick={() => {setSection('pin')}} className={`py-3 rounded-full flex-1 text-center text-sm font-semibold ${section === 'pin' ? 'bg-[#EFF5FB] text-[#3C517C]' : 'text-[#A9BADA]'}`}>
                    Change Pin
                </button>
            </div>
            <div>
                {
                    section === 'password' &&
                    <form method='post' onSubmit={handleSubmit} className='rounded-3xl p-6 flex flex-col gap-8 border border-grey-30'>
                        <div className='flex flex-col gap-4'>
                            {networkError && <div className='text-accent-error'>{networkError}</div>}
                            {actionSuccessful && <div className='text-accent-success'>{actionSuccessful}</div>}
                            <PasswordField name={'oldPassword'} label={'Current Password'} placeholder={'Enter Current Password'} value={passwordFormData.oldPassword} onChange={handleChange} error={validationErrors.oldPassword} />
                            <PasswordField name={'newPassword'} label={'New Password'} placeholder={'Enter New Password'} value={passwordFormData.newPassword} onChange={handleChange} error={validationErrors.newPassword} />
                            <PasswordField name={'passwordConfirmation'} label={'Confirm New Password'} placeholder={'Confirm New Password'} value={passwordFormData.passwordConfirmation} onChange={handleChange} error={validationErrors.passwordConfirmation} />
                        </div>
                        <Button isFormButton={true} text={isSubmitting ? 'Please wait...' : 'Submit'} disabled={isSubmitting} />
                    </form>
                }
                {
                    section === 'pin' &&
                    <form method='POST' onSubmit={handleSubmit} className='rounded-3xl p-6 flex flex-col gap-8 border border-grey-30'>
                        <div className='flex flex-col gap-4'>
                            {networkError && <div className='text-accent-error'>{networkError}</div>}
                            {actionSuccessful && <div className='text-accent-success'>{actionSuccessful}</div>}
                            <InputField name={'oldPin'} label={'Old pin'} placeholder={'First time? Use 0000'}  value={pinFormData.oldPin} onChange={handleChange} error={validationErrors.oldPin} />
                            <InputField name={'newPin'} label={'New pin'} placeholder={'Enter New Pin'}  value={pinFormData.newPin} onChange={handleChange} error={validationErrors.newPin} />
                            <InputField name={'pinConfirmation'} label={'Confirm New pin'} placeholder={'Confirm New Pin'}  value={pinFormData.pinConfirmation} onChange={handleChange} error={validationErrors.pinConfirmation} />
                        </div>
                        <Button isFormButton={true} text={isSubmitting ? 'Please wait...' : 'Submit'} disabled={isSubmitting} />
                    </form>
                }
            </div>
        </section>
    );
}

export default Profile;