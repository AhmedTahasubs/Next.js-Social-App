"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getData } from "@/store/slices/user.slice";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.userReducer.user);
  const token = useAppSelector((store) => store.userReducer.token);
  const pathName = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          router.push("/changePassword");
        }}
      >
        Change Password
      </MenuItem>
      <MenuItem
        onClick={() => {
          localStorage.removeItem("token");
          handleMenuClose();

          window.location.reload();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  React.useEffect(() => {
    if (token == null) {
      return
    } else {
      dispatch(getData());
    }
  }, [pathName]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, mr: 4 }}
          >
            Social App
          </Typography>
          {token ? (
            <>
              <Link
                href="/"
                className={`text-lg whitespace-nowrap font-medium p-1 mr-2 rounded-md transition-all duration-300 ${
                  pathName === "/" ? "bg-white text-[#1976d2] " : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/profile"
                className={`text-lg whitespace-nowrap font-medium p-1 mr-2 rounded-md transition-all duration-300 ${
                  pathName === "/profile" ? "bg-white text-[#1976d2] " : ""
                }`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-lg whitespace-nowrap font-medium p-1 rounded-md ml-auto transition-all duration-300 mr-2 ${
                  pathName === "/login" ? "bg-white text-[#1976d2]" : ""
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`text-lg whitespace-nowrap font-medium p-1 rounded-md transition-all duration-300 ${
                  pathName === "/signup" ? "bg-white text-[#1976d2]" : ""
                }`}
              >
                Signup
              </Link>
            </>
          )}

          {token ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {user ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.photo}
                      alt=""
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
