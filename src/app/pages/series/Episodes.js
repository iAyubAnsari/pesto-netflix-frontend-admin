import moment from 'moment';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LoaderContext from '../../context/LoaderContext';
import axios from '../../utils/axios-default';

export class Series extends Component {
	// const { dark, toggle } =
	static contextType = LoaderContext;

	constructor(props) {
		super(props);
		this.state = {
			series: {},
			data: [],
			deleteModalShow: false,
			deletableId: '',
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalRemarksClose = this.handleModalRemarksClose.bind(this);
	}
	handleDeleteModalClose() {
		this.setState({ deleteModalShow: false, deletableId: '' });
	}
	handleDeleteModal(id) {
		this.setState({ deleteModalShow: true, deletableId: id });
	}

	handleModalClose() {
		this.setState({ ...this.state, showModal: false });
	}

	handleModalRemarksClose() {
		this.setState({ ...this.state, showModalRemarks: false });
	}

	componentDidMount() {
		let { id, slug } = this.props.match.params;
		// console.log({ id, slug });
		axios.get('/series/s/' + slug).then(result => {
			this.setState({
				series: result.data,
				data: result.data.episodes,
			});
		});
	}

	handleDelete() {
		this.context.loadingText('Processing');
		this.context.toggleLoader(true);
		axios.delete('/series-episodes/' + this.state.deletableId + '/delete')
			.then(res => {
				alert('Deleted successfuly');
				this.handleDeleteModalClose();
				this.componentDidMount();
			})
			.catch(() => {
				alert('Something went wrong');
			})
			.finally(e => {
				this.context.toggleLoader(false);
			});
	}

	render() {
		return (
			<>
				<Helmet defer={false}>
					<title>Episodes - {process.env.REACT_APP_NAME}</title>
				</Helmet>
				<div className="container">
					<div className="col-lg-12 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title clearFixx">
									<div>Episodes [{this.state.series.title}]</div>
									<div className="linkNew">
										<Link
											to={`/series/episode/create/${this.state.series._id}`}
											className="btn btn-primary"
										>
											+ Add New
										</Link>
									</div>
								</h4>

								<div className="table-responsive">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th> # </th>
												<th> Date & Time </th>
												<th> Episode No </th>
												<th> Title </th>
												<th> Delete </th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map(
												(item, index) => (
													<tr
														key={
															index
														}
														style={{
															cursor: 'pointer',
														}}
													>
														<td className="py-1">
															{index +
																1}
														</td>
														<td>
															{moment(
																item.createdAt
															).format(
																'DD-MMM-YYYY hh:mm A '
															)}
														</td>
														<td>
															{
																item.episodeNo
															}
														</td>
														<td>
															{
																item.title
															}
														</td>

														<td>
															<button
																onClick={e => {
																	e.stopPropagation();
																	this.handleDeleteModal(
																		item._id
																	);
																}}
																className="btn btn-danger"
															>
																Delete
															</button>
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
									<div>
										{/* delete modal */}
										<Modal
											show={
												this.state
													.deleteModalShow
											}
											onHide={e =>
												this.handleDeleteModalClose()
											}
										>
											<Modal.Header closeButton>
												<Modal.Title>
													Confirmation
												</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<h5>
													Are you sure to
													delete this?
												</h5>
												<div
													style={{
														float: 'right',
													}}
												>
													<Button
														className="btn btn-secondary m-2"
														onClick={e =>
															this.handleDeleteModalClose()
														}
													>
														Cancel
													</Button>
													<Button
														className="btn btn-danger"
														onClick={e =>
															this.handleDelete()
														}
													>
														Delete
													</Button>
												</div>
											</Modal.Body>
										</Modal>
										{/* delete modal */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Series;
