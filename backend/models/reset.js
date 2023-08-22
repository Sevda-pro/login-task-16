
  module.exports = (sequelize, Sequelize) => {
    const ResetPassword = sequelize.define("ResetPassword", {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        isActive: Sequelize.BOOLEAN,
      });
    
      
    return ResetPassword
}