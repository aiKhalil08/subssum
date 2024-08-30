import React, { lazy, Suspense } from 'react';

const LazyElectricBill = lazy(() => import('./ElectricBill'));

const ElectricBill = props => (
  <Suspense fallback={null}>
    <LazyElectricBill {...props} />
  </Suspense>
);

export default ElectricBill;
