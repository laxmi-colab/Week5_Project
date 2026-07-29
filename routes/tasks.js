const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const verifyToken = require("../middleware/authMiddleware");


// ================= GET USER TASKS =================

router.get("/", verifyToken, async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user.id
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ================= CREATE TASK =================

router.post("/", verifyToken, async (req, res) => {

  try {

    const task = new Task({

      title: req.body.title,

      description: req.body.description,

      status: req.body.status || "Pending",

      user: req.user.id

    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ================= UPDATE TASK =================

router.put("/:id", verifyToken, async (req, res) => {

  try {

    const updatedTask = await Task.findOneAndUpdate(

      {
        _id: req.params.id,
        user: req.user.id
      },

      req.body,

      {
        new: true
      }

    );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ================= DELETE TASK =================

router.delete("/:id", verifyToken, async (req, res) => {

  try {

    await Task.findOneAndDelete({

      _id: req.params.id,

      user: req.user.id

    });

    res.json({

      message: "Task Deleted Successfully"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});


module.exports = router;