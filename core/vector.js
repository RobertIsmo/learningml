const assert = require('./assert');
const Matrix = require('./matrix');

const vector = (...args) => {
	const size = args.length
	let vec = Array(size)
	for (let i = 0; i < size; i++) {
		vec[i] = [args[i]]
	}
	return Matrix.matrix(size, 1, vec, true)
}
const constant = (size, c) => {
	let vec = Array(size)
	for (let i = 0; i < size; i++) {
		vec[i] = [c]
	}
	return Matrix.matrix(size, 1, vec, true)
}
const random = (size) => {
	let vec = Array(size)
	for (let i = 0; i < size; i++) {
		vec[i] = [2*Math.random() - 1]
	}
	return Matrix.matrix(size, 1, vec, true)
}

module.exports = {vector, constant, random}