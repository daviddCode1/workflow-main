const idGenerator = () => {
	const timestamp = new Date().getTime().toString(36); // Convert timestamp to base36
	const randomStr = Math.random().toString(36).substr(2, 5); // Generate random string
	const uniqueId = `${timestamp}-${randomStr}`;

	return uniqueId;
};

export default idGenerator;
