'use strict';
// @ts-ignore
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {foreignKey: 'reservedBy'})
            this.belongsTo(models.Court, {foreignKey: 'courtId'})
        }
    }

    Reservation.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autoIncrement: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Please provide a date for the reservation'
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: {
                args: false,
                msg: 'Please provide a reservation duration'
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'confirmed'],
            allowNull: {
                args: false,
                msg: 'Please provide a status for the reservation'
            },
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};