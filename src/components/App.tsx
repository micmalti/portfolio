import React from 'react';
import {
    Link,
    Outlet,
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

const Dashboard = () => <h1>Dashboard</h1>;
const Settings = () => <h1>Settings</h1>;
const Profile = () => <h1>Profile</h1>;

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

const Layout = () => (
  <div>
    <Navbar />
    <div>
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: 'dashboard',
    element: <Layout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> }
    ]
  }
]);

export const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};