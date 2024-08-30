import React, { lazy, Suspense } from 'react';

const LazyTransactionHistory = lazy(() => import('./TransactionHistory'));

const TransactionHistory = props => (
  <Suspense fallback={null}>
    <LazyTransactionHistory {...props} />
  </Suspense>
);

export default TransactionHistory;
