import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginMainPage from "../pages/AuthPages/Login/LoginMainPage";
import RegisterMainPage from "../pages/AuthPages/Register/RegisterMainPage";
import ClockinMainPage from "../pages/Clockin-out/ClockinMainPage";
import ProfileRecordMainPage from "../pages/Profile/Profile_Record/ProfileRecordMainPage";
import ProfileLeaveMainPage from "../pages/Profile/Profile_Request/ProfileLeaveMainPage";
import DashboardMainPage from "../pages/ManagePages/Dashboard/DashboardMainPage";
import IncomingRequestMainPage from "../pages/ManagePages/IncomingRequest/IncomingRequestMainPage";
import MainLayout from "../pages/MainLayout";
import ProfileMainPage from "../pages/Profile/ProfileMainPage";
import PersonalProfilePage from "../pages/Profile/Profile_PersonalProfile/PersonalProfilePage";
import PeoplePage from "../pages/Profile/Profile_People/PeoplePage";
import ProfileOTMainPage from "../pages/Profile/Profile_Request/ProfileOTMainPage";
import MyLeavePage from "../pages/Profile/Profile_Request/MyLeavePage";
import LeaveFormPage from "../pages/Profile/Profile_Request/LeaveFormPage";

export default function Route() {
  const router = createBrowserRouter([
    { path: "/login", element: <LoginMainPage /> },
    { path: "/register", element: <RegisterMainPage /> },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <h1>Not Found</h1>,
      children: [
        { path: "/clockin", element: <ClockinMainPage /> },
        {
          path: "/profile",
          element: <ProfileMainPage />,
          children: [
            { path: "/profile/", element: <PersonalProfilePage /> },
            { path: "/profile/record", element: <ProfileRecordMainPage /> },
            { path: "/profile/people", element: <PeoplePage /> },
            {
              path: "/profile",
              element: <ProfileLeaveMainPage />,
              children: [
                { path: "/profile/leave", element: <LeaveFormPage /> },
                { path: "/profile/myleave", element: <MyLeavePage /> },
              ],
            },
            { path: "/profile/OT", element: <ProfileOTMainPage /> },
          ],
        },
      ],
    },
    {
      path: "/manage",
      element: (
        <div>
          Manage Page
          <Outlet />
        </div>
      ),
      children: [
        { path: "/manage/dashboard", element: <DashboardMainPage /> },
        {
          path: "/manage/incomingrequest",
          element: <IncomingRequestMainPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
