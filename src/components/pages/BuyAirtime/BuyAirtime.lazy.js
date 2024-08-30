import React, { lazy, Suspense } from 'react';

const LazyBuyAirtime = lazy(() => import('./BuyAirtime'));

const BuyAirtime = props => (
  <Suspense fallback={null}>
    <LazyBuyAirtime {...props} />
  </Suspense>
);

export default BuyAirtime;
