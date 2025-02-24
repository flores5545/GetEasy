const app = require('./index');
const PORT = 3001;
const db = require('./models/index');

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Failed to connect to server: ', error);
  }
})();
