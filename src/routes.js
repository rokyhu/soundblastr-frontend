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
import LoginForm from "views/LoginForm";
import NewEventProfile from "views/NewEventProfile";
import BandProfileNew from "views/profile/BandProfileNew";
import VenueDetailNew from "views/VenueDetailNew";

export const loggedInRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-globe",
    component: Dashboard,
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
    path: "/event/new",
    name: "Add new event",
    icon: "nc-icon nc-single-copy-04",
    component: NewEventProfile,
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
    path: "/band/new",
    name: "Add new band",
    icon: "nc-icon nc-single-copy-04",
    component: BandProfileNew,
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
    path: "/venue/new",
    name: "Add new venue",
    icon: "nc-icon nc-single-copy-04",
    component: VenueDetailNew,
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

export const backendRoutes = {
  event: {
    base: "http://localhost:8080/event/",
    all: "http://localhost:8080/event/all",
  },
  band: {
    base: "http://localhost:8080/band/",
    all: "http://localhost:8080/band/all",
  },
  venue: {
    base: "http://localhost:8080/venue/",
    all: "http://localhost:8080/venue/all",
  },
  auth: {
    loginUrl: "http://localhost:8080/auth/login",
  },
  genre: {
    all: "http://localhost:8080/band/getGenres",
  },
};
