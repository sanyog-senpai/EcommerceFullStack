import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";

import "../App.css";

import Logout from "@mui/icons-material/Logout";
import { Badge, Button, Grid, Popover, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import avatar2 from "/avatar/avatar2.jpg";
import logo from "/logo/logo.png";

// const pages = ["About", "Product", "Contact"];
const settings = ["Profile", "Logout"];

function NavigationBar() {
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const userFirstName = localStorage.getItem("firstName");

	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
			>
				<Grid sx={{ padding: "1rem" }}>
					<Typography sx={{ p: 2 }}>
						Are you sure you want to logout ?
					</Typography>
					<Stack
						direction="row"
						spacing={2}
						sx={{ justifyContent: "flex-end" }}
					>
						<Button
							variant="contained"
							onClick={() => {
								handleLogout();
								handleClose();
							}}
						>
							Yes
						</Button>
						<Button variant="outlined" onClick={() => handleClose()}>
							No
						</Button>
					</Stack>
				</Grid>
			</Popover>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<img className="logo" src={logo} alt="" />

						<Box className="nav-items">
							<Link to="/">
								<Typography>Home</Typography>
							</Link>
							<Link to="/products">
								<Typography>Product</Typography>
							</Link>
							<Link to="/about">
								<Typography>About</Typography>
							</Link>
						</Box>

						<Box
							sx={{
								flexGrow: 0,
								display: "flex",
								alignItems: "center",
								gap: "1.5rem",
							}}
						>
							<Badge badgeContent={4} color="error">
								<ShoppingCartIcon sx={{ fontSize: "1.755rem" }} />
							</Badge>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={userFirstName} src={avatar2} />
								</IconButton>
							</Tooltip>
							<div className="flex">
								<WavingHandIcon style={{ marginRight: "1rem" }} /> Hi,
								{userFirstName}
							</div>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{/* {settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))} */}
								<MenuItem
									sx={{ width: "15rem" }}
									onClick={() => navigate("user-details")}
								>
									<Avatar
										sx={{ marginRight: "10px" }}
										alt={userFirstName}
										src={avatar2}
									/>
									Profile
								</MenuItem>
								<MenuItem sx={{ width: "15rem" }} onClick={handleClick}>
									<Logout fontSize="small" sx={{ margin: "10px" }} />
									Logout
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
export default NavigationBar;
