import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Customers from "./components/customers";
import CreateCustomer from "./components/createCustomer";
import Bookings from "./components/bookings";
import  Settings  from "./components/settings";
import CalendarComponent from "./components/calendar";

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
                    path: "calendar",
                    element: <CalendarComponent/>,
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
                    element: <Bookings/>,
                },
                {
                    path: "new-bookings",
                    element: <h1 className="title">New Booking</h1>,
                },
                
                {
                    path: "settings",
                    element: <Settings/>,
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