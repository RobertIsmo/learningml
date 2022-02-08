const Binary = require('./binary');
const feedforward = (input, network, computegradients=false) => {
	let obj = {}
	let delta = []
	let zs = []
	let as = [input]
	let values = input
	for(let i = 0; i < network.depth; i++) {
		const W = network.weights[i]
		const B = network.biases[i]
		const s = network.activations[i].f

		const z = Binary.add(Binary.multiply(W, values), B)
		const a = z.apply(s);
		values = a
		if(computegradients) zs.push(z)
		if(computegradients) as.push(a)
	}
	obj.output = values;
	if(computegradients) obj.zs = zs
	if(computegradients) obj.as = as
	return obj
}

module.exports = {feedforward}