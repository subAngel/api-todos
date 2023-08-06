class UsersService {
	constructor() {
		this.users = [];
	}

	findAll() {
		return this.users;
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

module.exports = UsersService;
