import PageHeader from '../../partials/PageHeader/PageHeader';
import styles from './TransactionHistory.module.css';
import filterIcon from '../../../assets/icons/filter.svg';
import initiatedIcon from '../../../assets/icons/initiated.svg';
import successfulIcon from '../../../assets/icons/successful.svg';
import failedIcon from '../../../assets/icons/failed.svg';

function TransactionHistory() {

    const transactions = [
        {
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Success',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'DSTV',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Failed',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },{
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Success',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Initiated',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Success',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Initiated',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'MTN Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Success',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'Airtel Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Failed',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        },
        {
            service: 'Etisalat Airtime VTU',
            number: '08187653467',
            amount: 12000.00,
            totalAmount: 1230000.00,
            status: 'Success',
            paymentMethod: 'Transfer',
            transactionNo: '17045621860850336938179613',
            transactionDate: '6th January, 2024, 06:29PM'
        }
    ];

    return (
        <div className='p-8 flex flex-col gap-8'>
            <PageHeader text={'Transaction History'} />
            <div className='flex flex-col gap-8'>
                <button type="button" className='rounded-xl p-2 flex gap-2 bg-grey-10 border border-grey-30 w-48'>
                    <img src={filterIcon} alt="" />
                    <span className='text-grey-60'>Filter</span>
                </button>
                <div className='max-w-full overflow-auto'>
                    <div className='flex flex-col gap-6  min-w-fit'>
                        <header className='flex justify-between text-sm font-medium text-grey-60'>
                            <span className='flex-[0_0_170px]'>Service</span>
                            <span className='flex-[0_0_100px]'>Amount</span>
                            <span className='flex-[0_0_100px]'>Total Amount</span>
                            <span className='flex-[0_0_70px]'>Status</span>
                            <span className='flex-[0_0_120px]'>Payment Method</span>
                            <span className='flex-[0_0_200px]'>Transaction Number</span>
                            <span className='flex-[0_0_70px]'>Actions</span>
                        </header>
                        <section className='text-xs text-grey-70 flex flex-col gap-4'>
                            {
                                transactions.map((transaction, id) => {
                                    return <TransactionRecord key={id} transaction={transaction} />
                                })
                            }
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TransactionRecord({transaction}) {
    const icon = transaction.status === 'Success' ? successfulIcon : (transaction.status === 'Initiated' ? initiatedIcon : failedIcon);
    const statusColor = transaction.status === 'Success' ? 'text-accent-success' : (transaction.status === 'Initiated' ? 'text-accent-warning' : 'text-accent-error');
    
    return (
        <div className='flex justify-between pb-4 border-b border-grey-30'>
            <div className='flex gap-2 flex-[0_0_170px]'>
                <img src={icon} alt="" />
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold'>{transaction.service}</span>
                    <span>{transaction.number}</span>
                </div>
            </div>
            <div className='flex-[0_0_100px]'>
                <span className='font-semibold'>₦{transaction.amount}</span>
            </div>
            <div className='flex-[0_0_100px]'>
                <span className='font-semibold'>₦{transaction.totalAmount}</span>
            </div>
            <div className='flex-[0_0_70px]'>
                <span className={`font-semibold ${statusColor}`}>{transaction.status}</span>
            </div>
            <div className='flex-[0_0_120px]'>
                <span className='font-semibold'>{transaction.paymentMethod}</span>
            </div>
            <div className='flex flex-col gap-2 flex-[0_0_200px]'>
                <span className='font-semibold'>{transaction.transactionNo}</span>
                <span>{transaction.transactionDate}</span>
            </div>
            <div className='flex-[0_0_70px]'>
                <button type="button" className='p-2 rounded-md bg-grey-20 text-secondary-blue font-semibold'>Open</button>
            </div>
        </div>
    );
}

export default TransactionHistory;