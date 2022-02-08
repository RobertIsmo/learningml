const assert = require('./assert');

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

module.exports = {network, generate}