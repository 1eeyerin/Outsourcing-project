import { createBrowserRouter } from 'react-router-dom';
import { Home, Menu } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'menu',
        element: <Menu />
      }
    ]
  }
]);

export default router;
