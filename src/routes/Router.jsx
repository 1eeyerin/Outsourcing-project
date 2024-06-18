import { createBrowserRouter } from 'react-router-dom';
import { FeedbackDetail, FeedbackForm, Home, MapPage, PasswordCheck } from '@/pages';
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
      },
      {
        path: '/feedback/write',
        element: <FeedbackForm />
      },
      {
        path: '/feedback/password-check',
        element: <PasswordCheck />
      },
      {
        path: '/feedback/:id',
        element: <FeedbackDetail />
      }
    ]
  }
]);

export default router;
