import { createBrowserRouter } from 'react-router-dom';
import { Menu, Store, Feedback, Home } from '@/pages';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'menu',
        element: <Menu />,
        children: [
          {
            path: ':category',
            element: <Menu />
          }
        ]
      },
      {
        path: 'store',
        element: <Store />
      },
      {
        path: 'feedback',
        children: [
          {
            index: true,
            element: <Feedback />
          },
        ]
      }
    ]
  }
]);

export default router;
