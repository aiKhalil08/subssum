import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './ElectricBill.module.css';

function ElectricBill() {
    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={'Electricity Bill'} />
            <section className=''>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur error dolore perspiciatis harum! Nihil in maiores velit odio blanditiis natus earum quae, vel quos eius! Iste cumque quos soluta!
            </section>
        </div>
    );
}

export default ElectricBill;