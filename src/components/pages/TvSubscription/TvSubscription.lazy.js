import React, { lazy, Suspense } from 'react';

const LazyTvSubscription = lazy(() => import('./TvSubscription'));

const TvSubscription = props => (
  <Suspense fallback={null}>
    <LazyTvSubscription {...props} />
  </Suspense>
);

export default TvSubscription;
