const learnml = require('learningml');
const util = require('node:util');

const print = x=> console.log(
	util.inspect(
		x,
		false,null,true)
);

const inputs = (n) => {
	let array = []
	for(let i = 0; i < n; i++) {
		const k = 5*Math.random();
		array.push(learnml.Vector.vector(k))
	}
	return array
}
const outputs = (inputs) => {
	let array = []
	inputs.forEach(input => {
		array.push(input.apply(x=>x/2))
	});
	return array
}

const input = inputs(500);

const prenetwork = learnml.Network.network(1,1,
	[
		learnml.Layer.layer(learnml.Layer.simple(1), learnml.Layer.relu)
	]
);

let network = learnml.Network.generate(prenetwork)

network = learnml.Trainer.train(input,outputs(input),network,450,learnml.Cost.leastsquares,learnml.Optimizer.linear(1));

for(let i = 1; i < 11; i++) {
	print(learnml.F.feedforward(learnml.Vector.vector(i),network).output.values)
}
