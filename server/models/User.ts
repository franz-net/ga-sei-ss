import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

'use strict';
const {Model} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['password']

module.exports = (sequelize, DataTypes) => {
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
            this.hasMany(models.Reservation, {foreignKey: 'reservedBy'})
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autoIncrement: false
        },
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
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'instructor'],
            defaultValue: 'user'
        },
        last_login_at: {
            type: DataTypes.DATE,
        },
        last_ip_address: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    User.beforeSave(async (user) => {
        if (!user.changed('password')) return
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    })

    User.prototype.createJWT = function () {
        return jwt.sign({
            userId: this.id,
            userRole: this.role
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    }

    User.prototype.comparePassword = async function (submittedPassword) {
        return await bcrypt.compare(submittedPassword, this.password)
    }

    return User;
};
