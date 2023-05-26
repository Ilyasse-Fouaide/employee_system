import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import userContext from "../context";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
	const { user, loading } = useContext(userContext);

	const [username, setUsername] = useState();
	const [email, setEmail] = useState();

	useEffect(() => {
		axios
			.get("/edit")
			.then((response) => {
				setUsername(response.data.user.username);
				setEmail(response.data.user.email);
			})
			.catch((error) => {
				toast.warn(error.response.data.error);
			});
	}, []);

	if (user === "Unauthorized.") {
		window.location.href = "/login";
	}

	if (loading === true) {
		return <Loading />;
	}

	function edit(ev) {
		ev.preventDefault();
		axios
			.put("/edit-profile", { username, email })
			.then((response) => {
				toast.success(response.data.message);
				setTimeout(() => {
					window.location.href = "/";
				}, 2000);
			})
			.catch((error) => {
				toast.warning(error.response.data.error);
			});
	}

	return (
		<div className="container d-flex justify-content-center">
			{/* {username} {email} */}
			<form
				className="row g-3 mt-5"
				style={{
					width: "800px",
					padding: "30px",
					border: "1px solid #e5e5e5",
				}}
				onSubmit={edit}
			>
				<div className="col-md-6">
					<label className="form-label">Username</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</div>
			</form>
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
	);
}

export default EditProfile;
