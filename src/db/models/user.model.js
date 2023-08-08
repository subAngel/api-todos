const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	fullname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	imageProfile: {
		field: "image_profile",
		type: DataTypes.STRING,
	},
	createdAt: {
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	deleted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
};

class User extends Model {
	static associate(models) {
		// associate
		this.hasMany(models.Task, {
			as: "tasks",
			foreignKey: "userId",
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: "User",
			timestamps: false,
		};
	}
}

module.exports = {
	USER_TABLE,
	UserSchema,
	User,
};
