import React, { FC, ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchBarComponent from "../SearchBar/SearchBar";
import "./Navbar.css";
import logo  from "../../img/logo.png";


const Navbar: FC = (): ReactElement => {
  return (
    <AppBar
      position="static"
     className="appBar"
    >
      <Toolbar>
      <img src={logo} alt="Logo" className="logo"/>

        <div className="searchBar">
          <SearchBarComponent />
        </div>

        <Button color="inherit" style={{ marginLeft: "auto" }}>
          Your Button
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;