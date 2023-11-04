import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Select } from "@material-ui/core";
import AdbIcon from "@mui/icons-material/Adb";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import "./styles/banner.css"
import AuthModal from "./Authentication/AuthModal";

const pages = ["home","explore", "investment"];
const settings = ["Profile", "Dashboard", "watchlists", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // =========================================================
  const { currency, setCurrency } = CryptoState();
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const currencyList = ["btc","eth","ltc","bch","bnb","eos","xrp","xlm","link","dot","yfi","usd","aed","ars","aud","bdt","bhd","bmd","brl","cad","chf","clp","cny","czk","dkk","eur","gbp","hkd","huf","idr","ils","inr","jpy","krw","kwd","lkr","mmk","mxn","myr","ngn","nok","nzd","php","pkr","pln","rub","sar","sek","sgd","thb","try","twd","uah","vef","vnd","zar","xdr","xag","xau","bits","sats",];
  // console.log(currency)
  return (
    <AppBar position="static" sx={{ bgcolor: "#fcba03" }} color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Crypto Trendz
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: "block", md: "none" },
              }}
              
            >
              {pages.map((page) => (
                <MenuItem key={page} value={page} onClick={handleCloseNavMenu}style={{backgroundColor:"white",textTransform:"uppercase",color:"black"}} >
                  <Link to={`/${page}`} >
                     <Typography textAlign="center" style={{color:"black",textTransform:"capitalize"}}>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            className="heading-brand-name-xs"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize:"1.35rem",
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".01rem",
              color: "inherit",
              textDecoration: "none",

            }}
          >
            Crypto Trendz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "flex" }, mr: 3 }}>
            <FormControl variant="standard" sx={{ m: 0, ml: 3, minWidth: 120 }}>
              {/* <InputLabel id="demo-simple-select-standard-label">currency</InputLabel> */}
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={currency}
                onChange={handleChange}
                label="currency"
                style={{textTransform:"uppercase"}}
              >
                {/* {currencyList.map((val)=><MenuItem value={val} style={{textTransform:"uppercase"}}>{val}</MenuItem>)} */}
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <AuthModal/>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {/* =====================Avatar==================== */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Kanhaiya shaw" src="/" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={`/${setting}`} textAlign="center">{setting}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
