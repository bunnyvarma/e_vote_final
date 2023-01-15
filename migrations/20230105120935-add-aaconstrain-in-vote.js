"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.addConstraint("Votes", {
      fields: ["electionId"],
      type: "foreign key",
      references: {
        table: "Elections",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Votes", {
      fields: ["quetionId"],
      type: "foreign key",
      references: {
        table: "Quetions",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Votes", {
      fields: ["voterId"],
      type: "foreign key",
      references: {
        table: "Voters",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    
  },
};
