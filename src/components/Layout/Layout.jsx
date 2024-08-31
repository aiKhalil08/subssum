import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import subsumLogo from '../../assets/logos/subssum.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import { useContext, useEffect, useState } from 'react';
import MTNLogo from '../../assets/logos/mtn.svg';
import GLOLogo from '../../assets/logos/glo.svg';
import AirtelLogo from '../../assets/logos/airtel.svg';
import EtisalatLogo from '../../assets/logos/etisalat.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import hamburgerIcon from '../../assets/icons/hamburger.svg';
import FlashMessage from '../partials/FlashMessage/FlashMessage';
import AuthContext from '../../contexts/auth-context';
import auth from '../../utils/auth';

function Layout() {
    const [showFlashMessage, setShowFlashMessage] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('show_welcome')) {
            sessionStorage.setItem('show_welcome', 'true')
            setShowFlashMessage(true);
        }
    }, []);



    return (
        <AuthContext.Provider value={auth}>
            {
                auth.isLoggedIn() &&
                <div className='w-full h-full flex'>
                    {
                        showFlashMessage &&
                        <FlashMessage message={null} hide={() => setShowFlashMessage(false)} />
                    }
                    <Sidebar auth={auth} />
                    <div className='grow h-full overflow-x-hidden overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>
            }
        </AuthContext.Provider>
    );
}

const SIDEBAR_MENU = [
    {link: '/', text: 'Dashboard', icon: DashboardIcon},
    {link: '/buy-airtime', text: 'Buy Airtime', icon: BuyAirtimeIcon, isCollapsible: true},
    {link: '/buy-data', text: 'Buy Data', icon: BuyDataIcon, isCollapsible: true},
    {link: '/tv-subscription', text: 'TV Subscription', icon: TvSubscriptionIcon},
    {link: '/pay-electric-bill', text: 'Pay Electric Bill', icon: PayElectricBillIcon},
    {link: '/airtime-to-cash', text: 'Airtime to Cash', icon: AirtimeToCashIcon, isCollapsible: true},
    {link: '/transaction-history', text: 'Transaction History', icon: TransactionHistoryIcon},
    {link: '/help-and-support', text: 'Help & Support', icon: HelpAndSupportIcon},
];


