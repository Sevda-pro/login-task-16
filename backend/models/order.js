module.exports = (sequelize, Sequelize) => {
    const orders = sequelize.define("order", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        paymentid: Sequelize.STRING,
        orderid: Sequelize.STRING,
        status: Sequelize.STRING,
      });
      
    return orders
}
