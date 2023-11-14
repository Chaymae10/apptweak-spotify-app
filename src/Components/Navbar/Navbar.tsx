import React, { FC, ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchBarComponent from "../SearchBarComponent/SearchBarComponent";

const Navbar: FC = (): ReactElement => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundClip: "#1db954",
        backgroundColor: "#1db954",
        marginRight: 50,
      }}
    >
      <Toolbar>
        <Typography variant="h6">Spotify Logo</Typography>

        <div style={{ width: 600, marginLeft: 50, marginRight: 50 }}>
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
