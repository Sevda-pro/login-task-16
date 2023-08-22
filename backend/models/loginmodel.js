module.exports = (sequelize, Sequelize) => {
    const customers = sequelize.define('customer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
        Name: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING,

        },
        isPremiumUser:
        {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        total_expense: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    });
    return customers
}

