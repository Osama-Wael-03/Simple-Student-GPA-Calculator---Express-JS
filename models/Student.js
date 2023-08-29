
const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Student = database.define('Student', {
  std_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  std_number: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    allowNull: false,
    unique: { msg: 'Student Number Must Be Unique !' }
  },
  std_full_name: {
    type: DataTypes.STRING(100),
    allowNull: { msg: 'First Name Cannot Be Null Value !' }
  },
  mid_term_mark: {
    type: DataTypes.DOUBLE({ unsigned: true }),
  },
  final_mark: {
    type: DataTypes.DOUBLE({ unsigned: true }),
  },
  activities_mark: {
    type: DataTypes.DOUBLE({ unsigned: true }),
  },
  net_mark: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.get('mid_term_mark') + this.get('final_mark') + this.get('activities_mark');
    }
  }

}, {
  timestamps: true,
  tableName: 'students',
  paranoid: true
});

module.exports = Student;