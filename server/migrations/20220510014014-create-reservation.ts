'use strict';
const dayjs = require("dayjs");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reservations', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        args: true,
                        msg: 'Please enter a valid date'
                    },
                    isBetweenValidDates(value) {
                        if (value.getTime() < dayjs().add(2, 'hour') ||
                            value.getTime() > dayjs.add(2, 'day')) {
                            throw new Error('Reservations must start 2 hours from now and up to 2 days in advance')
                        }
                    }
                }
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    isValidDuration(value) {
                        if (value < 1 || value > 3) {
                            throw new Error('Reservations can only last 1, 2 or 3 hours')
                        }
                    }
                }
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'confirmed'],
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addColumn(
            'Reservations',
            'reservedBy',
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        )
        await queryInterface.addColumn(
            'Reservations',
            'courtId',
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Courts',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        )
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Reservations');
    }
};