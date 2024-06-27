import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SuccessPage } from './success/page';
import { FailPage } from './fail/page';
import CheckoutPage from './checkout/page';

const router = createBrowserRouter([
    {
        path: '/sandbox',
        element: <CheckoutPage />,
    },
    {
        path: '/sandbox/success',
        element: <SuccessPage />,
    },
    {
        path: '/sandbox/fail',
        element: <FailPage />,
    },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
