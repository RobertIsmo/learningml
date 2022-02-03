const Matrix = require('./matrix');
const assert = require('./assert');
const { kill } = require('nodemon/lib/monitor/run');

const network = (inputshape, outputshape, layers) => {
	return {
		inputshape,
		outputshape,
		layers
	}
}

const generate = (network) => {
	let weights = []
	let biases = []
	let activations = []
	let depth = 0
	let size = network.inputshape
	for(let i = 0; i < network.layers.length; i++) {
		obj = network.layers[i].parameters(size)
		size = obj.size;
		weights.push(obj.weights)
		biases.push(obj.biases)
		activations.push(network.layers[i].activationtype)
		depth++;
	}
	assert(size === network.outputshape)
	return {
		weights, biases, activations, depth
	}
}

const feedforward = (input, network, desired=false, errorfunc=false, computegradients=false) => {
	let obj = {}
	let delta = []
	let zs = []
	let as = [input]
	let values = input
	for(let i = 0; i < network.depth; i++) {
		const W = network.weights[i]
		const B = network.biases[i]
		const s = network.activations[i].f

		const z = Matrix.add(Matrix.multiply(W, values), B)
		const a = Matrix.apply(z, s);
		values = a
		if(computegradients) zs.push(z)
		if(computegradients) as.push(a)
	}
	obj.output = values;
	if(computegradients) obj.zs = zs
	if(computegradients) obj.as = as
	if(desired) obj.error = Matrix.subtract(obj.output, desired)
	if(errorfunc) obj.cost = errorfunc.error(Matrix.getcol(obj.error, 0))
	return obj
}

module.exports = {network, generate, feedforward}