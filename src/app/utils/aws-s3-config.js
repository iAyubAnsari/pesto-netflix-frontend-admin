function config(directory) {
	return {
		dirName: directory,
		bucketName: process.env.REACT_APP_BUCKET_NAME,
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
		s3Url: process.env.REACT_APP_S3_URL,
	};
}

export default config;
