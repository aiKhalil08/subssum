import styles from './CustomElements.module.css';

import closedEyeIcon from '../../../assets/icons/closed-eye.svg';
import openEyeIcon from '../../../assets/icons/open-eye.svg';
import { useState } from 'react';

export function InputField({label, name, placeholder, value, onChange, error = null}) {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name} className='text-grey-70'>{label}</label>
            <input type="text" id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} className='rounded-[4px] border border-grey-30 placeholder:text-[#869DCB] p-2 text-grey-90 outline-none' />
            {error && <div className='text-sm text-accent-error'>{error}</div>}
        </div>
    )
}

export function PasswordField({label, name, placeholder, value, onChange, error = null}) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name} className='text-grey-70'>{label}</label>
            <div className='relative'>
                <input type={showPassword ? "text" : "password"} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} className='rounded-[4px] border border-grey-30 placeholder:text-[#869DCB] p-2 pr-9 text-grey-90 outline-none w-full h-full' />
                <span onClick={() => setShowPassword(!showPassword)} className='absolute top-2 right-2 cursor-pointer'>
                    <img src={showPassword ? closedEyeIcon : openEyeIcon} alt="" />
                </span>
            </div>
            {error && <div className='text-sm text-accent-error'>{error}</div>}
        </div>
    )
}

export function SlideToggle ({ initialState = false, onToggle }) {
  const [isOn, setIsOn] = useState(initialState);

  function handleToggle() {
    setIsOn(!isOn);
    if (onToggle) {
      onToggle(!isOn);
    }
  };

  return (
    <div onClick={handleToggle} className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}>
      <div className={`w-3 h-3 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
};

export function Button({text, onClick, disabled = false, isFormButton = false, classes=''}) {
    return (
        <button disabled={disabled} type={isFormButton ? 'submit' : 'button'} onClick={(e) => onClick && onClick(e)} className={`bg-secondary-blue py-4 px-8 sm:px-12 rounded-lg text-grey-10 leading-none font-semibold whitespace-nowrap ${isFormButton && 'w-full'} ${classes} disabled:opacity-70`}>
            {text}
        </button>
    );
}

export default SlideToggle;