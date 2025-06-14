import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Customers from "./components/customers";
import CreateCustomer from "./components/createCustomer";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "customers",
                    element: <Customers/>,
                },
                {
                    path: "new-customer",
                    element: <CreateCustomer/>,
                },
                {
                    path: "bookings",
                    element: <h1 className="title">Bookings</h1>,
                },
                {
                    path: "new-bookings",
                    element: <h1 className="title">New Booking</h1>,
                },
                
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
