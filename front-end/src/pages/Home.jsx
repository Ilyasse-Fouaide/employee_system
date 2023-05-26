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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SalaryChart from "./SalaryChart";

function Home() {
	const location = useLocation();
	const path = new URLSearchParams(location.search);

	const userDataGoogle = JSON.parse(path.get("userData"));

	const { user, loading } = useContext(userContext);

	const [data, setData] = useState([]);
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

	if (user === "Unauthorized.") {
		window.location.href = "/login";
	}

	if (loading === true) {
		return <Loading />;
	}

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

	return (
		<div className="d-flex">
			{/* <SideNavBar /> */}
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
							No Employee Found{" "}
							{user.admin && (
								<>
									{/* // ! --------------Only Admin-------------- */}
									<Link to={"/add-employee"} className="alert-link">
										Add new Employee
									</Link>
								</>
							)}
						</div>
					</>
				)}
				{data && (
					<>
						<div
							className="d-flex justify-content-between"
							style={{ gap: "8px" }}
						>
							<div class="input-group mb-3" style={{ width: "40%" }}>
								<input
									type="text"
									class="form-control"
									placeholder="Entrez le nom de l'employee . . ."
									aria-label="Recipient's username"
									aria-describedby="button-addon2"
									onChange={handleSearch}
								/>
								<button
									class="btn btn-outline-primary"
									type="button"
									id="button-addon2"
									onClick={search}
								>
									Search
								</button>
							</div>
							{/* // ! --------------Only Admin-------------- */}
							{user.admin && (
								<div>
									<Link to={"/add-employee"} style={{ cursor: "pointer" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="25"
											height="25"
											fill="currentColor"
											className="bi bi-plus-square"
											viewBox="0 0 16 16"
											style={{ color: "green" }}
										>
											<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
											<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
										</svg>
									</Link>
								</div>
							)}
						</div>
						{/* <h1 className="text-center mt-5 mb-4">Employee List</h1> */}
						<table className="table table-hover mt-3">
							<thead className="thead-dark">
								<tr>
									<th>Nom et Prenom</th>
									<th>Date de Naissance</th>
									<th>Date Embauche</th>
									<th>Salaire</th>
									{/* // ! --------------Only Admin-------------- */}
									{user.admin && <th>Update</th>}
									{user.admin && <th>Delete</th>}
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
											{/* // ! --------------Only Admin-------------- */}
											{user.admin && (
												<td>
													<IconButton
														aria-label="delete"
														color="primary"
														onClick={() => {
															window.location.href = `/edit-employee/${employee._id}`;
														}}
													>
														<EditIcon />
													</IconButton>
												</td>
											)}
											{/* // ! --------------Only Admin-------------- */}
											{user.admin && (
												<td>
													<IconButton
														aria-label="delete"
														color="error"
														onClick={() => {
															axios
																.delete(`/employee/delete/${employee._id}`)
																.then((response) => {
																	toast.success(response.data.message);
																	setTimeout(() => {
																		window.location.reload(true);
																	}, 1000);
																});
														}}
													>
														<DeleteIcon />
													</IconButton>
												</td>
											)}
										</tr>
									))}
							</tbody>
						</table>
					</>
				)}
				<SalaryChart data={data} />
				<Modal
					show={showModal}
					onHide={handleCloseModal}
					style={{ zIndex: "9999999999", marginTop: "200px" }}
				>
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
									{new Date(selectedEmployee.dateEmbauche).toLocaleDateString()}
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
	);
}

export default Home;
