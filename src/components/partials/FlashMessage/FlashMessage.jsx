import styles from './FlashMessage.module.css';
import cancelIcon from '../../../assets/icons/cancel.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../contexts/auth-context';

function FlashMessage({hide, message = null}) {

    const [show, setShow] = useState(true);
    const auth = useContext(AuthContext);
    const user = auth.getUser();

    const timeout = useRef(null);

    useEffect(() => {
        timeout.current = setTimeout(remove, 5000);
        return () => clearTimeout(timeout.current);
    }, []);

    function remove() {
        setShow(false);
        setTimeout(() => {hide()}, 600);
    }

    return (
        <div className={`m-auto w-80 z-20 fixed top-8 ${show ? styles['show'] : styles['hide']} left-[calc(50%_-_10rem)] bg-grey-20 border border-grey-40 text-grey-80 p-4 rounded-3xl`}>
            <div className=''>
                <button type="button" onClick={remove} className='float-end ml-4 mb-4'>
                    <img src={cancelIcon} className='w-5 h-5' alt="" />
                </button>
                {
                    message ||
                    <div>
                        <p>Welcome back, {user.firstName}.</p>
                        <p>Click on the profile icon at the top right corner of your screen to edit your profile.</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default FlashMessage;