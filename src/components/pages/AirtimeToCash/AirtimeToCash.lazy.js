import React, { lazy, Suspense } from 'react';

const LazyAirtimeToCash = lazy(() => import('./AirtimeToCash'));

const AirtimeToCash = props => (
  <Suspense fallback={null}>
    <LazyAirtimeToCash {...props} />
  </Suspense>
);

export default AirtimeToCash;
