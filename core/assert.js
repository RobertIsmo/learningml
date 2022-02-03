function AssertionError(message = "") {
    this.name = "AssertionError";
    this.message = message;
}
AssertionError.prototype = Error.prototype;

const assert = (condition) => {
	if(!condition) throw AssertionError()
}

module.exports = assert