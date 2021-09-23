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
import NewEventProfile from "views/NewEventProfile";

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
    component: Venues,
    layout: "/admin",
  },
  {
    path: "/event/new",
    name: "Add new event",
    icon: "nc-icon nc-calendar-60",
    component: NewEventProfile,
    layout: "/admin",
  },
];
export default routes;
