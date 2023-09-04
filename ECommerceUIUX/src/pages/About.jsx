import React from "react";
import about from "/image/about.avif";
import "../App.css";

import AddCardIcon from "@mui/icons-material/AddCard";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";

const About = () => {
	return (
		<div className="form-container">
			<div className="form-card text-center" style={{ width: "50rem" }}>
				<div className="space-between">
					<div>
						<img className="about-image" src={about} alt="" />
					</div>
					<div>
						<p className="about-desc">
							<div className="flex-center gap-2 mb-2">
								<StoreIcon />
								<ShoppingBagIcon />
								<AirplanemodeActiveIcon />
								<AddCardIcon />
							</div>
							E-commerce (electronic commerce) is the buying and selling
							of goods and services, or the transmitting of funds or
							data, over an electronic network, primarily the internet.
							These business transactions occur either as
							business-to-business (B2B), business-to-consumer (B2C),
							consumer-to-consumer or consumer-to-business. The terms
							e-commerce and e-business are often used interchangeably.
							The term e-tail is also sometimes used in reference to the
							transactional processes that make up online retail
							shopping.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
