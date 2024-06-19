import { createBrowserRouter } from 'react-router-dom';
import { Home, Menu, Store, Feedback, FeedbackForm, FeedbackDetail, PasswordCheck } from '@/pages';
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
          {
            path: 'write',
            element: <FeedbackForm />
          },
          {
            path: ':id',
            children: [
              {
                index: true,
                element: <FeedbackDetail />
              },
              {
                path: 'edit',
                element: <FeedbackForm />
              },
              {
                path: 'password-check',
                element: <PasswordCheck />
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
