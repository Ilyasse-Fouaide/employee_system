import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SideNavBar from "./SideBar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import userContext from "../context";
import Loading from "../Loading";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Service() {
	const { user, loading } = useContext(userContext);

	const [data, setData] = useState();
	const [error, setError] = useState();

	const [service, setService] = useState();
	const [serviceChange, setServiceChange] = useState();

	const [errorService, setErrorService] = useState();

	useEffect(() => {
		axios
			.get("/service/employee-without-service")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				setError(error.response.data);
			});
		axios
			.get("/service/find-all")
			.then((response) => {
				setService(response.data);
			})
			.catch((error) => {
				setErrorService(error.response.data);
			});
	}, []);

	if (user === "Unauthorized.") {
		window.location.href = "/login";
	}

	if (user && !user?.admin) {
		window.location.href = "/";
	}

	if (loading === true) {
		return <Loading />;
	}

	const handleChange = (event) => {
		setServiceChange(event.target.value);
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
							If you want to manage services for all employees,{" "}
							{/* // ! --------------Only Admin-------------- */}
							<Link to={"/manage-service-fonction"} className="alert-link">
								click here
							</Link>
						</div>
					</>
				)}
				{data && (
					<>
						{service && (
							<>
								<Stack
									sx={{ width: "100%" }}
									spacing={2}
									style={{ marginBottom: "15px" }}
								>
									<Alert icon={false} severity="info">
										If you want to add more services{" "}
										<Link
											to={"#"}
											onClick={() => {
												const servicePrompt = window.prompt("Add Service");
												if (servicePrompt) {
													axios
														.post(`/service/create`, {
															service: servicePrompt,
														})
														.then(() => {
															window.location.reload(true);
														});
												}
											}}
										>
											Click Here!.
										</Link>
									</Alert>
								</Stack>
							</>
						)}
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Nom et Prenom</TableCell>
										<TableCell align="right">Salaire</TableCell>
										<TableCell align="right">Services</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((row) => (
										<TableRow
											key={row.nom}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.nom} {row.prenom}
											</TableCell>
											<TableCell align="right">{row.salaire} (DH)</TableCell>
											{errorService ? (
												<TableCell align="right">
													<Link
														to={"#"}
														onClick={() => {
															const servicePrompt2 =
																window.prompt("Add Service");
															if (servicePrompt2) {
																axios
																	.post(`/service/create`, {
																		service: servicePrompt2,
																	})
																	.then(() => {
																		window.location.reload(true);
																	});
															}
														}}
													>
														Add Service
													</Link>
												</TableCell>
											) : (
												<>
													<TableCell align="right">
														<Box>
															<FormControl fullWidth>
																<InputLabel id="demo-simple-select-label">
																	Service
																</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={serviceChange}
																	label="Service"
																	onChange={handleChange}
																>
																	{service &&
																		service.map((item) => (
																			<MenuItem key={item._id} value={item._id}>
																				{item.service}
																			</MenuItem>
																		))}
																</Select>
															</FormControl>
														</Box>
													</TableCell>
												</>
											)}

											<TableCell align="right">
												<Button
													variant="contained"
													disableElevation
													disabled={errorService ? true : false}
													onClick={() =>
														axios
															.post(
																`/service/service-employee?service=${serviceChange}&employee=${row._id}`
															)
															.then((response) => {
																toast.success(response.data.message);
																setTimeout(() => {
																	window.location.reload(true);
																}, 2000);
															})
															.catch((error) => {
																toast.error(error.response.data.error);
															})
													}
												>
													Save
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<ToastContainer
									position="top-right"
									autoClose={2000}
									hideProgressBar={false}
									newestOnTop
									closeOnClick
									rtl={false}
									pauseOnFocusLoss={false}
									draggable
									pauseOnHover
									theme="light"
								/>
							</Table>
						</TableContainer>
					</>
				)}
			</div>
		</div>
	);
}
