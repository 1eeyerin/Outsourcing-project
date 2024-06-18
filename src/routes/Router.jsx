import { createBrowserRouter } from 'react-router-dom';
import { Home, Menu, MapPage } from '@/pages';
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
        path: '/MapPage',
        element: <MapPage />
      }
    ]
  }
]);

export default router;
