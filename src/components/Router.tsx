import { Route } from 'wouter';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { History } from '../pages/History';
import { Home } from '../pages/Home';

export const Router = () => {
  return (
    <DefaultLayout>
      <Route path='/' component={Home} />
      <Route path='/history' component={History} />
    </DefaultLayout>
  );
};
