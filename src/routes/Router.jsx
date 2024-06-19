import { createBrowserRouter } from 'react-router-dom';
import { FeedbackDetail, FeedbackForm, Home, Store, Menu, PasswordCheck } from '@/pages';
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
        path: '/store',
        element: <Store />
      },
      {
        path: '/feedback/write',
        element: <FeedbackForm />
      },
      {
        path: '/feedback/:id/edit',
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
