require('dotenv').config();

const app = require('./app');

const port = Number(process.env.PORT || 8000);

app.listen(port, () => {
  console.log(`LiveSync API running on http://localhost:${port}`);
});
