import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './Profile.module.css';

import profilePicIcon from '../../../assets/icons/profile-pic.svg';
import cameraIcon from '../../../assets/icons/camera.svg';
import copyIcon from '../../../assets/icons/copy.svg';
import { useState } from 'react';
import { Button, InputField } from '../../partials/CustomElements/CustomElements';

function Profile() {
    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={'Welcome, Ibrahim Abdullahi-Idiagbon'} />
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
                            <span className='text-grey-70 font-semibold'>Ibrahim Abdullahi-Idiagbon</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Email</span>
                            <span className='text-grey-70 font-semibold'>ibidiagbon@gmail.com</span>
                        </div>
                        <div className='flex flex-wrap gap-4 justify-between'>
                            <span className='text-grey-70'>Phone Number</span>
                            <span className='text-grey-70 font-semibold'>0808 174 6461</span>
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
                    <form action="" className='rounded-3xl p-6 flex flex-col gap-8 border border-grey-30'>
                        <div className='flex flex-col gap-4'>
                            <InputField name={'current_password'} label={'Current password'} placeholder={'Enter Current Password'} />
                            <InputField name={'current_password'} label={'Current password'} placeholder={'Enter Current Password'} />
                            <InputField name={'current_password'} label={'Current password'} placeholder={'Enter Current Password'} />
                        </div>
                        <Button isFormButton={true} text={'Submit'} />
                    </form>
                }
                {
                    section === 'pin' &&
                    <form action="" className='rounded-3xl p-6 flex flex-col gap-8 border border-grey-30'>
                        <div className='flex flex-col gap-4'>
                            <InputField name={'current_pin'} label={'Current pin'} placeholder={'Enter Current Pin'} />
                            <InputField name={'current_pin'} label={'Current pin'} placeholder={'Enter Current Pin'} />
                            <InputField name={'current_pin'} label={'Current pin'} placeholder={'Enter Current Pin'} />
                        </div>
                        <Button isFormButton={true} text={'Submit'} />
                    </form>
                }
            </div>
        </section>
    );
}

export default Profile;