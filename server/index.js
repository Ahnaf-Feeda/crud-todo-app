const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://crud:crud@cluster0.efxpk.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database connected");
  });

//mongodb+srv://<db_username>:<db_password>@cluster0.efxpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use(cors());
app.use(express.json());

const Cat = mongoose.model("todo", {
  name: String,
});

// http://localhost:3000/create
app.post("/create", async (req, res) => {
  let { todo } = req.body;

  let result = await new Cat({
    name: todo,
  });

  result.save();

  res.status(201).send({
    success: true,
    msg: "todo created succesfully",
  });
});

// http://localhost:3000/find
app.get("/find", async (req, res) => {
  let alltodos = await Cat.find({});
  res.send(alltodos);
});

// http://localhost:3000/delete
app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let deletetodo = await Cat.findOneAndDelete({
    _id: id,
  });
  res.send({ data: deletetodo });
});

// http://localhost:3000/update

app.patch("/update/:id", async (req, res) => {
  let { id } = req.params;
  let { edit } = req.body;
  console.log(id, edit);

  let updatetodo = await Cat.findOneAndUpdate(
    { _id: id },
    { name: edit },
    { new: true }
  );
  res
    .status(200)
    .send({ success: true, msg: "update successfull", data: updatetodo });
});

app.listen(port, () => {
  console.log("server is running");
});
