// src/components/layout/SideDrawer.tsx
import React from "react"; // Added React import
import Link from "next/link";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box"; // Import Box
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, Theme, CSSObject } from "@mui/material/styles";
// Corrected Lucide Icon imports
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Import navigation config and types
import {
  drawerWidth,
  mainNavItems,
  secondaryNavItems,
  NavItem,
  UserRole,
} from "@/config/navigation";

import { useAuth } from "@/providers/AuthProviders";
import { Typography } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Updated DrawerHeader: removed justifyContent, added padding for logo
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: "flex-end", // Removed to allow logo at start
  padding: theme.spacing(0, 1), // Keep horizontal padding
  position: "relative", // Needed for absolute positioning of button if kept
  ...theme.mixins.toolbar,
}));

// Keep StyledIconButton as you defined it
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "-10px",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  boxShadow: theme.shadows[3],
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const renderNavList = (
  items: NavItem[],
  open: boolean,
  isAuthenticated: boolean,
  userRole: UserRole | null
) => {
  const visibleItems = items.filter((item) => {
    if (item.public) return true;
    if (!isAuthenticated) return false;
    if (!item.roles) return true;
    return userRole && item.roles.includes(userRole); // Show if user has one of the required roles
  });

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <List>
      {/* FIX: Map over the filtered 'visibleItems' array */}
      {visibleItems.map((item) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={Link}
            href={item.href}
            title={item.text} // Add title for tooltip when closed
            aria-label={item.text}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
// Props for SideDrawer component
interface SideDrawerProps {
  open: boolean;
  handleDrawerClose: () => void; // Renamed for clarity, maps to closing action
}

export function SideDrawer({ open, handleDrawerClose }: SideDrawerProps) {
  const { isAuthenticated, user } = useAuth();
  const userRole = (user?.role as UserRole | null) ?? "guest";

  const ToggleIcon = open ? ChevronLeft : ChevronRight;

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            pl: 2,
            opacity: 1,
            transition: (theme) =>
              theme.transitions.create("opacity", {
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}>
          <Link
            href="/"
            passHref
            style={{ display: "inline-flex", alignItems: "center" }}>
            {/* <Image
              src="/favicon.ico" // Assumes favicon is in /public folder
              alt="Logo"
              width={32} // Adjust size as needed
              height={32}
              style={{ marginRight: "8px" }}
            /> */}
            <Icon fontSize={20} icon={'ant-design:code-filled'}/>
            {open && (
              <Typography variant="h6" noWrap>
                CodeMaster
              </Typography>
            )}
          </Link>
        </Box>

        <StyledIconButton
          onClick={handleDrawerClose}
          aria-label={open ? "close drawer" : "open drawer"}>
          <ToggleIcon size={15} />
        </StyledIconButton>
      </DrawerHeader>
      <Divider />

      {renderNavList(mainNavItems, open, isAuthenticated, userRole)}

      {isAuthenticated && (
        <>
          <Divider />
          {renderNavList(secondaryNavItems, open, isAuthenticated, userRole)}
        </>
      )}
    </Drawer>
  );
}
