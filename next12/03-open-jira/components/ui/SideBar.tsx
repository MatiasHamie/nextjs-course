import { UIContext } from "@/context/ui";
import { InboxOutlined, MailOutline } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { FC, useContext } from "react";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

interface Props {}

export const SideBar: FC<Props> = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutline />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutline />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </Box>
    </Drawer>
  );
};
