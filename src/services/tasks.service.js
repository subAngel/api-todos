class TasksService {
	constructor() {
		this.tasks = [];
	}

	findAll() {
		return this.tasks;
	}

	findOne(id) {
		return id;
	}

	create(data) {
		return data;
	}

	delete(id) {
		return id;
	}

	update(id, body) {
		return id, body;
	}
}

module.exports = TasksService;
