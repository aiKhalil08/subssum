import { useEffect, useState } from 'react';
import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './AirtimeToCash.module.css';
import { Button } from '../../partials/CustomElements/CustomElements';
import MTNLogo from '../../../assets/logos/mtn.svg';
import GLOlogo from '../../../assets/logos/glo.svg';
import airtelLogo from '../../../assets/logos/airtel.svg';
import etisalatLogo from '../../../assets/logos/etisalat.svg';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import checkMark from '../../../assets/icons/check.svg';
import { useSearchParams } from 'react-router-dom';


function AirtimeToCash() {

    const [currentStep, setCurrentStep] = useState(1);
    const [searchParams, _] = useSearchParams();
    const preselectedNetwork = searchParams.get('n');

    const [formData, setFormData] = useState({
        network: '',
        phone_number: '',
        amount: '',
        pin: ''
    });
    
    useEffect(() => {
        setFormData({...formData, network: preselectedNetwork});
    }, [preselectedNetwork]);


    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={'Airtime to Cash'} />
            <div className='flex flex-col gap-14 w-full max-w-[500px] m-auto'>
                <div className='flex gap-2'>
                    <StepIndicator step={1} setCurrentStep={setCurrentStep} text={'Fill Info'} isActive={currentStep >= 1} />
                    <StepIndicator step={2} setCurrentStep={setCurrentStep} text={'Make Payment'} isActive={currentStep >= 2} />
                    <StepIndicator step={3} setCurrentStep={setCurrentStep} text={'View Receipt'} isActive={currentStep >= 3} />
                </div>
                <div>
                    {currentStep === 1 && <FillInfoForm {...{setFormData, formData, setCurrentStep}} />}
                    {currentStep === 2 && <MakePaymentForm {...{setCurrentStep}} />}
                    {currentStep === 3 && <ViewReceiptForm />}
                </div>
            </div>
        </div>
    );
}

function StepIndicator({step, setCurrentStep, text, isActive = false}) {
    return (
        <div onClick={() => setCurrentStep(step)} className='flex flex-col text-center gap-2 flex-1 cursor-pointer'>
            <span className={`text-sm ${isActive ? 'text-secondary-blue' : 'text-grey-30'}`}>{text}</span>
            <div className={`h-2 rounded-full ${isActive ? 'bg-secondary-blue' : 'bg-grey-30'}`}></div>
        </div>
    );
}

function FillInfoForm({formData, setFormData, setCurrentStep}) {

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <form action="" className='bg-grey-10 border border-grey-30 flex flex-col gap-14 p-6'>
            <section className='flex flex-col gap-8'>
                <h3 className='text-center font-semibold text-grey-60 text-xl'>Airtime to Cash</h3>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3'>
                        <NetworkSelector selected={formData.network} onSelect={handleChange} />
                        <InputField {...{name: 'phone_number', label: 'Phone Number', placeholder: 'Enter phone number'}} />
                    </div>
                    <InputField {...{name: 'amount', label: 'Amount', placeholder: 'Enter amount'}} />
                    <InputField {...{name: 'pin', label: 'Airtime Share Pin', placeholder: 'Enter pin'}} />
                </div>
            </section>
            <Button {...{isFormButton: true, text: 'Proceed', onClick: () => setCurrentStep(2)}} />
        </form>
    );
}

function MakePaymentForm({setCurrentStep}) {

    return (
        <form action="" className='bg-grey-10 border border-grey-30 flex flex-col gap-14 p-6'>
            <section className='flex flex-col gap-8'>
                <h3 className='text-center font-semibold text-grey-60 text-xl'>Airtime to Cash</h3>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque ex blanditiis nulla necessitatibus ratione, illum earum optio? Qui in aliquam quod ut a excepturi nihil totam quae natus, numquam, unde molestias impedit quis eum, ullam quam dicta iusto. Molestiae nemo possimus voluptatum, aspernatur architecto quia exercitationem vero accusantium debitis cumque.
            </section>
            <Button {...{isFormButton: true, text: 'Proceed', onClick: () => setCurrentStep(3)}} />
        </form>
    );
}

function ViewReceiptForm() {

    return (
        <form action="" className='bg-grey-10 border border-grey-30 flex flex-col gap-14 p-6'>
            <section className='flex flex-col gap-8'>
                <h3 className='text-center font-semibold text-grey-60 text-xl'>Airtime to Cash</h3>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque ex blanditiis nulla necessitatibus ratione, illum earum optio? Qui in aliquam quod ut a excepturi nihil totam quae natus, numquam, unde molestias impedit quis eum, ullam quam dicta iusto. Molestiae nemo possimus voluptatum, aspernatur architecto quia exercitationem vero accusantium debitis cumque.
            </section>
            {/* <Button {...{isFormButton: true, text: 'Proceed', onClick: () => setCurrentStep(3)}} /> */}
        </form>
    );
}

function InputField({label, name, placeholder, value, onChange}) {
    return (
        <div className='flex flex-col gap-1 flex-1'>
            <label htmlFor={name} className='text-grey-60 text-sm'>{label}</label>
            <input type="text" id={name} name={name} placeholder={placeholder} className='rounded-lg border border-[#C7DBEF] p-2 text-grey-60 text-sm placeholder:text-grey-60 font-semibold outline-none' />
        </div>
    )
}

function NetworkSelector({selected, onSelect}) {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const NETWORKS = [
        {name: 'MTN', logo: MTNLogo},
        {name: 'GLO', logo: GLOlogo},
        {name: 'Airtel', logo: airtelLogo},
        {name: 'Etisalat', logo: etisalatLogo},
    ]

    function handleSelect(network) {
        onSelect({target: {name: 'network', value: network.name}});
        setIsCollapsed(true);
    }

    const selectedNetwork = selected && NETWORKS.find(n => n.name.toLowerCase() === selected.toLowerCase());
    
    return (
        <div className='flex flex-col gap-1 flex-1'>
            <label className='text-grey-60 text-sm'>Select Network</label>
            <div>
                <div className='relative'>
                    <button type='button' onClick={() => {setIsCollapsed(!isCollapsed)}} className='bg-white p-2 rounded-lg border border-[#C7DBEF] font-semibold text-grey-60 text-sm w-full text-left flex justify-between items-center'>
                        {
                            selectedNetwork ?
                            <div className='flex gap-4 items-center'>
                                <img src={selectedNetwork.logo} className='h-5 w-5' alt="" />
                                <span>{selectedNetwork.name}</span>
                            </div>:
                            <span>Select network</span>
                        }
                        <img src={chevronDown} className='w-5 h-5' alt="" />
                    </button>
                    <div className={`absolute top-full left-0 w-full overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-[300px]'}`}>
                        <ul className='bg-white mt-1 border border-[#C7DBEF] rounded-lg'>
                            {
                                NETWORKS.map(n => {
                                    return (
                                        <li key={n.name} onClick={() => handleSelect(n)} className='flex justify-between p-2 items-center cursor-pointer'>
                                            <div className='flex gap-4 items-center'>
                                                <img src={n.logo} className='w-7 h-7' alt="" />
                                                <span className='text-grey-60 text-sm font-semibold'>{n.name}</span>
                                            </div>
                                            {
                                                (selectedNetwork && n.name.toLowerCase() === selectedNetwork.name.toLowerCase()) &&
                                                <img src={checkMark} alt="" />
                                            }
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AirtimeToCash;