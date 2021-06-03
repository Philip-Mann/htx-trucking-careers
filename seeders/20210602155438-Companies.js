'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [{
      companyName: 'Swift Transportation',
      pay: '$1000 per week, Guaranteed',
      jobType: 'Over The Road, Regional, and Local',
      trailerType: 'Dry Van, Refrigerated, Flat Bed, and Intemodal',
      experienceRequirement: 'None',
      willTrain: true,
      headquarters: 'Phoenix, AZ',
      homeTime: 'Monthly',
      endorsements: 'None',
      companySite: 'https://www.swifttrans.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
