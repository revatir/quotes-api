const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  database: 'quotes_db',
  dialect: 'postgres',
  defined: {
    underscored: true
  }
});

class Speaker extends Sequelize.Model { }
class Quote extends Sequelize.Model { }

Speaker.init({
  name: Sequelize.STRING,
  image_url: Sequelize.TEXT,
}, {
  sequelize,
  modelName: 'speaker'
})

Quote.init({
  text: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'quote'
})

Speaker.hasMany(Quote, { onDelete: 'cascade' });
Quote.belongsTo(Speaker);

module.exports = {
  Speaker,
  Quote,
  sequelize
}