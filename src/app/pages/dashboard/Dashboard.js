import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visitChartData: {},
			impressionChartData: {},
			conversionChartData: {},
			downloadChartData: {},
			salesStatisticsChartData: {},
			netProfitChartData: {},
			totaltransactionChartData: {},
			areaOptions: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							display: false,
						},
					],
					xAxes: [
						{
							display: false,
						},
					],
				},
				legend: {
					display: false,
				},
				elements: {
					point: {
						radius: 0,
					},
					line: {
						tension: 0,
					},
				},
				stepsize: 100,
			},

			inputValue: '',
			active: '',
		};
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<Helmet defer={false}>
					<title>Dashboard - {process.env.REACT_APP_NAME}</title>
				</Helmet>
				<div className="row page-title-header">
					<div className="col-12">
						<div className="page-header">
							<h4 className="page-title">Dashboard</h4>
						</div>
					</div>
				</div>
				<div className="row"></div>
			</div>
		);
	}
}
export default Dashboard;
