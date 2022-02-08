const assert = require('./assert');

const Matrix = require('./matrix');

const dot = (v1, v2) => {
	assert(v1.isvec && v2.isvec);
	assert(v1.values.length === v2.values.length);
	let v3 = Array(v1.values.length);
	for (let i = 0; i < v1.values.length; i++) {
		v3[i] = v1.values[i][0] * v2.values[i][0]
	}
	return v3.reduce((p, c) => p + c)
}
const multiply = (m1, m2) => {
	assert(m1.colomns === m2.rows)
	let m3 = Array(m1.rows)
	for (let i = 0; i < m1.rows; i++) {
		let row = Array(m2.colomns);
		for (let j = 0; j < m2.colomns; j++) {
			row[j] = dot(
				m1.getrow(i),
				m2.getcol(j)
			)
		}
		m3[i] = row
	}
	return Matrix.matrix(m1.rows, m2.colomns, m3, m2.isvec)
}
const add = (m1, m2) => {
	assert(m1.rows === m2.rows && m1.colomns === m2.colomns)
	let m3 = Array(m1.rows)
	for (let i = 0; i < m1.rows; i++) {
		let row = Array(m1.colomns);
		for (let j = 0; j < m1.colomns; j++) {
			row[j] = m1.values[i][j] + m2.values[i][j]
		}
		m3[i] = row
	}
	return Matrix.matrix(m1.rows, m1.colomns, m3, m2.isvec)
}
const subtract = (m1, m2) => {
	assert(m1.rows === m2.rows && m1.colomns === m2.colomns)
	let m3 = Array(m1.rows)
	for (let i = 0; i < m1.rows; i++) {
		let row = Array(m1.colomns);
		for (let j = 0; j < m1.colomns; j++) {
			row[j] = m1.values[i][j] - m2.values[i][j]
		}
		m3[i] = row
	}
	return Matrix.matrix(m1.rows, m1.colomns, m3, m2.isvec)
}
const hadamard = (m1, m2) => {
	assert(m1.rows === m2.rows && m1.colomns === m2.colomns)
	let m3 = Array(m1.rows)
	for (let i = 0; i < m1.rows; i++) {
		let row = Array(m1.colomns);
		for (let j = 0; j < m1.colomns; j++) {
			row[j] = m1.values[i][j] * m2.values[i][j]
		}
		m3[i] = row
	}
	return Matrix.matrix(m1.rows, m1.colomns, m3, m2.isvec)
}

module.exports = {dot, multiply, add, subtract, hadamard}