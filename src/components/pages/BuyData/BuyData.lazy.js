import React, { lazy, Suspense } from 'react';

const LazyBuyData = lazy(() => import('./BuyData'));

const BuyData = props => (
  <Suspense fallback={null}>
    <LazyBuyData {...props} />
  </Suspense>
);

export default BuyData;
