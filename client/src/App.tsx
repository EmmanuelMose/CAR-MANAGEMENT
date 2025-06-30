// src/App.tsx
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import AboutPage from "./pages/Aboutpage";
import Landingpage from "./pages/Landingpage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyUser from "./pages/auth/VerifyUser";

// Components
import AdminDashboard from "./dashboard/AdminDashboard";
import Cars from "./dashboard/Admin/cars/Cars";
import Bookings from "./dashboard/Admin/bookings/Booking";
import Contact from "./components/Contact/Contact";
import Services from "./components/Services/Services";
import UserDashboard from "./dashboard/UserDashboard/UserDashboard";

const routes = [
  {
    path: '/',
    element: <Landingpage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/auth/verify',
    element: <VerifyUser />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/home',
    element: <Login />
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      {
        path: 'cars',
        element: <Cars />
      },
      {
        path: 'bookings',
        element: <Bookings />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
    children: [
      {
        path: 'cars',
        element: <Cars />
      },
      {
        path: 'bookings',
        element: <Bookings />
      }
    ]
  }
];


function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: 'bg-red-500 text-white',
            success: 'bg-green-500 text-white',
            info: 'bg-blue-500 text-white',
          },
        }}
      />
    </>
  );
}

export default App;
