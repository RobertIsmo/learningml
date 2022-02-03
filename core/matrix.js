const assert = require('./assert');

const matrix = (row, col, values) => {
	assert(row === values.length)
	for (let i = 0; i < values.length; i++) {
		const element = values[i];
		assert(col === element.length)
	}
	return {
		rows: row,
		colomns: col,
		values,
		ismatrix: true
	}
}
const vec = (...args) => {
	const size = args.length
	let vector = Array(size)
	for (let i = 0; i < size; i++) {
		vector[i] = [args[i]]
	}
	return matrix(size, 1, vector)
}
const constant = (row, col, c) => {
	let m = Array(row);
	for (let i = 0; i < row; i++) {
		let r = Array(col)
		for (let j = 0; j < col; j++) {
			r[j] = c
		}
		m[i] = r
	}
	return matrix(row, col, m)
}
const random = (row, col) => {
	let m = Array(row);
	for (let i = 0; i < row; i++) {
		let r = Array(col)
		for (let j = 0; j < col; j++) {
			r[j] = 2*Math.random() - 1
		}
		m[i] = r
	}
	return matrix(row, col, m)
}
const get = (mat, i, j) => {
	return mat.values[i][j]
}
const set = (mat, i, j, value) => {
	mat.values[i][j] = value
}
const getrow = (mat, row) => {
	return mat.values[row];
}
const getcol = (mat, col) => {
	let colomn = Array(mat.rows)
	for (let i = 0; i < mat.rows; i++) {
		colomn[i] = mat.values[i][col];
	}
	return colomn
}
const dot = (v1, v2) => {
	assert(v1.length === v2.length);
	let v3 = Array(v1.length);
	for (let i = 0; i < v1.length; i++) {
		v3[i] = v1[i] * v2[i]
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
				getrow(m1, i),
				getcol(m2, j)
			)
		}
		m3[i] = row
	}
	return matrix(m1.rows, m2.colomns, m3)
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
	return matrix(m1.rows, m1.colomns, m3)
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
	return matrix(m1.rows, m1.colomns, m3)
}

const apply = (mat, f) => {
	let m = mat.values;
	for (let i = 0; i < mat.rows; i++) {
		for (let j = 0; j < mat.colomns; j++) {
			m[i][j] = f(m[i][j])
		}
	}
	return matrix(mat.rows, mat.colomns, m)
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
	return matrix(m1.rows, m1.colomns, m3)
}
const transpose = (mat) => {
	let m = Array(mat.colomns)
	for(let i = 0; i < mat.colomns; i++) {
		let row = Array(mat.rows)
		for(let j = 0; j < mat.rows; j++) {
			row[j] = mat.values[j][i]
		}
		m[i] = row
	}
	return matrix(mat.colomns, mat.rows, m)
}

module.exports = { matrix, getrow, getcol, dot, multiply, apply, add, constant, random, vec, subtract, get, transpose, hadamard, set}