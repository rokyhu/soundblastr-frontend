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
import React, { useState, useEffect, useRef } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import { loggedInRoutes, loggedOutRoutes } from "routes.js";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [activeColor, setActiveColor] = useState("warning");

  const [userLogin, setUserLogin] = useState(null);

  const [availableMenuItems, setAvailableMenuItems] = useState(loggedOutRoutes);

  const mainPanel = useRef();
  const location = useLocation();


  useEffect(() => {
    const username = localStorage.getItem("username");
    const roles = localStorage.getItem("roles");
    const token = localStorage.getItem("token");
    if(token != null && roles != null && username != null ){
      setUserLogin({
        username: username,
        roles: roles,
        token: token,
      })
    }
  }, []);



  useEffect(() => {
    if(userLogin){
      setAvailableMenuItems(loggedInRoutes)
    }else{
      setAvailableMenuItems(loggedOutRoutes);
    }
  }, [userLogin]);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={availableMenuItems}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} routes={availableMenuItems} />
        <Switch>
          {availableMenuItems.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={() => (
                  <prop.component
                    setUserLogin={setUserLogin}
                  />
                )}
                key={key}
              />
            );
          })}
        </Switch>
        {/* <Footer fluid /> */}
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  );
}

export default Dashboard;
