"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Projects", [
      {
        name: "Project 1",
        start_date: "2023-01-01",
        end_date: "2023-03-31",
        description: "Description of Project 1",
        technologies: ["nodejs", "reactjs"],
        image: "js-image.jpg",
        author: "test1@app.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Project 2",
        start_date: "2023-04-15",
        end_date: "2023-06-30",
        description: "Description of Project 2",
        technologies: ["nextjs", "typescript"],
        image: "js-image.jpg",
        author: "test2@app.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Project 3",
        start_date: "2023-07-01",
        end_date: "2023-09-30",
        description: "Description of Project 3",
        technologies: ["reactjs", "typescript"],
        image: "js-image.jpg",
        author: "test3@app.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Project 4",
        start_date: "2023-10-01",
        end_date: "2023-12-31",
        description: "Description of Project 4",
        technologies: ["nodejs", "nextjs"],
        image: "js-image.jpg",
        author: "test4@app.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
