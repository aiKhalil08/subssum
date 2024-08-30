import styles from './PageHeader.module.css';
import notificationsIcon from '../../../assets/icons/notifications.svg';
import profileIcon from '../../../assets/icons/profile.svg';
import { Link } from 'react-router-dom';

function PageHeader({text}) {
    return (
        <div className='flex justify-between flex-wrap gap-4'>
            <span className='text-xl text-grey-90 font-medium'>{text}</span>
            <div className='flex gap-2 items-center'>
                <span className='text-secondary-blue font-semibold'>Upgrade To Merchant</span>
                <button type='button'>
                    <img src={notificationsIcon} alt="" />
                </button>
                <Link to={'/profile'}>
                    <img src={profileIcon} alt="" />
                </Link>
            </div>
        </div>
    );
}

export default PageHeader;