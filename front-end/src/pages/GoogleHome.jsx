import React, { useContext, useEffect, useState } from "react";
import userContext from "../context";
import Loading from "../Loading";
import SideNavBar from "./SideBar/SideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const clientId =
	"148472272974-d6o9kb5q144tsv68u2omadd0uhf8n650.apps.googleusercontent.com";

function GoogleHome() {
	const location = useLocation();
	const path = new URLSearchParams(location.search);

	const userDataGoogle = JSON.parse(path.get("userData"));

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");

	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.get("/employee/get-all")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				setError(error.response.data);
			});
	}, []);

	useEffect(() => {
		const hasDisplayedToast = localStorage.getItem("hasDisplayedToast");

		if (!hasDisplayedToast) {
			toast("Welcome " + userDataGoogle.name);
			localStorage.setItem("hasDisplayedToast", true);
		}
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	function search() {
		axios
			.post(`/employee/get-employee`, { nom: searchQuery })
			.then((response) => {
				setSelectedEmployee(response.data);
				setShowModal(true);
			})
			.catch((error) => {
				toast.warn(error.response.data.error);
			});
	}

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedEmployee(null);
	};

	function onSuccess() {
		window.location.href = "/login";
	}

	return (
		<>
			<nav class="navbar navbar-expand-lg bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img
							src={`${userDataGoogle.imageUrl}`}
							alt="Bootstrap"
							width="30"
							height="30"
						/>
					</a>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#">
									Welcome {userDataGoogle.name}
								</a>
							</li>
						</ul>
						<form class="d-flex" role="search">
							<input
								class="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								value={searchQuery}
								onChange={handleSearch}
							/>
							<button
								class="btn btn-outline-success"
								type="button"
								onClick={search}
							>
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
			<div className="d-flex">
				<ToastContainer
					position="top-right"
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
				<div className="mt-5" style={{ width: "100%", padding: "20px" }}>
					{error && (
						<>
							<div class="alert alert-info" role="alert">
								No Employee Found
							</div>
						</>
					)}
					{data && (
						<>
							<div
								className="d-flex justify-content-between"
								style={{ gap: "8px" }}
							>
								<div></div>
								<GoogleLogout
									clientId={clientId}
									buttonText={"Logout"}
									onLogoutSuccess={onSuccess}
								/>
							</div>
							{/* <h1 className="text-center mt-5 mb-4">Employee List</h1> */}
							<table className="table table-striped table-hover mt-3">
								<thead className="thead-dark">
									<tr>
										<th>Nom et Prenom</th>
										<th>Date de Naissance</th>
										<th>Date Embauche</th>
										<th>Salaire</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((employee) => (
											<tr key={employee._id}>
												<td>{`${employee.nom} ${employee.prenom}`}</td>
												<td>{new Date(employee.dateN).toLocaleDateString()}</td>
												<td>
													{new Date(employee.dateEmbauche).toLocaleDateString()}
												</td>
												<td>{employee.salaire}</td>
											</tr>
										))}
								</tbody>
							</table>
						</>
					)}
					<Modal show={showModal} onHide={handleCloseModal}>
						<Modal.Header closeButton>
							<Modal.Title>Employee Information</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{selectedEmployee && (
								<div>
									<h5 className="mb-3">
										Name: {`${selectedEmployee.nom} ${selectedEmployee.prenom}`}
									</h5>
									<p className="mb-2">
										<strong>Date of Birth:</strong>{" "}
										{new Date(selectedEmployee.dateN).toLocaleDateString()}
									</p>
									<p className="mb-2">
										<strong>Date of Employment:</strong>{" "}
										{new Date(
											selectedEmployee.dateEmbauche
										).toLocaleDateString()}
									</p>
									<p className="mb-2">
										<strong>Salary:</strong> {selectedEmployee.salaire}
									</p>
								</div>
							)}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseModal}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</>
	);
}

export default GoogleHome;
