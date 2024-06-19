import { createBrowserRouter } from 'react-router-dom';
import { Home, Store } from '@/pages';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/store',
        element: <Store />
      }
    ]
  }
]);

export default router;
