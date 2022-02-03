const assert = require('./assert');
const Matrix = require('./matrix');
const Network = require('./network');

const leastsquares = (error) => {
	return Matrix.dot(error,error)/2
}
const dleastsquares = (error) => {
	return error
}
const leastsquareserror = {
	error: leastsquares,
	derivative: dleastsquares
}

const linear = (lr) => {
	return (delta) => {
		return Matrix.apply(delta, x=>(-lr*x)+(.2*Math.random()-.1))
	}
}

const train = (array_of_inputs, array_of_images, network, epochs, errorfunc, optimizer) => {
	assert(array_of_inputs.length === array_of_images.length)
	let sweights = network.weights.slice();
	let sbiases = network.biases.slice();
	const sactivations = network.activations.slice();
	for(let n = 0; n < epochs; n++) {
		let dbiases = []
		let dweights = []
		error = []
		for (let i = 0; i < array_of_inputs.length; i++) {
			db = Array(network.biases.length)
			dw = Array(network.weights.length)
			const input = array_of_inputs[i];
			const desired = array_of_images[i];
			const obj = Network.feedforward(input, network, desired, errorfunc, true);
			error.push(obj.cost);
			obj.as.pop()

			let lhs = errorfunc.derivative(obj.error)
			for(let j = 0; j < network.depth; j++) {

				const rhs = Matrix.apply(obj.zs.pop(), network.activations.pop().derivative)
				delta = optimizer(Matrix.hadamard(lhs, rhs));

				db[network.depth-(1+j)] = delta

				const weights = network.weights.pop();
				const activations = obj.as.pop()
				const deltaweights = Matrix.constant(weights.rows, weights.colomns, 0);
				for(let k = 0; k < weights.rows; k++) {
					for(let l = 0; l < weights.colomns; l++) {
						Matrix.set(deltaweights, k, l, Matrix.get(activations,l,0) * Matrix.get(delta,k,0))
					}
				}
				dw[network.depth-(1+j)] = deltaweights
				lhs = Matrix.multiply(Matrix.transpose(weights), delta)
			}
			dbiases.push(db);
			dweights.push(dw);
			network.weights = sweights.slice();
			network.biases = sbiases.slice();
			network.activations = sactivations.slice();
		}
		const deltabiases = dbiases.reduce((p, c) => {
			let array = Array(c.length);
			for(let i = 0; i < array.length; i++) {
				array[i] = Matrix.add(p[i], Matrix.apply(c[i], x=>x/array_of_images.length))
			}
			return array
		})
		const deltaweights = dweights.reduce((p, c) => {
			let array = Array(c.length);
			for(let i = 0; i < array.length; i++) {
				array[i] = Matrix.add(p[i], Matrix.apply(c[i], x=>x/array_of_images.length))
			}
			return array
		})
		
		for(let i = 0; i < deltabiases.length; i++) {
			sweights[i] = Matrix.add(sweights[i], deltaweights[i]);
			sbiases[i] = Matrix.add(sbiases[i], deltabiases[i])
		}
		network.weights = sweights.slice();
		network.biases = sbiases.slice();
		network.activations = sactivations.slice();
		const overallerror = error.reduce((p,c) => p + c)/array_of_images.length
		if(n%23===0)console.log(`error after epoch ${n+1} is: ${overallerror}`)
	}
	return network;
}

module.exports = {train, leastsquareserror, linear}