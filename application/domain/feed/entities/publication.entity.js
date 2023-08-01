const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ date, accountID, accountiID, imei = null }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO publication (date,accountiID,content) VALUES ($1,$2,$3) RETURNING *",
          [date, accountID, accountiID]
        )
        .catch((err) => {
          console.error("MODEL publication: Can not create publication", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByAccount(accountID) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SEELCT * FROM publication WHERE accountID = $1",[accountID]
        )
        .catch((err) => {
          console.error("MODEL publication: Can not getByAccount", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};