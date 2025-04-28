const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

const connectDB = async () => {
  try {
    // Check if database file exists and is corrupted
    try {
      await sequelize.authenticate();
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError' && 
          error.parent && 
          error.parent.message.includes('SQLITE_CORRUPT')) {
        console.log('Database corruption detected. Recreating database...');
        // Delete corrupted database file if it exists
        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath);
        }
        // Create new connection after deleting corrupt file
        await sequelize.authenticate();
      } else {
        throw error;
      }
    }
    
    console.log('Database connected successfully');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };