module.exports = (sequelize, Sequelize) => {
    const expenses = sequelize.define('expense', {

        Price: {
            type: Sequelize.INTEGER
        },
        ProductName: {
            type: Sequelize.STRING,
            // primaryKey:true
        },
        BelongsTo: {
            type: Sequelize.STRING,

        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }

    });
    return expenses
}
