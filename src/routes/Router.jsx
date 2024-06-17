import { createBrowserRouter } from 'react-router-dom';
import { Home, MapPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
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
