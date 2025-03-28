// src/components/layout/TopAppBar.tsx
import React, { useState } from "react"; // Import useState
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import {
  Sun,
  Moon,
  User as UserIconLucide,
  Settings,
  LogOut,
  Menu as MenuIcon,
  LogIn,
  UserPlus,
} from "lucide-react"; // Rename Menu to MenuIcon
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box"; // Needed for spacing workaround
import Menu from "@mui/material/Menu"; // Import Menu
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem
import ListItemIcon from "@mui/material/ListItemIcon"; // Import ListItemIcon
import Divider from "@mui/material/Divider"; // Import Divider
import Link from "next/link"; // For menu item links
import { useRouter } from "next/navigation"; // For logout redirect

import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { drawerWidth } from "@/config/navigation";
import { useAuth } from "@/providers/AuthProviders";
import { Button } from "@mui/material";

// Styled AppBar (no changes needed here)
interface CustomAppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
})<CustomAppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth-150}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth+20}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Props for TopAppBar component
interface TopAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  title: string;
}

export function TopAppBar({ open, handleDrawerOpen, title }: TopAppBarProps) {
  const { mode: currentThemeMode, toggleTheme } = useCustomTheme();
  const router = useRouter(); // Get router for navigation

  const { isAuthenticated, mockLogout } = useAuth(); // Get auth status and mock logout

  // State for the profile menu anchor
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle Logout Action
  const handleLogout = () => {
    handleCloseUserMenu(); // Close the menu first
    console.log("Simulating logout...");
    // --- Add actual logout logic here (clear tokens, context, etc.) ---

    // Redirect to login page
    router.push("/login");
  };

  return (
    <AppBar position="fixed" open={open} enableColorOnDark>
      <Toolbar>
        {/* {
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
        } */}

        {/* App Title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Theme Toggle Button - Always visible */}
        <Tooltip
          title={`Toggle ${currentThemeMode === "dark" ? "light" : "dark"} mode`}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme">
            {currentThemeMode === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </IconButton>
        </Tooltip>

        {/* Conditional Actions: User Menu or Login/Signup */}
        {isAuthenticated ? (
          // --- Authenticated User Actions ---
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user menu">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, ml: 1 }}
                color="inherit">
                <UserIconLucide size={24} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem
                component={Link}
                href="/profile"
                onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <UserIconLucide size={18} />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                href="/settings"
                onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <Settings size={18} />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogOut size={18} color="inherit" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          // --- Unauthenticated User Actions ---
          <Box sx={{ flexGrow: 0 }}>
            <Button
              color="inherit"
              startIcon={<LogIn size={18} />}
              component={Link}
              href="/login"
              sx={{ ml: 1 }}>
              Login
            </Button>
            <Button
              color="inherit" // Or maybe secondary/primary based on theme contrast
              variant="outlined" // Make signup slightly different
              startIcon={<UserPlus size={18} />}
              component={Link}
              href="/signup" // Assuming a signup page route
              sx={{ ml: 1 }}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
