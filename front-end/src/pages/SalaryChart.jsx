import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import IconButton from "@mui/material/IconButton";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import PieChartIcon from "@mui/icons-material/PieChart";

const SalaryChart = ({ data }) => {
	const salaries = data.map((employee) => employee.salaire);
	const labels = data.map((employee) => `${employee.nom} ${employee.prenom}`);

	const backgroundColors = generateRandomColors(data.length);

	const [chartType, setChartType] = useState("bar");

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Salary",
				data: salaries,
				backgroundColor: backgroundColors,
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

	function BarChartIconClick() {
		setChartType("bar");
	}

	function DonutLargeIconClick() {
		setChartType("doughnut");
	}

	function PieChartIconClick() {
		setChartType("pie");
	}

	return (
		<div style={{ width: "50%", marginTop: "60px" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "35px",
				}}
			>
				<h1>Salary Chart</h1>
				<div>
					<span onClick={BarChartIconClick}>
						<IconButton>
							<BarChartIcon />
						</IconButton>
					</span>
					<span onClick={DonutLargeIconClick}>
						<IconButton>
							<DonutLargeIcon />
						</IconButton>
					</span>
					<span onClick={PieChartIconClick}>
						<IconButton>
							<PieChartIcon />
						</IconButton>
					</span>
				</div>
			</div>
			{chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
			{chartType === "doughnut" && (
				<Doughnut data={chartData} options={chartOptions} />
			)}
			{chartType === "pie" && <Pie data={chartData} options={chartOptions} />}
		</div>
	);
};

export default SalaryChart;

function generateRandomColors(count) {
	const colors = [];
	for (let i = 0; i < count; i++) {
		const color = `rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.6)`;
		colors.push(color);
	}
	return colors;
}

function getRandomValue() {
	return Math.floor(Math.random() * 256);
}
