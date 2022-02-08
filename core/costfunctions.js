const Binary = require('./binary');

const leastsquares = (output, desired) => {
	const error = Binary.subtract(output, desired)
	return Binary.dot(error,error)/2
}
const dleastsquares = (output, desired) => {
	const error = Binary.subtract(output, desired)
	return error
}

module.exports = {
	leastsquares: {
		f: leastsquares,
		derivative: dleastsquares
	}
	
}