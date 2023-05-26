import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const SalaryChart = ({ data }) => {
	const salaries = data.map((employee) => employee.salaire);
	const labels = data.map((employee) => `${employee.nom} ${employee.prenom}`);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Salary",
				data: salaries,
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div style={{ width: "50%", marginTop: "60px" }}>
			<h1>Salary Chart</h1>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
};

export default SalaryChart;
