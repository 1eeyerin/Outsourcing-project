import { createBrowserRouter } from 'react-router-dom';
import { Home, MapPage } from '@/pages';
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
        path: '/MapPage',
        element: <MapPage />
      }
    ]
  }
]);

export default router;
