const boom = require("@hapi/boom");

class TasksService {
	constructor() {
		this.tasks = [];
	}

	async findAll() {
		return this.tasks;
	}

	async findOne(id) {
		// const name = this.ge	tTotal();
		const task = this.tasks[id];
		if (!task) {
			throw boom.notFound("Task not found");
		}
		return task;
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
