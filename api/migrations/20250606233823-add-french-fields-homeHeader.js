'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('HomeHeaders', 'titleFr', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.addColumn('HomeHeaders', 'aboutMeFr', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('HomeHeaders', 'titleFr');
    await queryInterface.removeColumn('HomeHeaders', 'aboutMeFr');
  }
};

