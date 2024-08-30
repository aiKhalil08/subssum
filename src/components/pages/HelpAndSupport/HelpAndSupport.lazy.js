import React, { lazy, Suspense } from 'react';

const LazyHelpAndSupport = lazy(() => import('./HelpAndSupport'));

const HelpAndSupport = props => (
  <Suspense fallback={null}>
    <LazyHelpAndSupport {...props} />
  </Suspense>
);

export default HelpAndSupport;
