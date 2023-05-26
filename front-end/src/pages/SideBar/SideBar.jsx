import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SideNavBar = () => {
	function logout() {
		axios
			.post("/logout")
			.then(() => {
				window.location.reload(true);
			})
			.catch((error) => {
				toast(error.response.data.error);
			});
	}

	return (
		<div
			style={{
				width: "250px",
				backgroundColor: "#29282d",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				padding: "0px 8px",
			}}
			className="cont"
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					paddingTop: "60px",
				}}
				className="sec"
			>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/edit-profile"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-person"
							viewBox="0 0 16 16"
						>
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
						</svg>
						<div style={{ fontSize: "14px" }}>Profile</div>
					</div>
				</Link>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							marginTop: "3px",
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-speedometer2"
							viewBox="0 0 16 16"
						>
							<path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
							<path
								fill-rule="evenodd"
								d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
							/>
						</svg>
						<div style={{ fontSize: "14px" }}>Dashboard</div>
					</div>
				</Link>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/service"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							marginTop: "3px",
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-gear"
							viewBox="0 0 16 16"
						>
							<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
							<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
						</svg>
						<div style={{ fontSize: "14px" }}>Service</div>
					</div>
				</Link>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/service-manage"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							marginTop: "3px",
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-gear"
							viewBox="0 0 16 16"
						>
							<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
							<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
						</svg>
						<div style={{ fontSize: "14px" }}>Manage Services</div>
					</div>
				</Link>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/fonction"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							marginTop: "3px",
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-people"
							viewBox="0 0 16 16"
						>
							<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
						</svg>
						<div style={{ fontSize: "14px" }}>Fonction</div>
					</div>
				</Link>
				{/* // *-------------------------------------------------------------- */}
				<Link to={"/fonction-manage"} style={{ textDecoration: "none" }}>
					<div
						className="d-flex align-items-center navItem"
						style={{
							marginTop: "3px",
							padding: "4px 10px",
							borderRadius: "4px",
							gap: "8px",
							color: "#ECECEF",
						}}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = "#3a393d";
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = "transparent";
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-people"
							viewBox="0 0 16 16"
						>
							<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
						</svg>
						<div style={{ fontSize: "14px" }}>Manage Fonctions</div>
					</div>
				</Link>
			</div>
			<div style={{ width: "100%", height: "10%" }} className="sec">
				<div
					className="d-flex align-items-center navItem"
					style={{
						marginTop: "3px",
						padding: "4px 10px",
						borderRadius: "4px",
						gap: "8px",
						color: "#ECECEF",
						cursor: "pointer",
					}}
					onMouseEnter={(e) => {
						e.target.style.backgroundColor = "#3a393d";
					}}
					onMouseLeave={(e) => {
						e.target.style.backgroundColor = "transparent";
					}}
					onClick={logout}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-box-arrow-left"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
						/>
						<path
							fill-rule="evenodd"
							d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
						/>
					</svg>
					<div style={{ fontSize: "14px" }}>Logout</div>
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;
