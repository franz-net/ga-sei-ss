'use strict';
const {Model} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['password']

export default (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            const attributes = {...this.get()}
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes
        }

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your name'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address'
            },
            unique: {
                args: true,
                msg: 'Email already exists'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your password'
            }
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: 'Doe'
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        last_login_at: {
            type: DataTypes.Date,
        },
        last_ip_address: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};