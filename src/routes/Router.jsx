import { createBrowserRouter } from 'react-router-dom';
import { Home, Menu, Store, Feedback } from '@/pages';
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
        path: 'feedback',
        element: <Feedback />
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
        path: '/feedback/:id',
        element: <FeedbackDetail />
      },
      {
        path: '/feedback/:id/password-check',
        element: <PasswordCheck />
      }
    ]
  }
]);

export default router;
