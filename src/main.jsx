import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import Login from './components/pages/auth/Login/Login.jsx';
import BuyAirtime from './components/pages/BuyAirtime/BuyAirtime.jsx';
import TvSubscription from './components/pages/TvSubscription/TvSubscription.jsx';
import ElectricBill from './components/pages/ElectricBill/ElectricBill.jsx';
import AirtimeToCash from './components/pages/AirtimeToCash/AirtimeToCash.jsx';
import TransactionHistory from './components/pages/TransactionHistory/TransactionHistory.jsx';
import HelpAndSupport from './components/pages/HelpAndSupport/HelpAndSupport.jsx';
import BuyData from './components/pages/BuyData/BuyData.jsx';
import Profile from './components/pages/Profile/Profile.jsx';


const routes = [
    {path: '/login', element: <Login />},
    {
        path: '/',
        element: <Layout />,
        children: [
            {index: true, element: <Dashboard />},
            {path: 'profile', element: <Profile />},
            {path: 'buy-airtime', element: <BuyAirtime />},
            {path: 'buy-data', element: <BuyData />},
            {path: 'tv-subscription', element: <TvSubscription />},
            {path: 'pay-electric-bill', element: <ElectricBill />},
            {path: 'airtime-to-cash', element: <AirtimeToCash />},
            {path: 'transaction-history', element: <TransactionHistory />},
            {path: 'help-and-support', element: <HelpAndSupport />},
        ]
    }
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
