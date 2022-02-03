const relu = x => (x > 0) ? x : 0
const drelu = x => (x > 0) ? 1 : 0

const sigmoid = x => 1/(1+Math.pow(Math.E, -x))
const dsigmoid = x => sigmoid(x)*(1-sigmoid(x))

module.exports = {
	relu,
	sigmoid,
	derivative: {
		relu: drelu,
		sigmoid: dsigmoid
	}
}