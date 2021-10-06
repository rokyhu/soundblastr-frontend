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
import Bands from "views/Bands";
import Venues from "views/Venues";
import Events from "views/Events";
import Icons from "views/Icons";
import LoginForm from "views/LoginForm";
import NewEventProfile from "views/NewEventProfile";

export const loggedInRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-globe",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-alert-circle-i",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",
    icon: "nc-icon nc-calendar-60",
    component: Events,
    layout: "/admin",
  },
  {
    path: "/bands",
    name: "bands",
    icon: "nc-icon nc-bold",
    component: Bands,
    layout: "/admin",
  },
  {
    path: "/venues",
    name: "Venues",
    icon: "nc-icon nc-bank",
    component: Venues,
    layout: "/admin",
  },
  {
    path: "/event/new",
    name: "Add new event",
    icon: "nc-icon nc-single-copy-04",
    component: NewEventProfile,
    layout: "/admin",
  },
];

export const loggedOutRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-alert-circle-i",
    component: LoginForm,
    layout: "/admin",
  },
];
