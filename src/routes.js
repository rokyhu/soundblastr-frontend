/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import UserPage from "views/User.js";
import EventProfile from "views/EventProfile.js";
import Bands from "views/Bands";
import Events from "views/Events";

var routes = [
  {
    path: "/main",
    name: "Main Page",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",
    icon: "nc-icon nc-diamond",
    component: Events,
    layout: "/admin",
  },
  {
    path: "/bands",
    name: "bands",
    icon: "nc-icon nc-diamond",
    component: Bands,
    layout: "/admin",
  },
  {
    path: "/venues",
    name: "Venues",
    icon: "nc-icon nc-diamond",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/event-profile",
    name: "Event Details",
    icon: "nc-icon nc-calendar-60",
    component: EventProfile,
    layout: "/admin",
  },
];
export default routes;
