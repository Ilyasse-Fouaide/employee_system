import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const clientId =
	"148472272974-d6o9kb5q144tsv68u2omadd0uhf8n650.apps.googleusercontent.com";

function Register() {
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const [userData, setUserData] = useState();

	useEffect(() => {
		function start() {
			gapi.auth2.getAuthInstance({
				clientId: clientId,
				scope: "profile",
			});
		}
		gapi.load("client:auth", start);
	});

	useEffect(() => {
		if (userData) {
			window.location.href = `/google?userData=${JSON.stringify(userData)}`;
		}
	}, [userData]);

	function onSuccess(res) {
		setUserData(res?.profileObj);
	}

	function onFailure(res) {
		console.log("onFailure", res);
	}

	function register(event) {
		event.preventDefault();
		axios
			.post("/register", { username, email, password })
			.then((response) => {
				window.location.href = "/login";
			})
			.catch((error) => {
				toast.warn(error.response.data.error);
			});
	}

	return (
		<div
			style={{ width: "100%", height: "80vh" }}
			className="container d-flex flex-column justify-content-center align-items-center"
		>
			<form
				style={{
					width: "380px",
					padding: "30px",
					border: "1px solid #e5e5e5",
				}}
				onSubmit={register}
				// className="border"
			>
				<div className="mb-3">
					<label>Username</label>
					<input
						type="text"
						className="form-control"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label>Email address</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="d-grid">
					<button type="submit" className="btn btn-primary">
						Register
					</button>
					<ToastContainer
						position="top-center"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
						theme="light"
					/>
				</div>
				<div className="d-grid d-flex justify-content-center align-items-center mt-3">
					<div
						style={{ width: "100%", height: "1px", background: "#e5e5e5" }}
					></div>
					<div style={{ margin: "0px 12px" }}>OR</div>
					<div
						style={{ width: "100%", height: "1px", background: "#e5e5e5" }}
					></div>
				</div>
				<div
					className="d-grid d-flex justify-content-center align-items-center mt-3"
					style={{ padding: "10px 0" }}
					id="signInButton"
				>
					{/* // * login button google */}
					<GoogleLogin
						clientId={clientId}
						buttonText="Login with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={"single_host_origin"}
						isSignedIn={true}
					/>
				</div>
			</form>
			<div
				style={{
					width: "380px",
					padding: "3px 30px",
					border: "1px solid #e5e5e5",
				}}
				className="mt-2"
			>
				<p className="forgot-password text-right mt-4 text-center text-muted">
					Already registered ? <Link to="/login">LogIn</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
