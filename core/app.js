const util = require('util')

const Matrix = require('./matrix');
const Layer = require('./layers');
const Network = require('./network');
const Optimization = require('./optimization');

let network = Network.generate(Network.network(
	3,3,
	[
		Layer.layer(Layer.simple(5),Layer.sigmoid),
		Layer.layer(Layer.simple(5),Layer.relu),
		Layer.layer(Layer.simple(5),Layer.sigmoid),
		Layer.layer(Layer.simple(10),Layer.relu),
		Layer.layer(Layer.simple(10),Layer.sigmoid),
		Layer.layer(Layer.simple(5),Layer.relu),
		Layer.layer(Layer.simple(3),Layer.sigmoid),
	]
))

const inputs = (n) => {
	let array = []
	for(let i = 0; i < n; i++) {
		const k = 5*Math.random();
		array.push(Matrix.vec(k, k+1, k+2))
	}
	return array
}
const outputs = (inputs) => {
	let array = []
	inputs.forEach(input => {
		array.push(Matrix.apply(input, x=>x+3))
	});
	return array
}

let trainingdata = [inputs(1000), 0]
trainingdata[1] = outputs(trainingdata[0])

network = Optimization.train(trainingdata[0], trainingdata[1], network, 300, Optimization.leastsquareserror, Optimization.linear(.0015333));

console.log(
	util.inspect(
		Network.feedforward(Matrix.vec(3,9,18), network).output.values,
		//Matrix.subtract(o, image),
		{depth: null, colors: true}
	)
)
