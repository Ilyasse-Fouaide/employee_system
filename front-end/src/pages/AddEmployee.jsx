import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import userContext from "../context";
import Loading from "../Loading";
import SideNavBar from "./SideBar/SideBar";

const AddEmployee = () => {
	const { user, loading } = useContext(userContext);

	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [dateN, setDateN] = useState("");
	const [dateEmbauche, setDateEmbauche] = useState("");
	const [salaire, setSalaire] = useState("");

	if (user === "Unauthorized.") {
		window.location.href = "/login";
	}

	if (user && !user?.admin) {
		window.location.href = "/";
	}

	if (loading === true) {
		return <Loading />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const newEmployee = {
			nom,
			prenom,
			dateN,
			dateEmbauche,
			salaire,
		};

		axios
			.post("/employee/create", newEmployee)
			.then((response) => {
				setNom("");
				setPrenom("");
				setDateN("");
				setDateEmbauche("");
				setSalaire("");

				toast.success(response.data.message);
				setTimeout(() => {
					window.location.href = "/";
				}, 1000);
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	};

	/* // ! ---------------------- For Only Admin---------------------- */
	return (
		<div className="d-flex">
			{/* <SideNavBar /> */}
			<div className="mt-5" style={{ width: "100%", padding: "20px" }}>
				{/* <h1 className="text-center mb-4">Add Employee</h1> */}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="nom">
						<Form.Label>Nom:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter nom"
							value={nom}
							onChange={(e) => setNom(e.target.value)}
							// required
						/>
					</Form.Group>

					<Form.Group controlId="prenom">
						<Form.Label>Prénom:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter prenom"
							value={prenom}
							onChange={(e) => setPrenom(e.target.value)}
							// required
						/>
					</Form.Group>

					<Form.Group controlId="dateN">
						<Form.Label>Date de Naissance:</Form.Label>
						<Form.Control
							type="date"
							value={dateN}
							onChange={(e) => setDateN(e.target.value)}
							// required
						/>
					</Form.Group>

					<Form.Group controlId="dateEmbauche">
						<Form.Label>Date d'Embauche:</Form.Label>
						<Form.Control
							type="date"
							value={dateEmbauche}
							onChange={(e) => setDateEmbauche(e.target.value)}
							// required
						/>
					</Form.Group>

					<Form.Group controlId="salaire">
						<Form.Label>Salaire:</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter salaire"
							value={salaire}
							onChange={(e) => setSalaire(e.target.value)}
							// required
						/>
					</Form.Group>

					<Button variant="primary" type="submit" className="mt-3">
						Add Employee
					</Button>
				</Form>
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
		</div>
	);
};

export default AddEmployee;
