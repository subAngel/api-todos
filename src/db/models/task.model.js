const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const TASK_TABLE = "tasks";

const TaskSchema = {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},

	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	dueDate: {
		field: "due_date",
		type: DataTypes.DATE,
	},
	createdAt: {
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	userId: {
		field: "user_id",
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: USER_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},
};

class Task extends Model {
	static associate(models) {
		// associate
		this.belongsTo(models.User, {
			as: "user",
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TASK_TABLE,
			modelName: "Task",
			timestamps: false,
		};
	}
}

module.exports = {
	TASK_TABLE,
	TaskSchema,
	Task,
};
