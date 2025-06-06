'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Projects', 'titleFr', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.addColumn('Projects', 'descFr', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.addColumn('Projects', 'fullDescFr', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Projects', 'titleFr');
    await queryInterface.removeColumn('Projects', 'descFr');
    await queryInterface.removeColumn('Projects', 'fullDescFr');
  }
};
