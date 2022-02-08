const linear = (lr) => {
	return (delta) => {
		return delta.apply(x=>(-lr*x))
	}
}

module.exports = {linear}