import { NavLink } from 'react-router-dom';
import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './HelpAndSupport.module.css';

import arrowRightIcon from '../../../assets/icons/arrow-right.svg';
import faqIcon from '../../../assets/icons/faq.svg';
import liveChatIcon from '../../../assets/icons/live-chat.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import phoneIcon from '../../../assets/icons/phone.svg';
import reportIcon from '../../../assets/icons/report.svg';
import reviewIcon from '../../../assets/icons/review.svg';

function HelpAndSupport() {

    const items = [
        {
            title: 'Frequently Asked Questions',
            link: '',
            linkText: 'See FAQ',
            icon: faqIcon
        },
        {
            title: 'Live Chat',
            link: '',
            linkText: 'Chat Now',
            icon: liveChatIcon
        },
        {
            title: 'Whatsapp',
            link: '',
            linkText: 'Drop a Message',
            icon: whatsappIcon
        },
        {
            title: 'Phone Call',
            link: '',
            linkText: 'Call Us',
            icon: phoneIcon
        },
        {
            title: 'Report Our Support',
            link: '',
            linkText: 'Not Satisfied?',
            icon: reportIcon
        },
        {
            title: 'Review Our App',
            comingSoon: true,
            icon: reviewIcon
        }
    ]

    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={'Help and Support'} />
            <section className='grid gap-6 grid-cols-[minmax(auto,_22rem)] sm:grid-cols-[repeat(2,_minmax(auto,_22rem))] md:grid-cols-[minmax(auto,_22rem)] lg:grid-cols-[repeat(2,_minmax(auto,_22rem))]'>
                {
                    items.map(item => <Widget item={item} key={item.title} />)
                }
            </section>
        </div>
    );
}

function Widget({item}) {
    return (
        <div className='p-3 rounded-3xl border border-grey-30 flex gap-4'>
            <span>
                <img src={item.icon} alt="" />
            </span>
            <div className='flex flex-col justify-between'>
                <span className='font-semibold text-grey-60'>{item.title}</span>
                {
                    !item.comingSoon ?
                    (
                        <NavLink to={item.link} className={'flex gap-2'}>
                            <span className='text-secondary-blue font-semibold'>{item.linkText}</span>
                            <img src={arrowRightIcon} alt="" />
                        </NavLink>
                    ) :
                    <span className='py-1 px-2 rounded-full bg-grey-20 text-secondary-blue text-sm font-semibold'>Coming Soon</span>
                }
            </div>
        </div>
    );
}

export default HelpAndSupport;