const assert = require('./assert');
const F = require('./forward');
const Binary = require('./binary');
const Matrix = require('./matrix');

const train = (array_of_inputs, array_of_images, network, epochs, cost, optimizer) => {
	assert(array_of_inputs.length === array_of_images.length)
	let newweights = network.weights.slice();
	let newbiases = network.biases.slice();
	let newactivations = network.activations.slice()
	for(let n = 0; n < epochs; n++) {
		let deltaweights = []
		let deltabiases = []
		error = []
		for(let i = 0; i < array_of_inputs.length; i++) {
			let dw = Array(network.depth)
			let db = Array(network.depth)
			const input =  array_of_inputs[i];
			const desired = array_of_images[i];
			const obj = F.feedforward(input,network,true)

			error.push(cost.f(obj.output, desired))
			obj.as.pop()

			let lhs = cost.derivative(obj.output, desired)
			for(let j = 0; j < network.depth; j++) {
				const rhs = obj.zs.pop().apply(network.activations.pop().derivative)
				delta = optimizer(Binary.hadamard(lhs, rhs))

				db[network.depth-(1+j)] = delta

				const weights = network.weights.pop();
				const activations = obj.as.pop()
				const tempweights = Matrix.constant(weights.rows, weights.colomns, 0);
				for(let k = 0; k < weights.rows; k++) {
					for(let l = 0; l < weights.colomns; l++) {
						tempweights.set(k, l, activations.get(l) * delta.get(k))
					}
				}
				dw[network.depth-(1+j)] = tempweights
				lhs = Binary.multiply(weights.transpose(), delta)
			}
			deltaweights.push(dw);
			deltabiases.push(db);
			network.weights = newweights.slice();
			network.biases = newbiases.slice();
			network.activations = newactivations.slice();
		}
		const finaldeltaweights = deltaweights.reduce((p, c) => {
			let array = Array(c.length);
			for(let i = 0; i < array.length; i++) {
				array[i] = Binary.add(p[i], c[i].apply(x=>x/array_of_images.length))
			}
			return array
		})
		const finaldeltabiases = deltabiases.reduce((p, c) => {
			let array = Array(c.length);
			for(let i = 0; i < array.length; i++) {
				array[i] = Binary.add(p[i], c[i].apply(x=>x/array_of_images.length))
			}
			return array
		})
		for(let i = 0; i < finaldeltabiases.length; i++) {
			newweights[i] = Binary.add(newweights[i], finaldeltaweights[i]);
			newbiases[i] = Binary.add(newbiases[i], finaldeltabiases[i])
		}
		network.weights = newweights.slice();
		network.biases = newbiases.slice();
		network.activations = newactivations.slice();
		const overallerror = error.reduce((p,c) => p + c)/array_of_images.length
		console.log(overallerror)
	}
	return network;
}

module.exports = {train}