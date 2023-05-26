const db = require("../../bin/dbconnection");

const findUserAndUpdate = (res, req, trash_data) =>
  db.connect((err) => {
    if (err) throw err;
    let query1 = `SELECT * FROM users WHERE id = '${req.session.user.id}'`;
    db.query(query1, (err, result) => {
      if (err) throw err;
      let user_trash_temp = result[0].trash_temp;
      if (result[0].trash_temp === null || result[0].trash_temp === "")
        user_trash_temp = "[]";
      user_trash_temp = JSON.parse(user_trash_temp);
      let new_trash_data = [...user_trash_temp, ...trash_data];
      console.log(user_trash_temp, trash_data);
      console.log(new_trash_data);
      new_trash_data = JSON.stringify(new_trash_data);
      let query2 = `UPDATE users SET trash_temp = '${new_trash_data}' WHERE id = '${req.session.user.id}'`;
      db.query(query2, (err, result2) => {
        if (err) throw err;
        // console.log(result);
        res.send({
          status: "success",
          message: "Successfuly updated trash_temp",
          data: result2,
        });
      });
    });
  });

const findUserAndDelete = (res, req) =>
  db.connect((err) => {
    if (err) throw err;
    let query = `UPDATE users SET trash_temp = '' WHERE id = '${req.session.user.id}'`;
    db.query(query, (err, result) => {
      if (err) throw err;
      res.send({
        status: "success",
        message: "Successfuly deleted trash_temp",
        data: result,
      });
    });
  });

const findUserAndDisplay = (res, req) =>
  db.connect((err) => {
    if (err) throw err;
    let query = `SELECT * FROM users WHERE id = '${req.session.user.id}'`;
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result[0].trash_temp === "" || result[0].trash_temp === null) {
        return res.send({
          status: "success",
          message: "Display temporary scanned trash",
          data: result[0].trash_temp,
        });
      } else {
        let trash_temp = JSON.parse(result[0].trash_temp);
        res.send({
          status: "success",
          message: "Successfuly displayed trash_temp",
          data: trash_temp,
        });
      }
    });
  });

module.exports.findUserAndUpdate = findUserAndUpdate;
module.exports.findUserAndDelete = findUserAndDelete;
module.exports.findUserAndDisplay = findUserAndDisplay;
