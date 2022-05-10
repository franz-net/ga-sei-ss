'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Court extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {as: 'createdBy'})

        }
    }

    Court.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autoIncrement: false
        },
        courtName: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter Court Name or Identifier'
            }
        },
        courtType: {
            type: DataTypes.ENUM,
            values: ['tennis', 'padel'],
            defaultValue: 'tennis'
        },
        inService: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Court',
    });
    return Court;
};