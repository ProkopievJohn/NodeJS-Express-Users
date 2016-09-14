var User = function () {
	this.data = {
		id: null,
		name: null,
		destination: null,
		actualDate: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.addActualDate = function () {
		this.data.actualDate = Date.now();
	};

	this.getInformation = function () {
		return this.data;
	};
};

module.exports = function (info) {
	var inst = new User();

	inst.fill(info);

	return inst;
};