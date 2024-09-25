import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './App';
import Detalhes from './pages/detalhes';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "hotel/:hotelId",
        element: <Detalhes />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
