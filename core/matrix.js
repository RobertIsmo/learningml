const assert = require('./assert');

const copy = (array) => JSON.parse(JSON.stringify(array))

const matrix = (row, col, values, isvec=false) => {
	assert(row === values.length)
	for (let i = 0; i < values.length; i++) {
		const element = values[i];
		assert(col === element.length)
	}
	const getter = (obj) => {
		return isvec? (i) => obj.values[i][0] : (i, j) => obj.values[i][j]
	}
	const setter = (obj) => {
		return isvec? (i, v) => {
			let newvalues = copy(obj.values)
			newvalues[i][0] = v;
			return matrix_from_array(newvalues, true)
		} : 
		(i, j, v) => {
			let newvalues = copy(obj.values)
			newvalues[i][j] = v;
			return matrix_from_array(newvalues)
		}
	}
	const getrow = (obj) => {
		return isvec? (row) => matrix_from_array([obj.values[row]], true)
		:
		(row) => matrix_from_array(obj.values[row].map(x=>[x]), true);
	}
	const getcol = (obj) => {
		return isvec? () => {
			return obj
		} :
		(col) => {
			let colomn = Array(obj.rows)
			for (let i = 0; i < obj.rows; i++) {
				colomn[i] = [obj.values[i][col]];
			}
			return matrix_from_array(colomn.map(x=>[x]), true)
		}
	}
	const apply = (obj) => {
		return (f) => {
			let m = copy(obj.values);
			for (let i = 0; i < obj.rows; i++) {
				for (let j = 0; j < obj.colomns; j++) {
					m[i][j] = f(m[i][j])
				}
			}
			return matrix(obj.rows, obj.colomns, m, obj.isvec)
		}
	}
	const transpose = (obj) => {
		return () => {
			let m = Array(obj.colomns)
			for(let i = 0; i < obj.colomns; i++) {
				let row = Array(obj.rows)
				for(let j = 0; j < obj.rows; j++) {
					row[j] = obj.values[j][i]
				}
				m[i] = row
			}
			return matrix(obj.colomns, obj.rows, m)
		}
	}
	const clone = (obj) => () => copy(obj)
	const obj =  {
		rows: row,
		colomns: col,
		values,
		ismatrix: true,
		isvec
	}
	obj.get = getter(obj)
	obj.set = setter(obj)
	obj.getrow = getrow(obj)
	obj.getcol = getcol(obj)
	obj.apply = apply(obj)
	obj.transpose = transpose(obj)
	obj.copy = clone(obj)
	return obj
}
const matrix_from_array = (values, isvec=false) => {
	const row = values.length
	const col = values[0].length
	return matrix(row, col, values, isvec)
}
const constant = (row, col, c, isvec=false) => {
	let m = Array(row);
	for (let i = 0; i < row; i++) {
		let r = Array(col)
		for (let j = 0; j < col; j++) {
			r[j] = c
		}
		m[i] = r
	}
	return matrix(row, col, m, isvec)
}
const random = (row, col, isvec=false) => {
	let m = Array(row);
	for (let i = 0; i < row; i++) {
		let r = Array(col)
		for (let j = 0; j < col; j++) {
			r[j] = 2*Math.random() - 1
		}
		m[i] = r
	}
	return matrix(row, col, m, isvec)
}

module.exports = {matrix, matrix_from_array, constant, random}