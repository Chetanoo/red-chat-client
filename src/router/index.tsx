import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Loading from 'components/loading';
import NotFound from '../pages/notFound';

const LazyMain = React.lazy(() => import('pages/main'));
const LazyLogin = React.lazy(() => import('pages/login'));
const LazyRegister = React.lazy(() => import('pages/register'));

function Router(): JSX.Element {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LazyMain />} />
        <Route path="/signin" element={<LazyLogin />} />
        <Route path="/signup" element={<LazyRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}

export default Router;
