const Matrix = require('./matrix');
const Vector = require('./vector');
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
			biases: Vector.random(size),
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
const gauss = activation(Activation.gauss, Activation.derivative.gauss)

module.exports = {simple, relu, sigmoid, gauss, layer}