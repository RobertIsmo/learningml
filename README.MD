## LearningML

Learningml is an open-source machine learning library for training models, currently only supports ANNs.

**Works in the browser or in node**

extremely flexible, with a focus on having minimal dependencies.

**Easy to work with**

made from the ground up in javascript, manipulate objects in an intuative way.

**Constantly expanding**

Plans to add gpu acceleration, alternative neural network architectures, and more!

## Examples
all examples can be viewed in the [examples folder](https://github.com/RobertIsmo/learningml/tree/master/examples).

    npm i learningml
to install the package.

```js
const lml = require('learningml');
```
to use in your project

you want your inputs to be flattened so you can put it into vector form.
```js
const input = lml.Vector.vector(x1, x2, x3, ..., xn)
```
this is how you can create a valide vector with the x's being the values that make up an input value.

```js
const output = input.apply(x => x/2)
```
this will make a new vector with values half that of the input

```js
const prenetwork = lml.Network.network(n,n,
	[
		lml.Layer.layer(lml.Layer.simple(n), lml.Layer.relu),
		lml.Layer.layer(lml.Layer.simple(n), lml.Layer.relu),
		lml.Layer.layer(lml.Layer.simple(n), lml.Layer.relu),
	]
);
```
next we need to define our network which takes in an `input size`, an `output size`, and a `array of layers`. a simple layer is simply a fully connected layer, and relu is the relu activation function.

```js
let network = lml.Network.generate(prenetwork)
```
we generate the network to finalize it(reccomended to use `let` instead of `const` here).

```js
const result = lml.F.feedforward(input, network)
```
to use the network with a given input.

```js
network = lml.Trainer.train(
	inputs,
	outputs,
	network,
	epochs,
	lml.Cost.leastsquares,
	lml.Optimizer.linear(.07)
)
```
you train the network by giving it an array of input and output vectors where:
```
(inputs[i], outputs[i]) //correspond to an input/output pair
```

once the network successfully trains you can use the model with the `feedforward` function.

## Contribution guide
want to contribute? thank you for your interest. there is no standard contribution workflow so just submit your issues and PR and I will look at them. Thank you!
