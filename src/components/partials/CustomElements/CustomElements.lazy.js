import React, { lazy, Suspense } from 'react';

const LazyCustomElements = lazy(() => import('./CustomElements'));

const CustomElements = props => (
  <Suspense fallback={null}>
    <LazyCustomElements {...props} />
  </Suspense>
);

export default CustomElements;
