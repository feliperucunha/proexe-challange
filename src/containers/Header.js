import React from "react";
import {headerText} from '../locales/en';

const Header = () => {
  return (
    <div className="DashboardNavbar">
      <div className="DashboardNavbar__Content">
        <h2>{headerText}</h2>
      </div>
    </div>
  );
};

export default Header;
