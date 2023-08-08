const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class TasksService {
	constructor() {
		// this.tasks = [];
	}

	async findAll() {
		const tasks = await models.Task.findAll();
		return tasks;
	}

	async findOne(id) {
		// const name = this.ge	tTotal();
		const task = await models.Task.findByPk(id);
		if (!task) {
			throw boom.notFound("Task not found");
		}
		return task;
	}

	async create(data) {
		const newTask = await models.Task.create(data);
		return newTask;
	}

	async delete(id) {
		const task = await this.findOne(id);
		await task.destroy();
		return { id };
	}

	async update(id, body) {
		const task = await this.findOne(id);
		const rta = await task.update(body);
		return rta;
	}
}

module.exports = TasksService;
