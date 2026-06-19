console.log("SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// USERS ROUTE (THIS MUST EXIST)
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      res.send("DB Error");
    } else {
      res.json(result);
    }
  });
});
// ADD USER ROUTE
app.post("/users", (req, res) => {

  const { name, email } = req.body;

  const sql =
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";

  db.query(
    sql,
    [name, email, "12345"],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error adding user"
        });
      } else {
        res.json({
          message: "User Added Successfully"
        });
      }

    }
  );

});
app.put("/users/:id", (req, res) => {

  const id = req.params.id;
  const { name, email } = req.body;

  const sql =
    "UPDATE users SET name=?, email=? WHERE id=?";

  db.query(
    sql,
    [name, email, id],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error Updating User"
        });
      } else {
        res.json({
          message: "User Updated Successfully"
        });
      }

    }
  );

});
// UPDATE USER ROUTE
app.put("/users/:id", (req, res) => {

  const id = req.params.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error Updating User"
        });
      } else {
        res.json({
          message: "User Updated Successfully"
        });
      }

    }
  );

});
// DELETE USER ROUTE
app.delete("/delete-user/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.send("User Deleted");
    }

  });

});
// GET ALL CASES
app.get("/cases", (req, res) => {

  db.query(
    "SELECT * FROM cases",
    (err, result) => {

      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.json(result);
      }

    }
  );

});
// ADD CASE
app.post("/cases", (req, res) => {

  const {
    case_number,
    party_name,
    case_type
  } = req.body;

  const sql =
  "INSERT INTO cases(case_number, party_name, case_type) VALUES(?,?,?)";

  db.query(
    sql,
    [case_number, party_name, case_type],
    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          message: "Error Adding Case"
        });

      } else {

        res.json({
          message: "Case Added Successfully"
        });

      }

    }
  );

});
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});
console.log("CASES ROUTE LOADED");
app.delete("/cases/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM cases WHERE id=?",
    [id],
    (err, result) => {

      if(err){

        console.log(err);

        res.status(500).json({
          message:"Error Deleting Case"
        });

      }else{

        res.json({
          message:"Case Deleted Successfully"
        });

      }

    }
  );

});
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});