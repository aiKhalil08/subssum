import styles from './Dashboard.module.css';
import copyIcon from '../../../assets/icons/copy.svg';
import editIcon from '../../../assets/icons/edit.svg';
import shareIcon from '../../../assets/icons/share.svg';
import cashoutIcon from '../../../assets/icons/cashout.svg';
import { Button } from '../../partials/CustomElements/CustomElements';
import PageHeader from '../../partials/PageHeader/PageHeader';
import { useContext } from 'react';
import AuthContext from '../../../contexts/auth-context';

function Dashboard() {
    const auth = useContext(AuthContext);
    const user = auth.getUser();
    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={`Welcome, ${user.firstName} ${user.lastName}`} />
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='flex flex-col gap-5 flex-[0_0_463px] max-w-[463px]'>
                    <BalanceWidget walletBalance={4000} />
                    <ReferralWidget referralCode={'18/52ha089'} />
                    <BonusWidget totalReferrals={4} walletBonus={2500} />
                </div>
                <div className="flex-[0_0_504px] max-w-[504px] bg-grey-20 rounded-3xl max-h-72 bg-[url('./assets/images/credit-card.png')] bg-no-repeat bg-right-bottom overflow-hidden">
                    <div className='bg-[linear-gradient(45.08deg,_#D7E1F4_11.66%,_rgba(215,_225,_244,_0)_90.35%)] h-full w-full p-11'>
                        <span className='font-[Poppins] text-grey-80'>Cards</span>
                        <div className='font-[Poppins] text-2xl text-grey-60 mt-9 w-40'>You Have No Saved Cards</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Widget({children, classes = ''}) {
    return (
        <div className={`p-6 border-2 border-grey-30 rounded-3xl flex-1 ${classes}`}>
            {children}
        </div>
    );
}

function BalanceWidget({walletBalance}) {
    return (
        <Widget classes={'flex justify-between'}>
            <div className='flex flex-col gap-2 text-grey-80 font-[Poppins]'>
                <span>Wallet Balance</span>
                <span className='font-semibold text-4xl'>₦{walletBalance}</span>
            </div>
            <Button text={'Fund Wallet'} classes={'self-center'} />
        </Widget>
    );
}

function ReferralWidget({referralCode}) {
    return (
        <Widget classes={'flex flex-col gap-4'}>
            <div className='flex flex-col gap-2 text-grey-80 font-[Poppins]'>
                <span>Referral</span>
                <div>Referral Code: <span className='font-semibold'>{referralCode}</span></div>
            </div>
            <div className='flex gap-4'>
                <button type='button' className='flex gap-[3px]'>
                    <img src={copyIcon} alt="" />
                    <span className='font-semibold text-secondary-blue'>Copy</span>
                </button>
                <button type='button' className='flex gap-[3px]'>
                    <img src={editIcon} alt="" />
                    <span className='font-semibold text-secondary-blue'>Edit</span>
                </button>
                <button type='button' className='flex gap-[3px]'>
                    <img src={shareIcon} alt="" />
                    <span className='font-semibold text-secondary-blue'>Share</span>
                </button>
            </div>
        </Widget>
    );
}

function BonusWidget({totalReferrals, walletBonus}) {
    return (
        <Widget classes={'flex flex-col gap-4'}>
            <div className='flex gap-8 text-grey-80 font-[Poppins]'>
                <div className='flex flex-col gap-2'>
                    <span>Total referrals made</span>
                    <span className='font-semibold text-2xl'>{totalReferrals}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span>Current wallet bonus</span>
                    <span className='font-semibold text-2xl'>₦{walletBonus}</span>
                </div>
            </div>
            <button type='button' className='flex gap-[3px] items-center'>
                <img src={cashoutIcon} alt="" />
                <span className='font-semibold text-secondary-blue'>Cashout</span>
            </button>
        </Widget>
    );
}

export default Dashboard;