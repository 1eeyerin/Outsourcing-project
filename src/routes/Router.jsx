import { createBrowserRouter } from 'react-router-dom';
import { Customer, Home } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'Customer',
        element: <Customer />
      }
    ]
  }
]);

export default router;
