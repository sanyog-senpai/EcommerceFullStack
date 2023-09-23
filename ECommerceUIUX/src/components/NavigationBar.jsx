import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

import "../App.css";

import Logout from "@mui/icons-material/Logout";
import { Badge, Button, Grid, Popover, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import avatar2 from "/avatar/avatar2.jpg";
import logo from "/logo/logo.png";

// const pages = ["About", "Product", "Contact"];
const settings = ["Profile", "Logout"];

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		margin: "0 auto",
		[theme.breakpoints.up("md")]: {
			width: "60ch",
		},
	},
}));

function NavigationBar() {
	const navigate = useNavigate();

	const userRole = localStorage.getItem("userRole");
	const userName = localStorage.getItem("userName");

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

	const [searchText, setSearchText] = React.useState();
	// console.log(searchText);

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

						<div style={{ marginLeft: "auto" }}>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									onChange={(event) =>
										setSearchText(event.target.value)
									}
									placeholder="Search Product…"
									inputProps={{ "aria-label": "search" }}
								/>
							</Search>
						</div>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								gap: "1.5rem",
								marginLeft: "auto",
							}}
						>
							<Box className="nav-items">
								<Link to="/home">
									<Typography>Home</Typography>
								</Link>
								<Link to="/products">
									<Typography>Product</Typography>
								</Link>
								<Link to="/about">
									<Typography>About</Typography>
								</Link>
								<Link to="/login">
									<Typography>Sign Up</Typography>
								</Link>
							</Box>
							<Badge badgeContent={4} color="error">
								<ShoppingCartIcon sx={{ fontSize: "1.755rem" }} />
							</Badge>

							{(userRole === "seller" || "buyer") && (
								<>
									<div className="flex">
										<Tooltip title="Open settings">
											<IconButton
												onClick={handleOpenUserMenu}
												sx={{ p: 0 }}
											>
												<Avatar alt={userName} src={avatar2} />
											</IconButton>
										</Tooltip>
										<div style={{ marginLeft: "0.3rem" }}>
											Hi,&nbsp;
											{userName}
										</div>
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
												alt={userName}
												src={avatar2}
											/>
											Profile
										</MenuItem>
										<MenuItem
											sx={{ width: "15rem" }}
											onClick={handleClick}
										>
											<Logout
												fontSize="small"
												sx={{ margin: "10px" }}
											/>
											Logout
										</MenuItem>
									</Menu>
								</>
							)}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
export default NavigationBar;
