'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('HomeProjects', 'titleFr', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.addColumn('HomeProjects', 'subTitleFr', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('HomeProjects', 'titleFr');
    await queryInterface.removeColumn('HomeProjects', 'subTitleFr');
  }
};

