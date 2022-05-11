'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Courts', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            courtName: {
                type: Sequelize.STRING
            },
            courtType: {
                type: Sequelize.ENUM,
                values: ['tennis', 'padel'],
                defaultValue: 'tennis'
            },
            inService: {
                type: Sequelize.ENUM,
                values: ['available', 'maintenance'],
                defaultValue: 'available'
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
            'Courts',
            'createdBy',
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        )
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Courts');
    }
};