import React, { useContext, useEffect, useRef, useState } from 'react';
import S3 from 'react-aws-s3';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import LoaderContext from '../../context/LoaderContext';
import config from '../../utils/aws-s3-config';
import axios from '../../utils/axios-default';

export default function MovieCreateOrEdit(props) {
	const [name, setName] = useState('');

	const [errorText, setErrorText] = useState('');
	const [isLoading, setLoading] = useState(false);

	const useLoaderContext = useContext(LoaderContext);
	const fileInputImagesRef = useRef();

	const handleSubmitForm = e => {
		e.preventDefault();
		const ReactS3Client = new S3(config('imagesVertical'));
		let filesArray = fileInputImagesRef.current.files;
		const handleS3FileUpload = file => {
			let newFileName = file.name.replace(/\..+$/, '');
			newFileName = parseInt(Math.random() * 10000000).toString() + '-' + newFileName;
			ReactS3Client.uploadFile(file, newFileName).then(data => {
				console.log(data);
				if (data.status === 204) {
					alert('success');
				} else {
					alert('failed');
				}
			});
		};
		for (let i = 0; i < filesArray.length; i++) {
			handleS3FileUpload(filesArray[i]);
		}
	};
	const blankInputs = () => {};
	useEffect(() => {}, []);

	return (
		<>
			<Helmet defer={false}>
				<title>New Movie - {process.env.REACT_APP_NAME}</title>
			</Helmet>
			<div className="">
				<div className="container">
					<div>
						<div className="row">
							<div className="col-lg-12 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title bg-light clearfix ">
											New Movie
										</h4>
										<div>
											<Form
												onSubmit={
													handleSubmitForm
												}
											>
												<Form.Group
													className="col-12"
													controlId="formBasicEmail"
												>
													<Form.Label>
														Name
													</Form.Label>
													<Form.Control
														type="text"
														placeholder="Enter name"
														value={
															name
														}
														onChange={e =>
															setName(
																e
																	.target
																	.value
															)
														}
														required={
															true
														}
													/>
												</Form.Group>

												<Form.Group
													className="col-12"
													controlId="formBasicEmail"
												>
													<Form.Label>
														Images
													</Form.Label>
													<Form.Control
														type="file"
														ref={
															fileInputImagesRef
														}
														required={
															true
														}
														multiple
													/>
												</Form.Group>

												<Form.Group
													style={{
														float: 'right',
													}}
												>
													<Button
														variant="primary"
														type="submit"
													>
														{isLoading
															? 'Loading…'
															: 'Submit'}
													</Button>
												</Form.Group>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
