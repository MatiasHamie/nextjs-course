import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
        </IconButton>

        <Link href={"/"}>
          <Typography variant="h6" color="white">
            CookieMaster
          </Typography>
        </Link>
        <div style={{ flex: 1 }} />
        <Link href={"/theme-changer"}>
          <Typography variant="h6" color="white">
            Cambiar Tema
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
