import { createBrowserRouter } from 'react-router-dom';
import { Home, Feedback } from '@/pages';
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
        path: 'Feedback',
        element: <Feedback />
      }
    ]
  }
]);

export default router;
