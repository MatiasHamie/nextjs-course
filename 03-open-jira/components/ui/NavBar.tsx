import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useContext } from "react";
import { UIContext } from "../../context/ui/UIContext";
import Link from "next/link";

interface Props {}

export const NavBar: FC<Props> = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>

        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Typography variant="h6">OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
