
import { FaCar, FaFileInvoiceDollar } from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const UserDrawerData: DrawerData[] = [
  {
    id: "cars",
    name: "Cars",
    icon: FaCar,
    link: "/admin/cars", 
  },
  {
    id: "bookings",
    name: "Bookings",
    icon: FaFileInvoiceDollar,
    link: "/admin/bookings",
  },
  {
    id: "payments",
    name: "Payments",
    icon: FaFileInvoiceDollar,
    link: "/admin/payments",
  },
];
