const express = require("express");
const { sequelize } = require("./configs/db");
const { Student } = require("./model/user.model");
const { Course } = require("./model/course.model");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(require("cors")());

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Server is Working" });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
});

app.get("/get-students", async (req, res) => {
  try {
    const studentsData = await Student.findAll({
      include: [
        {
          model: Course,
          required: true,
          on: {
            courseID: sequelize.col("course.id"), // Assuming your foreign key is named 'courseID'
          },
        },
      ],
    });

    res.json({ Data: studentsData });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.send({ error: err.message });
  }
});

app.post("/create-student", async (req, res) => {
  try {
    const { name, dob, major, gender, contact_number } = req.body;
    const studentsData = await Student.create({
      name,
      dob,
      major,
      gender,
      contact_number,
    });
    res.json({ "Student Created": studentsData });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.send({ error: err.message });
  }
});

app.post("/create-course", async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Course.create({
      name,
    });
    res.json({ course });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(1400, async () => {
      console.log("Connected to DB");
      console.log("Server is running at 1400");
    });
  })
  .catch((err) => {
    console.log(err);
  });
