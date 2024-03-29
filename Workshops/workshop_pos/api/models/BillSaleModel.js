const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const BillSaleModel = sequelize.define('billSale', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  payDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open',
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
  },
});

// เปิดใช้เฉพาะตอนอัพเดทไม่แนะนำให้เปิดตลอด
// BillSaleModel.sync({ alter: true });

module.exports = BillSaleModel;
