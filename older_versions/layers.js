const Matrix = require('./matrix');
const assert = require('./assert');
const Activation = require('./activation');

const layer = (parameters, activationtype) => {
	return {
		parameters,
		activationtype
	}
}
const simple = (size) => {
	return (inputsize) => {
		return {
			weights: Matrix.random(size, inputsize),
			biases: Matrix.random(size, 1),
			size
		}
	}
}
const activation = (f, derivative) => {
	return {
		isactivation: true,
		f,
		derivative
	}
}
const relu = activation(Activation.relu, Activation.derivative.relu)
const sigmoid = activation(Activation.sigmoid, Activation.derivative.sigmoid)

module.exports = {simple, relu, sigmoid, layer}