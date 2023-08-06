class TasksService {
	constructor() {
		this.tasks = [];
	}

	async findAll() {
		return this.tasks;
	}

	async findOne(id) {
		// const name = this.ge	tTotal();
		return id;
	}

	async create(data) {
		return data;
	}

	async delete(id) {
		return id;
	}

	async update(id, body) {
		return id, body;
	}
}

module.exports = TasksService;
