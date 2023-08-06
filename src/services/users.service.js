class UsersService {
	constructor() {
		this.users = [];
	}

	async findAll() {
		return this.users;
	}

	async findOne(id) {
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

module.exports = UsersService;
