import { House   ,Calendar , Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";

import ProfileImage from "@/assets/profile.jpg";
import RoomImage from "@/assets/room4-2.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/",
            },
            {
                label: "Calendar",
                icon: Calendar ,
                path: "/calendar",
            },
            {
                label: "Reports",
                icon: NotepadText,
                path: "/reports",
            },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Customers",
                icon: Users,
                path: "/customers",
            },
            {
                label: "New customer",
                icon: UserPlus,
                path: "/new-customer",
            }
        ],
    },
    {
        title: "Rooms",
        links: [
            {
                label: "Rooms",
                icon: House   ,
                path: "/rooms",
            }
        ],
    },
    {
        title: "Bookings",
        links: [
            {
                label: "Bookings",
                icon: Package,
                path: "/bookings",
            },
            {
                label: "New booking",
                icon: PackagePlus,
                path: "/new-bookings",
            }
        ],
    },
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/settings",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];

export const topBookings = [
  {
    number: 1,
    bookingReference: "BK-20240601-001",
    room: {
      name: "Deluxe Suite",
      image: RoomImage,
    },
    customer: {
      firstName: "John",
      lastName: "Doe",
    },
    checkIn: "2025-06-20",
    checkOut: "2025-06-25",
    status: "CONFIRMED",
  },
  {
    number: 2,
    bookingReference: "BK-20240601-002",
    room: {
      name: "Standard Room",
      image: RoomImage,
    },
    customer: {
      firstName: "Alice",
      lastName: "Smith",
    },
    checkIn: "2025-06-18",
    checkOut: "2025-06-22",
    status: "PENDING",
  },
  {
    number: 3,
    bookingReference: "BK-20240601-003",
    room: {
      name: "Executive Suite",
      image: RoomImage,
    },
    customer: {
      firstName: "Robert",
      lastName: "Johnson",
    },
    checkIn: "2025-07-01",
    checkOut: "2025-07-05",
    status: "CANCELLED",
  },
  {
    number: 4,
    bookingReference: "BK-20240601-004",
    room: {
      name: "Family Room",
      image: RoomImage,
    },
    customer: {
      firstName: "Emma",
      lastName: "Wilson",
    },
    checkIn: "2025-06-30",
    checkOut: "2025-07-03",
    status: "CONFIRMED",
  },
  {
    number: 5,
    bookingReference: "BK-20240601-005",
    room: {
      name: "Penthouse",
      image: RoomImage,
    },
    customer: {
      firstName: "Liam",
      lastName: "Brown",
    },
    checkIn: "2025-07-10",
    checkOut: "2025-07-15",
    status: "PENDING",
  },
];
