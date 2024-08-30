import React, { lazy, Suspense } from 'react';

const LazyFlashMessage = lazy(() => import('./FlashMessage'));

const FlashMessage = props => (
  <Suspense fallback={null}>
    <LazyFlashMessage {...props} />
  </Suspense>
);

export default FlashMessage;