function Sidebar({auth}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const {pathname, search} = useLocation();

    useEffect(() => {
        setIsExpanded(false);
    }, [pathname, search])

    return (
        <>
            <div className={`fixed ${isExpanded ? 'left-0' : '-left-full'} z-10 transition-all w-80 md:relative md:left-0 overflow-hidden shrink-0 h-full`}>
                <div className='h-full bg-grey-20 p-8 flex flex-col'>
                    <span>
                        <img src={subsumLogo} alt="" />
                    </span>
                    <ul className='mt-16 flex flex-col gap-4'>
                        {
                            SIDEBAR_MENU.map(item => {
                                return (
                                    <li key={item.link}>
                                        <MenuItem item={item} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='mt-auto flex justify-between'>
                        <button type='button' onClick={() => auth.logout()} className='flex gap-4'>
                            <img src={logoutIcon} alt="" />
                            <span className='font-medium text-grey-70'>Log out</span>
                        </button>
                        <span>
                            <ChevronIcon />
                        </span>
                    </div>
                </div>
            </div>
            <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={`md:hidden fixed top-0 ${isExpanded ? 'left-[calc(20rem_-_2rem)]' : 'left-0'} transition-all w-8 z-10 h-8`}>
                <img src={isExpanded ? cancelIcon : hamburgerIcon} alt="" />
            </button>
        </>
    );
}

function MenuItem({item}) {

    const [isActive, setIsActive] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const {pathname} = useLocation();
    const Icon = item.icon;

    useEffect(() => {
        if (pathname === item.link) setIsActive(true);
        else {
            setIsActive(false);
            setIsCollapsed(true);
        }
    }, [pathname]);

    return (
        <div>
            <button type="button" className={`p-2 w-full flex justify-between items-center rounded-xl ${isActive && 'bg-secondary-blue'}`}>
                <NavLink to={item.link} className='flex gap-4 grow items-center'>
                    <Icon isActive={isActive} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-grey-70'}`}>{item.text}</span>
                </NavLink>
                {
                    item.isCollapsible &&
                    <span onClick={() => setIsCollapsed(!isCollapsed)}>
                        <ChevronIcon isFilled={!isActive} />
                    </span>
                }
            </button>
            <div className={`${isCollapsed ? 'max-h-0' : 'max-h-80'} overflow-hidden`}>
                <div className='flex justify-between mt-4'>
                    <NavLink to={`${item.link}?n=${'MTN'}`}>
                        <img src={MTNLogo} alt="" />
                    </NavLink>
                    <NavLink to={`${item.link}?n=${'GLO'}`}>
                        <img src={GLOLogo} alt="" />
                    </NavLink>
                    <NavLink to={`${item.link}?n=${'Airtel'}`}>
                        <img src={AirtelLogo} alt="" />
                    </NavLink>
                    <NavLink to={`${item.link}?n=${'Etisalat'}`}>
                        <img src={EtisalatLogo} alt="" />
                    </NavLink>
                </div>
            </div>
        </div>
        
    );
}

function DashboardIcon({isActive = false}) {
    return (
        <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_478_815)">
        <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill={`${isActive ? 'white' : "#6882B6"}`} />
        </g>
        <defs>
        <clipPath id="clip0_478_815">
        <rect className="w-6 h-6" fill={`${isActive ? '#6882B6' : "white"}`}/>
        </clipPath>
        </defs>
        </svg>
    );
}

function BuyAirtimeIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.6638 18.771C20.6638 18.771 19.5052 19.909 19.2212 20.2427C18.7587 20.7363 18.2137 20.9693 17.4992 20.9693C17.4305 20.9693 17.3573 20.9693 17.2886 20.9648C15.9284 20.8779 14.6644 20.3478 13.7164 19.8953C11.1243 18.643 8.8482 16.8652 6.95678 14.612C5.3951 12.7336 4.35093 10.9969 3.6594 9.13217C3.23349 7.99415 3.07778 7.1075 3.14647 6.27113C3.19227 5.7364 3.39835 5.29308 3.77847 4.91374L5.34015 3.35526C5.56455 3.14502 5.8027 3.03076 6.03626 3.03076C6.32478 3.03076 6.55835 3.20443 6.7049 3.35069C6.70948 3.35526 6.71406 3.35983 6.71864 3.3644C6.998 3.62491 7.26362 3.89456 7.54298 4.18249C7.68495 4.32874 7.8315 4.47499 7.97805 4.62581L9.22831 5.87351C9.71376 6.35797 9.71376 6.80586 9.22831 7.29032C9.0955 7.42286 8.96727 7.5554 8.83446 7.68337C8.44976 8.07642 8.75196 7.77483 8.35353 8.13132C8.34437 8.14046 8.33521 8.14503 8.33063 8.15417C7.93677 8.54722 8.01005 8.93113 8.09248 9.19164C8.09706 9.20535 8.10164 9.21906 8.10622 9.23277C8.43138 10.0189 8.88935 10.7593 9.58547 11.6413L9.59005 11.6459C10.854 13.1998 12.1867 14.411 13.6568 15.3387C13.8446 15.4576 14.0369 15.5536 14.2201 15.645C14.385 15.7272 14.5407 15.8049 14.6735 15.8872C14.6918 15.8963 14.7101 15.91 14.7285 15.9192C14.8842 15.9969 15.0307 16.0334 15.1819 16.0334C15.562 16.0334 15.8001 15.7958 15.878 15.7181L16.7757 14.8222C16.9314 14.6668 17.1787 14.4795 17.4672 14.4795C17.7511 14.4795 17.9847 14.6577 18.1267 14.8131C18.1312 14.8177 18.1312 14.8177 18.1358 14.8222L20.6592 17.3405C21.1309 17.8067 20.6638 18.771 20.6638 18.771Z" fill={`${isActive ? 'white' : "#6882B6"}`} />
        </svg>
    );
}

function BuyDataIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.61243 12.2041C9.14078 8.70189 14.8614 8.70189 18.3897 12.2041M8.80675 15.3748C10.5709 13.6237 13.4312 13.6237 15.1954 15.3748M12.0011 18.5455L12.0198 18.5269M2.40039 9.40162C7.70232 4.13891 16.2985 4.13891 21.6004 9.40162" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function TvSubscriptionIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.40002 20.4001L12 16.8001L15.6 20.4001M4.80002 16.8001H19.2C20.5255 16.8001 21.6 15.7256 21.6 14.4001V6.0001C21.6 4.67461 20.5255 3.6001 19.2 3.6001H4.80002C3.47454 3.6001 2.40002 4.67461 2.40002 6.0001V14.4001C2.40002 15.7256 3.47454 16.8001 4.80002 16.8001Z" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function PayElectricBillIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2222 14.4888L9.51105 21.5999L18.7555 11.6443L13.7777 8.7999L14.4888 2.3999L5.24438 12.3555L10.2222 14.4888Z" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

function AirtimeToCashIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.21216 18.7881C1.46313 15.0391 1.46313 8.96071 5.21217 5.21168C7.5821 2.84174 10.8829 1.96995 13.9376 2.5963M19.7396 6.31751C22.505 10.0741 22.188 15.3887 18.7886 18.7881C16.3431 21.2336 12.9064 22.0839 9.77169 21.339M17.8377 7.86043V4.26043L21.4377 4.26043L17.8377 7.86043ZM6.06008 16.0366V19.6366H2.46008L6.06008 16.0366Z" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function TransactionHistoryIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.79995 7.8H16.2M7.79995 12.6H16.2M5.75995 3H18.24C19.1015 3 19.8 3.80589 19.8 4.8V21L17.2 19.2L14.6 21L12 19.2L9.39995 21L6.79995 19.2L4.19995 21V4.8C4.19995 3.80589 4.89839 3 5.75995 3Z" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function HelpAndSupportIcon({isActive = false}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.84615 12.0005V7.95453C5.85817 7.15923 6.027 6.37412 6.34298 5.64418C6.65896 4.91424 7.11587 4.25383 7.68754 3.70077C8.2592 3.14771 8.93438 2.71288 9.67439 2.4212C10.4144 2.12952 11.2047 1.98671 12 2.00097C12.7953 1.98671 13.5856 2.12952 14.3256 2.4212C15.0656 2.71288 15.7408 3.14771 16.3125 3.70077C16.8841 4.25383 17.341 4.91424 17.657 5.64418C17.973 6.37412 18.1418 7.15923 18.1538 7.95453V12.0005M15.0769 20.077C15.893 20.077 16.6756 19.7529 17.2526 19.1758C17.8297 18.5988 18.1538 17.8163 18.1538 17.0002V13.5389M15.0769 20.077C15.0769 20.587 14.8743 21.0761 14.5137 21.4368C14.153 21.7974 13.6639 22 13.1538 22H10.8462C10.3361 22 9.84698 21.7974 9.48633 21.4368C9.12569 21.0761 8.92308 20.587 8.92308 20.077C8.92308 19.567 9.12569 19.0779 9.48633 18.7173C9.84698 18.3566 10.3361 18.154 10.8462 18.154H13.1538C13.6639 18.154 14.153 18.3566 14.5137 18.7173C14.8743 19.0779 15.0769 19.567 15.0769 20.077ZM3.53846 9.69291H5.07692C5.28094 9.69291 5.47659 9.77395 5.62085 9.9182C5.76511 10.0624 5.84615 10.2581 5.84615 10.4621V15.0773C5.84615 15.2813 5.76511 15.4769 5.62085 15.6212C5.47659 15.7654 5.28094 15.8465 5.07692 15.8465H3.53846C3.13044 15.8465 2.73912 15.6844 2.4506 15.3959C2.16209 15.1074 2 14.7161 2 14.3081V11.2313C2 10.8233 2.16209 10.432 2.4506 10.1435C2.73912 9.85499 3.13044 9.69291 3.53846 9.69291ZM20.4615 15.8465H18.9231C18.7191 15.8465 18.5234 15.7654 18.3791 15.6212C18.2349 15.4769 18.1538 15.2813 18.1538 15.0773V10.4621C18.1538 10.2581 18.2349 10.0624 18.3791 9.9182C18.5234 9.77395 18.7191 9.69291 18.9231 9.69291H20.4615C20.8696 9.69291 21.2609 9.85499 21.5494 10.1435C21.8379 10.432 22 10.8233 22 11.2313V14.3081C22 14.7161 21.8379 15.1074 21.5494 15.3959C21.2609 15.6844 20.8696 15.8465 20.4615 15.8465Z" stroke={`${isActive ? 'white' : "#6882B6"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
}

function ChevronIcon({isFilled = true, direction = 'down'}) {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.8 9.5999L12 14.3999L7.20005 9.5999" stroke={`${isFilled ? "#4169E1" : "white"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default Layout;