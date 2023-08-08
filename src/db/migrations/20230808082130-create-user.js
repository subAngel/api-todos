"use strict";

const { query } = require("express");
const { UserSchema, USER_TABLE } = require("../models/user.model");
const { TASK_TABLE, TaskSchema } = require("../models/task.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(TASK_TABLE, TaskSchema);
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(USER_TABLE);
		await queryInterface.dropTable(TASK_TABLE);

		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
