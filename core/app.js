const util = require('node:util');

const Matrix = require('./matrix');
const Vector = require('./vector');
const Cost = require('./costfunctions');
const Optimizer = require('./optimizer');
const F = require('./forward');
const Layer = require('./layer');
const Network = require('./network');
const Trainer = require('./train');


const print = x=> console.log(
	util.inspect(
		x,
		false,null,true)
);

const inputs = (n) => {
	let array = []
	for(let i = 0; i < n; i++) {
		const k = 5*Math.random();
		array.push(Vector.vector(k))
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

const input = inputs(50);

const prenetwork = Network.network(1,1,
	[
		Layer.layer(Layer.simple(1), Layer.relu)
	]
);

let network = Network.generate(prenetwork)

network = Trainer.train(input,outputs(input),network,450,Cost.leastsquares,Optimizer.linear(.01));

for(let i = 1; i < 11; i++) {
	print(F.feedforward(Vector.vector(i),network).output.values)
}
