import { createBrowserRouter } from 'react-router-dom';
import { Home, Customer } from '@/pages';
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
        path: 'customer',
        element: <Customer />
      }
    ]
  }
]);

export default router;
